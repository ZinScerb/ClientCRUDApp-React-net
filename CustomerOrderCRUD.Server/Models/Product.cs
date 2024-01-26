using Microsoft.EntityFrameworkCore;

namespace CustomerOrderCRUD.Server.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        [Precision(18, 2)]
        public decimal Price { get; set; }
        public virtual ICollection<Order>? Orders { get; set; }
    }
}