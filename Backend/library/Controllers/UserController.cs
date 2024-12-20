using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace foodRecipe.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LibraryUser user)
        {
            if (await _context.LibraryUsers.AnyAsync(u => u.email == user.email))
            {
                return BadRequest("User with this email already exists.");
            }

            _context.LibraryUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { UserId = user.userid });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LibraryUser loginRequest)
        {
            var user = await _context.LibraryUsers
                .FirstOrDefaultAsync(u => u.email == loginRequest.email && u.password == loginRequest.password && u.usertype==loginRequest.usertype);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { UserId = user.userid });
        }

        [HttpGet("users")] 
        public async Task<IActionResult> GetAllUsers() 
        {
            var users = await _context.LibraryUsers.ToListAsync(); 
            return Ok(users);
        }


        [HttpPost("addBook")] public async Task<IActionResult> AddBook([FromBody] BookCreateRequest request)
        { 

            var book = new Book
            { 
                status=1,
                name = request.name,
                author = request.author,
                explanation = request.explanation,
                imagebase64 = request.imagebase64
            }; 
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return Ok(new { BookId = book.bookid }); 
        }

        [HttpGet("book/{id}")] 
        public async Task<IActionResult> GetBookById(int id) 
        {
            var recipe = await _context.Books.FindAsync(id);
            if (recipe == null) 
            {
                return NotFound("book not found.");
            }
            return Ok(recipe);
        }

        [HttpGet("allbooks")] public async Task<IActionResult> GetAllBooks()
        { 
            var books = await _context.Books.ToListAsync(); 
            return Ok(books);
        }


        [HttpGet("livebooks")]
        public async Task<IActionResult> GetBooksByStatus1()
        {
            var books = await _context.Books.Where(b => b.status == 1).ToListAsync();
            return Ok(books);
        }


        [HttpPost("lendBook")]
        public async Task<IActionResult> CreateBooking([FromBody] Lending lend)
        {
            _context.Lendings.Add(lend);

            // Find the book and update its status to 2
            var book = await _context.Books.FindAsync(lend.bookid);
            if (book != null)
            {
                book.status = 2;
                _context.Books.Update(book);
            }

            await _context.SaveChangesAsync();
            return Ok(new { LendingId = lend.lendid });
        }



        [HttpGet("lending-details")]
        public async Task<IActionResult> GetLendingDetails()
        {
            var lendingDetails = await _context.Lendings
                .Join(_context.Books,
                    lending => lending.bookid,
                    book => book.bookid,
                    (lending, book) => new { lending, book })
                .Join(_context.LibraryUsers,
                    lendingBook => lendingBook.lending.userid,
                    user => user.userid,
                    (lendingBook, user) => new
                    {
                        lendingBook.book.name,
                        lendingBook.book.bookid,
                        user.email
                    })
                .ToListAsync();

            return Ok(lendingDetails);
        }


        //[HttpPut("resetBookStatus/{bookid}")]
        //public async Task<IActionResult> ResetBookStatus(int bookid)
        //{
        //    var book = await _context.Books.FindAsync(bookid);
        //    if (book == null)
        //    {
        //        return NotFound(new { message = "Book not found" });
        //    }

        //    book.status = 1;
        //    _context.Books.Update(book);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Book status reset to 1 successfully", BookId = bookid });
        //}


        [HttpPut("resetBookStatus/{bookid}")]
        public async Task<IActionResult> ResetBookStatus(int bookid)
        {
            var book = await _context.Books.FindAsync(bookid);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            book.status = 1;
            _context.Books.Update(book);
            await _context.SaveChangesAsync();

            var lendingRecords = await _context.Lendings
                .Where(lending => lending.bookid == bookid)
                .ToListAsync();
            _context.Lendings.RemoveRange(lendingRecords);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Book status reset to 1 and lending records deleted successfully", BookId = bookid });
        }


    }



}
