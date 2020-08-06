using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Models
{
    public class SaveAnnounce
    {

        public int AnnounceId { get; set; }
        public int UserId { get; set; }
        public virtual Announce Announce { get; set; }
        public virtual User User { get; set; }
    }
}
