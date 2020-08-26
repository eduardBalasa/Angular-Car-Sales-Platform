using AplicatieVanzariMasini_Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Dtos
{
    public class AnnounceAndCarForReturnDto
    {
        public int CarId { get; set; }
        public int UserId { get; set; }
        public int AnnounceId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Features { get; set; }
        public string Km { get; set; }
        public string Price { get; set; }
        public string CylindricalCapacity { get; set; }
        public string EnginePower { get; set; }
        public string State { get; set; }
        public string Damaged { get; set; }
        public string ParticleFilter { get; set; }
        public string RightHandDrive { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string ModelVersion { get; set; }
        public string Body { get; set; }
        public string Fuel { get; set; }
        public string Country { get; set; }
        public string Transmission { get; set; }
        public string ManufacturingDate { get; set; }
        public string MainPhotoUrl { get; set; }
        public string Gearbox { get; set; }
        public string PollutionRule { get; set; }
        public string UserMainPhotoUrl { get; set; }
        public AnnounceAndCarForReturnDto()
        {
            CreatedDate = DateTime.Now;
        }

    }
}
