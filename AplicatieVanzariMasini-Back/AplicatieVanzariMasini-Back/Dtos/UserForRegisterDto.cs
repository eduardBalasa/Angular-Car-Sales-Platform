using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Trebuie sa introduci o parola intre 4 si 8 caractere")]
        public string  Password { get; set; }
        [Required(ErrorMessage = "Este necesar un numar de telefon.")]
        [DataType(DataType.PhoneNumber, ErrorMessage = "Numar de telefon invalid")]
        [RegularExpression(@"^([0-9]{10})$", ErrorMessage = "Numar de telefon invalid")]
        public string PhoneNumber { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string County { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}
