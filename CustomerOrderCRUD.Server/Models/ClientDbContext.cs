using Microsoft.EntityFrameworkCore;

namespace CustomerOrderCRUD.Server.Models
{
    public class ClientDbContext : DbContext
    {
        public ClientDbContext(DbContextOptions<ClientDbContext> options)
        : base(options)
        {
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Client>()
                .Property(e => e.Gender)
                .HasConversion(
                    v => v.ToString(),
                    v => (GenderType)Enum.Parse(typeof(GenderType), v));

            modelBuilder
                .Entity<Order>()
                .Property(e => e.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (StatusType)Enum.Parse(typeof(StatusType), v));

            modelBuilder.Entity<Client>()
                .HasMany(e => e.Orders)
                .WithOne(e => e.Client)
                .HasForeignKey(e => e.ClientID)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Product>()
                .HasMany(e => e.Orders)
                .WithOne(e => e.Product)
                .HasForeignKey(e => e.ProductID)
                .IsRequired();  
        }
    }
}
