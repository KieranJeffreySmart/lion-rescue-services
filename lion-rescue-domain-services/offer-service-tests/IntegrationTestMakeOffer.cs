using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using offer_service;
using Shouldly;


namespace offer_service_tests;

public class IntegrationTestMakeOffer: IClassFixture<WebApplicationFactory<Program>>
{
    WebApplicationFactory<Program> _factory;
    public IntegrationTestMakeOffer(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task SuccessfullMakeOffer()
    {
        var client = _factory.CreateClient();
        var options = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            IncludeFields = true,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            TypeInfoResolver = new DefaultJsonTypeInfoResolver(),
            Converters = { new JsonStringEnumConverter() }
        };

        var newOffer = new NewOfferDto
        {
            SalesRepId = "123",
            Email = "jd@email.com",
            FirstName = "John",
            LastName = "Doe"
        };

        var content = JsonContent.Create(newOffer);


        var response = await client.PostAsync("/offer/makeoffer", content);

        response.EnsureSuccessStatusCode();
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());

        OfferDto responseBody = (await response.Content.ReadFromJsonAsync<OfferDto>(options)) ?? throw new Exception("Failed to deserialize response body");

        responseBody.ShouldNotBeNull();
        responseBody.ShouldBeEquivalentTo(new OfferDto("123",  "jd@email.com",  "John",  "Doe"));            
    }

    public record OfferDto(string salesRepId, string email, string firstName, string lastName);
}
