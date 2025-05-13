using System.Reflection;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using offer_service.SalesContext;

namespace offer_service;
public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add .Net Aspire
        builder.AddServiceDefaults();

        var connectionType = Environment.GetEnvironmentVariable("DB_CONNECTION_TYPE") ?? "postgres";
        if (connectionType == "InMemory")
        {
            builder.Services.AddDbContext<SalesDbContext>(options => options.UseInMemoryDatabase("TestDb"));
        }
        else
        {
            builder.AddNpgsqlDbContext<SalesDbContext>(connectionName: "postgresdb");
        }
        
        // Add services to the container.
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddTransient<IOfferStore, EFOfferStore>();
        builder.Services.AddTransient<IMouseStore, EFMouseStore>();
        builder.Services.AddTransient<IEventPublisher, MassTransitEventPublisher>();

        
        var messageQueueType = Environment.GetEnvironmentVariable("MESSAGE_QUEUE_TYPE") ?? "rabbitMQ";

        if (messageQueueType != "InMemory")
        {
            builder.Services.AddMassTransit(x =>
            {
                x.SetKebabCaseEndpointNameFormatter();

                // By default, sagas are in-memory, but should be changed to a durable
                // saga repository.
                x.SetInMemorySagaRepositoryProvider();

                var entryAssembly = Assembly.GetEntryAssembly();

                x.AddConsumers(entryAssembly);
                x.AddSagaStateMachines(entryAssembly);
                x.AddSagas(entryAssembly);
                x.AddActivities(entryAssembly);

                x.UsingInMemory((context, cfg) =>
                {
                    cfg.ConfigureEndpoints(context);
                });
            });
        }

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // app.UseHttpsRedirection();
        app.MapPost("offers/makeoffer", async ([FromServices] IOfferStore offerStore, [FromServices] IMouseStore mouseStore, [FromBody] NewOfferDto newOffer, [FromServices] IEventPublisher eventPublisher) =>
        {   
            if (string.IsNullOrWhiteSpace(newOffer.MouseId) || string.IsNullOrWhiteSpace(newOffer.Email) || string.IsNullOrWhiteSpace(newOffer.FirstName) || string.IsNullOrWhiteSpace(newOffer.LastName))
            {
                return Results.BadRequest("MouseId, Email, FirstName and LastName are required.");
            }

   
            if ((await mouseStore.MouseExists(newOffer.MouseId)) == false)
            {
                return Results.BadRequest($"Mouse with ID {newOffer.MouseId} does not exist.");
            }

            var offer = await offerStore.CreateOffer(OfferFactory.NewOffer(newOffer));
            await eventPublisher.PublishEvent(new NewOfferEvent(offer));

            return Results.Ok(offer);
        })
        .WithName("MakeOffer")
        .WithOpenApi();

        app.Run();
    }
}

public class NewOfferEvent: IEvent
{
    public NewOfferEvent()
    {
    }
    
    public NewOfferEvent(Offer offer): this()
    {
        OfferId = offer.OfferId;
        MouseId = offer.MouseId;
        Email = offer.Email;
        FirstName = offer.FirstName;
        LastName = offer.LastName;
        SubmittedOn = offer.SubmittedOn;
        ModifiedOn = offer.ModifiedOn;
    }

    public string OfferId {get; set;} = string.Empty;
    public string MouseId {get; set;} = string.Empty;
    public string Email {get; set;} = string.Empty;
    public string FirstName {get; set;} = string.Empty;
    public string LastName {get; set;} = string.Empty;
    public DateTime SubmittedOn {get; set;} = DateTime.MinValue;
    public DateTime ModifiedOn {get; set;} = DateTime.MinValue;
}

public interface IEvent
{
}

internal class MassTransitEventPublisher(IBus bus) : IEventPublisher
{
    readonly IBus bus = bus;

    public Task PublishEvent<T>(T @event) where T : class
    {
        return bus.Publish(@event);
    }
}

internal interface IEventPublisher
{
    Task PublishEvent<T>(T @event) where T : class;
}

public record NewOfferDto(string MouseId = "", string Email = "", string FirstName = "", string LastName = "");

internal static class OfferFactory
{
    public static Offer NewOffer(NewOfferDto newOffer)
    {
        return new Offer(
            offerId: Guid.NewGuid().ToString(),
            mouseId: newOffer.MouseId,
            email: newOffer.Email,
            firstName: newOffer.FirstName,
            lastName: newOffer.LastName,
            submittedOn: DateTime.UtcNow,
            modifiedOn: DateTime.UtcNow
        );
    }
}
