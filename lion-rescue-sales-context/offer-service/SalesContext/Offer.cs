namespace offer_service.SalesContext;

public class Offer(string offerId, string mouseId, string email, string firstName, string lastName, DateTime submittedOn, DateTime modifiedOn)
{
    public string OfferId { get; set; } = offerId;

    public string MouseId { get; set; } = mouseId;
    public string Email { get; set; } = email;
    public string FirstName { get; set; } = firstName;
    public string LastName { get; set; } = lastName;
    public DateTime SubmittedOn { get; set; } = submittedOn;
    public DateTime ModifiedOn { get; set; } = modifiedOn;
}
