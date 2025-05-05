using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace offer_service;
public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add .Net Aspire Service Defaults
        builder.AddServiceDefaults();

        // Add services to the container.
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        var offerStore = new EFOfferStore(new OfferDbContext(new DbContextOptionsBuilder<OfferDbContext>().UseInMemoryDatabase("TestDb").Options));

        // app.UseHttpsRedirection();
        app.MapPost("offers/makeoffer", async ([FromBody] NewOfferDto newOffer) =>
        {   
            var offer = await offerStore.CreateOffer(Offer.NewOffer(newOffer));
            return Results.Ok(offer);
        })
        .WithName("MakeOffer")
        .WithOpenApi();

        app.Run();
    }
}

public record NewOfferDto(string SalesRepId = "", string Email = "", string FirstName = "", string LastName = "");


public interface IOfferStore 
{
    public Task<Offer> GetOffer(string offerId);
    public Task<Offer> CreateOffer(Offer offer);
    public Task<Offer> UpdateOffer(Offer offer);
    public Task DeleteOffer(string offerId);
}

public class Offer(string offerId, string salesRepId, string email, string firstName, string lastName, DateTime submittedOn, DateTime modifiedOn)
{
    public string OfferId { get; set; } = offerId;

    public string SalesRepId { get; set; } = salesRepId;
    public string Email { get; set; } = email;
    public string FirstName { get; set; } = firstName;
    public string LastName { get; set; } = lastName;
    public DateTime SubmittedOn { get; set; } = submittedOn;
    public DateTime ModifiedOn { get; set; } = modifiedOn;

    public static Offer NewOffer(NewOfferDto newoffer)
    {
        return new Offer(Guid.NewGuid().ToString(), newoffer.SalesRepId, newoffer.Email, newoffer.FirstName, newoffer.LastName, DateTime.UtcNow, DateTime.UtcNow);
    }
}
