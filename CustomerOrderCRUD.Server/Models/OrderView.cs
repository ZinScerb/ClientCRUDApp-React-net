namespace CustomerOrderCRUD.Server.Models
{
    public class OrderView
    {
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Product { get; set; }
        public string ClientName { get; internal set; }
        public int OrderID { get; internal set; }
        public StatusType Status { get; internal set; }
    }
}