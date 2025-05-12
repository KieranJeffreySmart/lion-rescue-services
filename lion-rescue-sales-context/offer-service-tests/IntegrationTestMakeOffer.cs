using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using MassTransit.Testing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using offer_service;
using Shouldly;


namespace offer_service_tests;


public class IntegrationTestMakeOffer: IClassFixture<CustomWebApplicationFactory<Program>>
{
    CustomWebApplicationFactory<Program> _factory;
    public IntegrationTestMakeOffer(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task SuccessfullMakeOffer()
    {
        // Given I have a new offer with valid data
        var newOffer = new NewOfferDto
        {
            SalesRepId = "SalesRep01",
            Email = "jd@email.com",
            FirstName = "John",
            LastName = "Doe"
        };

        // When I submit the new offer
        var client = _factory.CreateClient();
        var options = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            IncludeFields = true,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            TypeInfoResolver = new DefaultJsonTypeInfoResolver(),
            Converters = { new JsonStringEnumConverter() }
        };

        var content = JsonContent.Create(newOffer);
        var beforeRequest = DateTime.UtcNow;
        var response = await client.PostAsync("/offers/makeoffer", content);
        var afterRequest = DateTime.UtcNow;

        // Then I should receive a completed offer with an Id and created and modified dates
        response.EnsureSuccessStatusCode();
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());
        OfferDto responseBody = (await response.Content.ReadFromJsonAsync<OfferDto>(options)) ?? throw new Exception("Failed to deserialize response body");

        responseBody.ShouldNotBeNull();
        Guid.TryParse(responseBody.OfferId, out Guid _).ShouldBeTrue();
        responseBody.SalesRepId.ShouldBe("SalesRep01");
        responseBody.Email.ShouldBe("jd@email.com");
        responseBody.FirstName.ShouldBe("John");
        responseBody.LastName.ShouldBe("Doe");
        responseBody.SubmittedOn.ShouldBeLessThan(afterRequest);
        responseBody.SubmittedOn.ShouldBeGreaterThan(beforeRequest);

        // And a new offer event should be raised
        _factory.NewOfferEventList.GetAll().ShouldNotBeEmpty();
    }

    [Theory]
    [InlineData("", "", "", "")]
    [InlineData("", "lion@king.com", "Bob", "DeLeon")]
    [InlineData("Mabel", "", "Bob", "DeLeon")]
    [InlineData("Mabel", "lion@king.com", "", "DeLeon")]
    [InlineData("Mabel", "lion@king.com", "Bob", "")]
    public async Task ValidateMakeOfferRequiredFields(string salesRepId, string email, string firstName, string lastName)
    {
        var client = _factory.CreateClient();

        var newOffer = new NewOfferDto
        {
            SalesRepId = salesRepId,
            Email = email,
            FirstName = firstName,
            LastName = lastName
        };

        var content = JsonContent.Create(newOffer);
        var response = await client.PostAsync("/offers/makeoffer", content);

        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task ValidateMakeOfferSalesRepExists()
    {
        var client = _factory.CreateClient();

        var newOffer = new NewOfferDto
        {
            SalesRepId = "UnknownSalesRepId",
            Email = "jd@email.com",
            FirstName = "John",
            LastName = "Doe"
        };

        var content = JsonContent.Create(newOffer);

        var response = await client.PostAsync("/offers/makeoffer", content);
        
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
    }

    public record OfferDto(string OfferId, string SalesRepId, string Email, string FirstName, string LastName, DateTime SubmittedOn, DateTime ModifiedOn);
}


