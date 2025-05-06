namespace offer_service.SalesContext;

public class Offer(string offerId, string salesRepId, string email, string firstName, string lastName, DateTime submittedOn, DateTime modifiedOn)
{
    public string OfferId { get; set; } = offerId;

    public string SalesRepId { get; set; } = salesRepId;
    public string Email { get; set; } = email;
    public string FirstName { get; set; } = firstName;
    public string LastName { get; set; } = lastName;
    public DateTime SubmittedOn { get; set; } = submittedOn;
    public DateTime ModifiedOn { get; set; } = modifiedOn;
}
