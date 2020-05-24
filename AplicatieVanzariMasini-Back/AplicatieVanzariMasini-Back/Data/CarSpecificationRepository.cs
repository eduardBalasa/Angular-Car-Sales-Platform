using AplicatieVanzariMasini_Back.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Data
{
    public class CarSpecificationRepository : ICarSpecificationRepository
    {
        private readonly DataContext _context;
        public CarSpecificationRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<List<Body>> GetBodies()
        {
            return await _context.Bodies.ToListAsync();
        }

        public async Task<List<Brand>> GetBrands()
        {
            return await _context.Brands.ToListAsync();
        }

        //public async Task<List<CylindricalCapacity>> GetCylindricalCapacities()
        //{
        //    return await _context.CylindricalCapacities.ToListAsync();
        //}

        public async Task<List<Fuel>> GetFuels()
        {
            return await _context.Fuels.ToListAsync();
        }

        public async Task<List<Gearbox>> GetGearboxes()
        {
            return await _context.Gearboxes.ToListAsync();
        }

        public async Task<List<PollutionRule>> GetPollutionRules()
        {
            return await _context.PollutionRules.ToListAsync();
        }

        public async Task<List<Transmission>> GetTransmissions()
        {
            return await _context.Transmissions.ToListAsync();
        }
        public async Task<List<ManufacturingDate>> GetManufacturingDates()
        {
            return await _context.ManufacturingDates.ToListAsync();
        }

        //public async Task<List<Power>> GetPowers()
        //{
        //    return await _context.Powers.ToListAsync();
        //}

        public async Task<List<Country>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }

        public async Task<List<Model>> GetModels()
        {
            return await _context.Models.ToListAsync();
        }

        public async Task<List<ModelVersion>> GetModelVersions()
        {
            return await _context.ModelVersions.ToListAsync();
        }

        //public async Task<List<Km>> GetKms()
        //{
        //    return await _context.Kms.ToListAsync();
        //}

        //public async Task<List<Price>> GetPrices()
        //{
        //    return await _context.Prices.ToListAsync();
        //}
    }
}
