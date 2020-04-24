using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Models
{
    public class Car
    {
        public int Id { get; set; }
        public string State { get; set; }
        public string Damaged { get; set; }
        public string Description { get; set; }
        public string ParticleFilter { get; set; }
        public string RightHandDrive { get; set; }
        public DateTime ManufacturingDate { get; set; }
        public int BrandId { get; set; }
        public virtual Brand Brand { get; set; }
        public int ModelId { get; set; }
        public virtual Model Model { get; set; }
        public int BodyId { get; set; }
        public virtual Body Body { get; set; }
        public int FuelId { get; set; }
        public virtual Fuel Fueld { get; set; }
        public int CylindricalCapacityId { get; set; }
        public virtual CylindricalCapacity CylindricalCapacity { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        public int TransmissionId { get; set; }
        public virtual Transmission Transmission { get; set; }
        public int GearboxId { get; set; }
        public virtual Gearbox Gearbox { get; set; }
        public int PollutionRuleId { get; set; }
        public virtual PollutionRule PollutionRule { get; set; }
        public int PowerId { get; set; }
        public virtual Power Power { get; set; }
        public int KmId { get; set; }
        public virtual Km Km { get; set; }
        public int PriceId { get; set; }
        public virtual Price Price { get; set; }

    }
}
