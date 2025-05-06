namespace offer_service.SalesContext;

public interface IOfferStore 
{
    Task<Offer> GetOffer(string offerId);
    Task<Offer> CreateOffer(Offer offer);
    Task<Offer> UpdateOffer(Offer offer);
    Task DeleteOffer(string offerId);
}
