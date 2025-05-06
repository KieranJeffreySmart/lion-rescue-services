namespace offer_service.SalesContext;

public class EFOfferStore: IOfferStore
{
    private readonly SalesDbContext _dbContext;

    public EFOfferStore(SalesDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbContext.Database.EnsureCreated();
    }

    public async Task<Offer> GetOffer(string offerId)
    {
        return await _dbContext.Offers.FindAsync(offerId) ?? throw new Exception("Offer not found");
    }

    public async Task<Offer> CreateOffer(Offer offer)
    {
        await _dbContext.Offers.AddAsync(offer);
        await _dbContext.SaveChangesAsync();
        return offer;
    }

    public async Task<Offer> UpdateOffer(Offer offer)
    {
        _dbContext.Offers.Update(offer);
        await _dbContext.SaveChangesAsync();
        return offer;
    }

    public async Task DeleteOffer(string offerId)
    {
        var offer = await GetOffer(offerId);
        _dbContext.Offers.Remove(offer);
        await _dbContext.SaveChangesAsync();
    }
}
