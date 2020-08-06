using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Models
{
    public class PhotoForAnnounce
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
        public bool IsMain { get; set; }
        public bool IsApproved { get; set; }
        public int AnnounceId { get; set; }
        public virtual Announce Announce{ get; set; }
    }
}
