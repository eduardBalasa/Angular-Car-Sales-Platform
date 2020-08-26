using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Models
{
    public class Model
    {
        public int ModelId { get; set; }
        public string Name { get; set; }
        public int BrandId { get; set; }
        public virtual Brand Brand { get; set; }
        public virtual ICollection<ModelVersion> ModelVersions { get; set; }
        public virtual ICollection<Car> Cars { get; set; }
    }
}
