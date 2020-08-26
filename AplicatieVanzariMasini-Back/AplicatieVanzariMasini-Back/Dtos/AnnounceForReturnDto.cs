using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Dtos
{
    public class AnnounceForReturnDto
    {
        public int AnnounceId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Features { get; set; }
        public string UserPhoneNumber { get; set; }
        public string UserName { get; set; }
        public string UserCreated { get; set; }
        public string Location { get; set; }
        //public string UserMainPhotoUrl { get; set; }
        public ICollection<PhotoForAnnounceToReturnDto> PhotosForAnnounce { get; set; }
        public CarForReturnedAnnounce Car { get; set; }
        public AnnounceForReturnDto()
        {
            CreatedDate = DateTime.Now;
        }
    }
}
