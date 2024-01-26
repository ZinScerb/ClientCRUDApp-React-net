using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerOrderCRUD.Server.Models;
using Microsoft.CodeAnalysis;

namespace CustomerOrderCRUD.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ClientDbContext _context;

        public ClientController(ClientDbContext context)
        {
            _context = context;
        }

        // GET: api/Client
        [IgnoreAntiforgeryToken]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            return await _context.Clients.ToListAsync();
        }

        [IgnoreAntiforgeryToken]
        [HttpGet("getDetailedClients")]
        public List<ClientView> GetOrderCount()
        {
            return _context.Clients
                 .Include(o => o.Orders).ThenInclude(p => p.Product)
                 .Select(c =>
                     new ClientView
                     {
                         clientID = c.ClientID,
                         name = c.Name,
                         email = c.Email,
                         birthDate = c.Birthdate,
                         gender = c.Gender,
                         orderCount = c.Orders.Count(),
                         total = c.Orders.Select(o => o.Quantity * o.Product.Price).Sum()
                     }
                 ).ToList();
        }

        // GET: api/Client/5
        [IgnoreAntiforgeryToken]
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        // PUT: api/Client/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [IgnoreAntiforgeryToken]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(int id, Client client)
        {
            if (id != client.ClientID)
            {
                return BadRequest();
            }

            _context.Entry(client).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }

            return NoContent();
        }

        // POST: api/Client
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [IgnoreAntiforgeryToken]
        [HttpPost]
        public async Task<ActionResult<Client>> PostClient(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClient", new { id = client.ClientID }, client);
        }

        // DELETE: api/Client/5
        [IgnoreAntiforgeryToken]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClientExists(int id)
        {
            return _context.Clients.Any(e => e.ClientID == id);
        }
    }
}
