using AplicatieVanzariMasini_Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Data
{
    public interface ICarSpecificationRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<List<Body>> GetBodies();
        Task<List<Brand>> GetBrands();
        Task<List<Model>> GetModels();
        Task<List<ModelVersion>> GetModelVersions();
        Task<List<Transmission>> GetTransmissions();
        Task<List<ManufacturingDate>> GetManufacturingDates();
        Task<List<PollutionRule>> GetPollutionRules();
        Task<List<Gearbox>> GetGearboxes();
        Task<List<Fuel>> GetFuels();
        Task<List<Country>> GetCountries();
    }
}
