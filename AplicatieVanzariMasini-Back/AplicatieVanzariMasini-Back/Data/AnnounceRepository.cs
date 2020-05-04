using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AplicatieVanzariMasini_Back.Models;

namespace AplicatieVanzariMasini_Back.Data
{
    public class AnnounceRepository : IAnnounceRepository
    {
        private readonly DataContext _context;
        public AnnounceRepository(DataContext context)
        {
            _context = context;
        }
     
    }
}
