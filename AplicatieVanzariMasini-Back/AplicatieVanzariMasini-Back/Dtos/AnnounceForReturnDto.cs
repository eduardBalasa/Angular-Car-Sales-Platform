using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Dtos
{
    public class AnnounceForReturnDto
    {
        public int AnnounceId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<PhotoForAnnounceToReturnDto> AnnouncePhotos { get; set; }
        public AnnounceForReturnDto()
        {
            CreatedDate = DateTime.Now;
        }
    }
}
