using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Models
{
    public class Car
    {
        public int CarId { get; set; }
        public string Km { get; set; }
        public string Price { get; set; }
        public string CylindricalCapacity { get; set; }
        public string EnginePower { get; set; }
        public string State { get; set; }
        public string Damaged { get; set; }
        public string ParticleFilter { get; set; }
        public string RightHandDrive { get; set; }
        public int BrandId { get; set; }
        public virtual Brand Brand { get; set; }
        public int ModelId { get; set; }
        public virtual Model Model { get; set; }
        public int ModelVersionId { get; set; }
        public virtual ModelVersion ModelVersion { get; set; }
        public int BodyId { get; set; }
        public virtual Body Body { get; set; }
        public int FuelId { get; set; }
        public virtual Fuel Fuel { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        public int TransmissionId { get; set; }
        public virtual Transmission Transmission { get; set; }
        public int ManufacturingDateId { get; set; }
        public virtual ManufacturingDate ManufacturingDate { get; set; }
        public int GearboxId { get; set; }
        public virtual Gearbox Gearbox { get; set; }
        public int PollutionRuleId { get; set; }
        public virtual PollutionRule PollutionRule { get; set; }
        public virtual ICollection<Announce> Announce { get; set; }

    }
}
