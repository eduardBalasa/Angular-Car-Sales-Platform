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
        public string ModelVersion { get; set; }
        public string Fuel { get; set; }
        public string userAnnounces { get; set; }
        public string MinKm { get; set; }
        public string MaxKm { get; set; }
        public string MinManufacturingDate { get; set; }
        public string MaxManufacturingDate { get; set; }
        public string MinPrice { get; set; }
        public string MaxPrice { get; set; }
    }
}
