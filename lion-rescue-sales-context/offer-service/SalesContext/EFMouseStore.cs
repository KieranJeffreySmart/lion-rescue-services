namespace offer_service.SalesContext;

public class EFMouseStore : IMouseStore
{
    private readonly SalesDbContext _dbContext;

    public EFMouseStore(SalesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Mouse> GetMouse(string mouseId)
    {
        return await _dbContext.Mouses.FindAsync(mouseId) ?? throw new Exception("Sales Rep not found");;
    }

    public async Task<Mouse> CreateMouse(Mouse mouse)
    {
        await _dbContext.Mouses.AddAsync(mouse);
        await _dbContext.SaveChangesAsync();
        return mouse;
    }

    public async Task<Mouse> UpdateMouse(Mouse mouse)
    {
        _dbContext.Mouses.Update(mouse);
        await _dbContext.SaveChangesAsync();
        return mouse;
    }

    public async Task DeleteMouse(string mouseId)
    {
        var mouse = await GetMouse(mouseId);
        if (mouse != null)
        {
            _dbContext.Mouses.Remove(mouse);
            await _dbContext.SaveChangesAsync();
        }
    }

    public async Task<bool> MouseExists(string mouseId)
    {
        return (await _dbContext.Mouses.FindAsync(mouseId)) != null;
    }
}
