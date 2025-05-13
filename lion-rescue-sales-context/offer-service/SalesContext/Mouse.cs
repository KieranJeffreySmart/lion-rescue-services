namespace offer_service.SalesContext;

public class Mouse(string mouseId, string firstName, string lastName)
{
    public string MouseId { get; set; } = mouseId;
    public string FirstName { get; set; } = firstName;
    public string LastName { get; set; } = lastName;
}
