using Microsoft.EntityFrameworkCore;

namespace CustomerOrderCRUD.Server.Models
{
    public enum GenderType
    {
        Male, Female
    }

    public class Client
    {
        public int ClientID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime Birthdate { get; set; }
        public GenderType Gender { get; set; }
        public virtual ICollection<Order>? Orders { get; set; }
    }
}