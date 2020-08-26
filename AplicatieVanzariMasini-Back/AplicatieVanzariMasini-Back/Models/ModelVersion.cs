using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Models
{
    public class ModelVersion
    {
        public int ModelVersionId { get; set; }
        public string Name { get; set; }
        public int ModelId { get; set; }
        public virtual Model Model{ get; set; }
        public virtual ICollection<Car> Cars { get; set; }

    }
}
