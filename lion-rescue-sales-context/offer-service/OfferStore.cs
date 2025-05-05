using Microsoft.EntityFrameworkCore;

namespace offer_service;

public class EFOfferStore: IOfferStore
{
    private readonly OfferDbContext _dbContext;

    public EFOfferStore(OfferDbContext dbContext)
    {
        _dbContext = dbContext;
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

public class OfferDbContext : DbContext
    {
        public OfferDbContext(DbContextOptions<OfferDbContext> options) : base(options)
        {
        }
        
        public DbSet<Offer> Offers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Offer>().HasKey(x => x.OfferId);

            modelBuilder.Entity<Offer>().HasData(
                new Offer(
                    offerId: "123",
                    salesRepId: "123",
                    email: "jd@email.com",
                    firstName: "John",
                    lastName: "Doe",
                    submittedOn: DateTime.UtcNow,
                    modifiedOn: DateTime.UtcNow
                )
            );
        }
    }