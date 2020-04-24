﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Data
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
    }
}
