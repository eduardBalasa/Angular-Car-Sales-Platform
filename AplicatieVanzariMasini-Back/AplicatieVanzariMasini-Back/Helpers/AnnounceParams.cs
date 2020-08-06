using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Helpers
{
    public class AnnounceParams
    {
        public int AnnounceId { get; set; }

        private const int MaxPageSize = 30;
        public int PageNumber { get; set; } = 1;

        private int pageSize = 10;
        public bool All { get; set; } = true;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public string Brand { get; set; }
        public string Model { get; set; }
        //public string ModelVersion { get; set; }
        public string Fuel { get; set; }
        public string Km { get; set; }
        public string ManufacturingDate { get; set; }
        public string Price { get; set; }
    }
}
