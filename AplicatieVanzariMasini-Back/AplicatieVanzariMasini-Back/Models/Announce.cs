using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Models
{
    public class Announce
    {
        public int AnnounceId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CarId { get; set; }
        public virtual Car Car { get; set; }
        public virtual ICollection<PhotoForAnnounce> PhotosForAnnounce { get; set; }

    }
}
