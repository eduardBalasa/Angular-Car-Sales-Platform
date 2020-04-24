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
        public int ModelVersionId { get; set; }
        public virtual ModelVersion ModelVersion { get; set; }
        public virtual ICollection<Car> Cars { get; set; }
    }
}
