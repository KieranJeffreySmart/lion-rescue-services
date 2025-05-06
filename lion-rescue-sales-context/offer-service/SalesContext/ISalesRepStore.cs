namespace offer_service.SalesContext;

public interface ISalesRepStore  {
    Task<SalesRep> GetSalesRep(string salesRepId);
    Task<SalesRep> CreateSalesRep(SalesRep salesRep);
    Task<SalesRep> UpdateSalesRep(SalesRep salesRep);
    Task DeleteSalesRep(string salesRepId);
    Task<bool> SalesRepExists(string salesRepId);
}
