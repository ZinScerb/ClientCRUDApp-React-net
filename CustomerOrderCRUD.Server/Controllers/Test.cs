using CustomerOrderCRUD.Server.Models;

namespace CustomerOrderCRUD.Server.Controllers
{
    public class ClientView
    {
        public int clientID { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public DateTime birthDate { get; set; }
        public GenderType gender { get; set; }
        public int orderCount { get; set; }
        public decimal total { get; set; }
    }
}