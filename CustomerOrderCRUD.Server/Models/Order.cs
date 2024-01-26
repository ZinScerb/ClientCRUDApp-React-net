using Microsoft.EntityFrameworkCore;

namespace CustomerOrderCRUD.Server.Models
{
    public enum StatusType
    {
        Created, Paid, Delivered
    }

    public class Order
    {
        public int OrderID { get; set; }
        public int ClientID { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public StatusType Status { get; set; }
        public virtual Client Client { get; set; }
        public virtual Product Product { get; set; }
    }
}