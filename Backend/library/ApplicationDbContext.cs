using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace foodRecipe
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<LibraryUser> LibraryUsers { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Lending> Lendings { get; set; }

    }

}
