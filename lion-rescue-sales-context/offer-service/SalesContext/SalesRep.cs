namespace offer_service.SalesContext;

public class SalesRep(string salesRepId, string firstName, string lastName)
{
    public string SalesRepId { get; set; } = salesRepId;
    public string FirstName { get; set; } = firstName;
    public string LastName { get; set; } = lastName;
}
