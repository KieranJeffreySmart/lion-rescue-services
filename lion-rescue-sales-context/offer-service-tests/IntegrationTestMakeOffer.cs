using System.Net.Http.Json;
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

        var beforeRequest = DateTime.UtcNow;
        var response = await client.PostAsync("/offers/makeoffer", content);
        var afterRequest = DateTime.UtcNow;

        response.EnsureSuccessStatusCode();
        Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());

        OfferDto responseBody = (await response.Content.ReadFromJsonAsync<OfferDto>(options)) ?? throw new Exception("Failed to deserialize response body");

        responseBody.ShouldNotBeNull();
        Guid.TryParse(responseBody.OfferId, out Guid _).ShouldBeTrue();
        responseBody.SalesRepId.ShouldBe("123");
        responseBody.Email.ShouldBe("jd@email.com");
        responseBody.FirstName.ShouldBe("John");
        responseBody.LastName.ShouldBe("Doe");
        responseBody.SubmittedOn.ShouldBeLessThan(afterRequest);
        responseBody.SubmittedOn.ShouldBeGreaterThan(beforeRequest);
    }

    public record OfferDto(string OfferId, string SalesRepId, string Email, string FirstName, string LastName, DateTime SubmittedOn, DateTime ModifiedOn);
}
