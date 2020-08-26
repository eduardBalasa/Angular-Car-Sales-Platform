using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Dtos
{
    public class VersionForModelDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ModelId { get; set; }
    }
}
