namespace offer_service.SalesContext;

public class EFSalesRepStore : ISalesRepStore
{
    private readonly SalesDbContext _dbContext;

    public EFSalesRepStore(SalesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<SalesRep> GetSalesRep(string salesRepId)
    {
        return await _dbContext.SalesReps.FindAsync(salesRepId) ?? throw new Exception("Sales Rep not found");;
    }

    public async Task<SalesRep> CreateSalesRep(SalesRep salesRep)
    {
        await _dbContext.SalesReps.AddAsync(salesRep);
        await _dbContext.SaveChangesAsync();
        return salesRep;
    }

    public async Task<SalesRep> UpdateSalesRep(SalesRep salesRep)
    {
        _dbContext.SalesReps.Update(salesRep);
        await _dbContext.SaveChangesAsync();
        return salesRep;
    }

    public async Task DeleteSalesRep(string salesRepId)
    {
        var salesRep = await GetSalesRep(salesRepId);
        if (salesRep != null)
        {
            _dbContext.SalesReps.Remove(salesRep);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task<bool> SalesRepExists(string salesRepId)
    {
        return (await _dbContext.SalesReps.FindAsync(salesRepId)) != null;
    }
}
