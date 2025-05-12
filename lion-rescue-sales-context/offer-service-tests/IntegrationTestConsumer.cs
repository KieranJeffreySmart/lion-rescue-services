namespace offer_service_tests;


using System.Threading.Tasks;
using MassTransit;
using offer_service;

public class IntegrationTestConsumer<T>(EventList<T> eventList) : IConsumer<T> where T : class, IEvent
{
    private EventList<T> _eventList = eventList;


    public Task Consume(ConsumeContext<T> context)
    {
        _eventList.Add(context.Message);
        return Task.CompletedTask;
    }
}

public class EventList<T> where T : class, IEvent
{
    private readonly List<T> _events = new List<T>();

    public void Add(T @event)
    {
        _events.Add(@event);
    }

    public IEnumerable<T> GetAll()
    {
        return _events;
    }
}