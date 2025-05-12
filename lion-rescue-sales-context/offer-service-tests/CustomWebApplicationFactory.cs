using MassTransit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using offer_service;


namespace offer_service_tests;

public class CustomWebApplicationFactory<TProgram>: WebApplicationFactory<TProgram> where TProgram : class
{
    private static readonly EventList<NewOfferEvent> eventList = new EventList<NewOfferEvent>();
    public EventList<NewOfferEvent> NewOfferEventList = eventList;
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(s => {
            s.AddSingleton(NewOfferEventList);
            s.AddMassTransitTestHarness(x => {
                x.AddConsumer<IntegrationTestConsumer<NewOfferEvent>>();
                
                x.UsingInMemory((context, cfg) =>
                {
                    cfg.ConfigureEndpoints(context);
                });
            });
        });
        
        Environment.SetEnvironmentVariable("DB_CONNECTION_TYPE", "InMemory");
        Environment.SetEnvironmentVariable("MESSAGE_QUEUE_TYPE", "InMemory");
    }

}


