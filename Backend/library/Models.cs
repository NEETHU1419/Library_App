using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace foodRecipe
{
    public class LibraryUser
    {
        [JsonIgnore]
        [Key]
        public int userid { get; set; }
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }


    public class LoginRequest
    {
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }

    public class Book
    {
        [Key]
        public int bookid { get; set; }
        public int status { get; set; }
        public string name { get; set; }
        public string author { get; set; }
        public string explanation { get; set; }
        public string imagebase64 { get; set; } // Store the image as a base64 string

    }

    public class BookCreateRequest
    {
        public string name { get; set; }
        public string author { get; set; }

        public string explanation { get; set; }
        public string imagebase64 { get; set; } // Base64 encoded image string }



    }

    public class Lending
    {
        [JsonIgnore]
        [Key]
        public int lendid { get; set; } // Primary key, auto-increment
        public int userid { get; set; }
        public int bookid { get; set; }
    }






}