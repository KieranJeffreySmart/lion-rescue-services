using Microsoft.EntityFrameworkCore;

namespace offer_service.SalesContext;

public class SalesDbContext : DbContext
{
    public SalesDbContext(DbContextOptions<SalesDbContext> options) : base(options)
    {
    }
    
    public DbSet<Offer> Offers { get; set; }
    public DbSet<Mouse> Mouses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Offer>().HasKey(x => x.OfferId);

        modelBuilder.Entity<Offer>().HasData(
            new Offer(
                offerId: "123",
                mouseId: "123",
                email: "jd@email.com",
                firstName: "John",
                lastName: "Doe",
                submittedOn: DateTime.UtcNow,
                modifiedOn: DateTime.UtcNow
            )
        );
        
        modelBuilder.Entity<Mouse>().HasKey(x => x.MouseId);

        modelBuilder.Entity<Mouse>().HasData(
            new Mouse(
                mouseId: "Mouse01",
                firstName: "Mabel",
                lastName: "DeMouse"
            )
        );
    }
}
