using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Dtos
{
    public class CarForAnnounceDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Km { get; set; }
        public string Price { get; set; }
        public string CylindricalCapacity { get; set; }
        public string EnginePower { get; set; }
        public string State { get; set; }
        public string Damaged { get; set; }
        public string ParticleFilter { get; set; }
        public string RightHandDrive { get; set; }
        public int BrandId { get; set; }
        public int ModelId { get; set; }
        public int BodyId { get; set; }
        public int FuelId { get; set; }
        public int CountryId { get; set; }
        public int TransmissionId { get; set; }
        public int ManufacturingDateId { get; set; }
        public int GearboxId { get; set; }
        public int PollutionRuleId { get; set; }
        public CarForAnnounceDto()
        {
            CreatedDate = DateTime.Now;
        }
    }
}
