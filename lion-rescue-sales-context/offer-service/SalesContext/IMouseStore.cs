namespace offer_service.SalesContext;

public interface IMouseStore  {
    Task<Mouse> GetMouse(string mouseId);
    Task<Mouse> CreateMouse(Mouse mouse);
    Task<Mouse> UpdateMouse(Mouse mouse);
    Task DeleteMouse(string mouseId);
    Task<bool> MouseExists(string mouseId);
}
