using Microsoft.AspNetCore.Mvc;

namespace offer_service;
public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

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

        app.UseHttpsRedirection();
        app.MapPost("/offer/makeoffer", ([FromBody] NewOfferDto newOffer) =>
        {            
            return Results.Ok(newOffer);
        })
        .WithName("MakeOffer")
        .WithOpenApi();

        app.Run();
    }
}

public record NewOfferDto(string SalesRepId = "", string Email = "", string FirstName = "", string LastName = "");


// public interface IOfferStore 
// {
//     public Task<Offer> GetOffer(string offerId);
//     public Task<Offer> CreateOffer(Offer offer);
//     public Task<Offer> UpdateOffer(Offer offer);
//     public Task DeleteOffer(string offerId);
// }

// public class Offer
// {
//     public string OfferId { get; set; }
//     public string SalesRepId { get; set; }
//     public string Email { get; set; }
//     public string FirstName { get; set; }
//     public string LastName { get; set; }
//     public DateTime CreatedAt { get; set; }
//     public DateTime UpdatedAt { get; set; }

//     public static Offer newOffer(newOfferDto newoffer) {
//         return new Offer {
//             OfferId = Guid.NewGuid().ToString(),
//             SalesRepId = newoffer.salesRepId,
//             Email = newoffer.email,
//             FirstName = newoffer.firstName,
//             LastName = newoffer.lastName,
//             CreatedAt = DateTime.UtcNow,
//             UpdatedAt = DateTime.UtcNow
//         };
//     }
// }
