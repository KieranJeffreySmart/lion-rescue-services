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

        
        var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? builder.Environment.EnvironmentName;

        if (environmentName == "test")
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
        builder.Services.AddTransient<ISalesRepStore, EFSalesRepStore>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // app.UseHttpsRedirection();
        app.MapPost("offers/makeoffer", async ([FromServices] IOfferStore offerStore, [FromServices] ISalesRepStore salesRepStore, [FromBody] NewOfferDto newOffer) =>
        {   
            if (string.IsNullOrWhiteSpace(newOffer.SalesRepId) || string.IsNullOrWhiteSpace(newOffer.Email) || string.IsNullOrWhiteSpace(newOffer.FirstName) || string.IsNullOrWhiteSpace(newOffer.LastName))
            {
                return Results.BadRequest("SalesRepId, Email, FirstName and LastName are required.");
            }

   
            if ((await salesRepStore.SalesRepExists(newOffer.SalesRepId)) == false)
            {
                return Results.BadRequest($"SalesRep with ID {newOffer.SalesRepId} does not exist.");
            }

            var offer = await offerStore.CreateOffer(OfferFactory.NewOffer(newOffer));
            return Results.Ok(offer);
        })
        .WithName("MakeOffer")
        .WithOpenApi();

        app.Run();
    }
}

public record NewOfferDto(string SalesRepId = "", string Email = "", string FirstName = "", string LastName = "");

internal static class OfferFactory
{
    public static Offer NewOffer(NewOfferDto newOffer)
    {
        return new Offer(
            offerId: Guid.NewGuid().ToString(),
            salesRepId: newOffer.SalesRepId,
            email: newOffer.Email,
            firstName: newOffer.FirstName,
            lastName: newOffer.LastName,
            submittedOn: DateTime.UtcNow,
            modifiedOn: DateTime.UtcNow
        );
    }
}
