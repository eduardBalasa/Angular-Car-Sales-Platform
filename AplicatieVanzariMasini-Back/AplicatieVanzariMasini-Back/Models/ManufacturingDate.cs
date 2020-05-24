using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Models
{
    public class ManufacturingDate
    {
        public int ManufacturingDateId { get; set; }
        public string Year { get; set; }
        public virtual ICollection<Car> Cars { get; set; }
    }
}
