using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AplicatieVanzariMasini_Back.Helpers;
using AplicatieVanzariMasini_Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AplicatieVanzariMasini_Back.Data
{
    public class AnnounceRepository : IAnnounceRepository
    {
        private readonly DataContext _context;
        public AnnounceRepository(DataContext context)
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
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Announce> GetAnnounce(int id)
        {
            var query = _context.Announce.Include(p => p.PhotosForAnnounce).AsQueryable();

            var announce = await query.FirstOrDefaultAsync(u => u.AnnounceId == id);

            return announce;

        }

    

        public async Task<PagedList<Announce>> GetAnnounces(AnnounceParams announceParams, int userId)
        {
            var announces = _context.Announce.AsQueryable();

            announces = announces.Where(a => a.AnnounceId != announceParams.AnnounceId);

            if (announceParams.Brand != "undefined" && announceParams.Brand != null)
            {
                announces = announces.Where(a => a.Car.Brand.Name == announceParams.Brand);
            }

            if (announceParams.Model != "undefined" && announceParams.Model != null)
            {
                announces = announces.Where(a => a.Car.Model.Name == announceParams.Model);
            }

            if (announceParams.ModelVersion != "undefined" && announceParams.ModelVersion != null)
            {
                announces = announces.Where(a => a.Car.ModelVersion.Name == announceParams.ModelVersion);
            }

            if (announceParams.Fuel != "undefined" && announceParams.Fuel != null)
            {
                announces = announces.Where(a => a.Car.Fuel.Name == announceParams.Fuel);
            }

            //Kilometers
            if (announceParams.MinKm != "undefined" && announceParams.MaxKm != "undefined" && announceParams.MinKm != null && announceParams.MaxKm != null)
            {
                int minKm = Convert.ToInt32(announceParams.MinKm);
                int maxKm = Convert.ToInt32(announceParams.MaxKm);

                announces = announces.Where(a => Convert.ToInt32(a.Car.Km) >= minKm && Convert.ToInt32(a.Car.Km) <= maxKm);

            }

            if (announceParams.MinKm != "undefined" && announceParams.MinKm != null)
            {
                int minKm = Convert.ToInt32(announceParams.MinKm);

                announces = announces.Where(a => Convert.ToInt32(a.Car.Km) >= minKm);
            }
            else if (announceParams.MaxKm != "undefined" && announceParams.MaxKm != null)
            {
                int maxKm = Convert.ToInt32(announceParams.MaxKm);

                announces = announces.Where(a => Convert.ToInt32(a.Car.Km) <= maxKm);

            }

            //ManufacturingDate
            if (announceParams.MinManufacturingDate != "undefined" && announceParams.MinManufacturingDate != null && announceParams.MaxManufacturingDate != "undefined" && announceParams.MaxManufacturingDate != null)
            {
                int minManufacturingDate = Convert.ToInt32(announceParams.MinManufacturingDate);
                int maxManufacturingDate = Convert.ToInt32(announceParams.MaxManufacturingDate);

                announces = announces.Where(a => Convert.ToInt32(a.Car.ManufacturingDate.Year) >= minManufacturingDate && Convert.ToInt32(a.Car.ManufacturingDate.Year) <= maxManufacturingDate);
            }

            if (announceParams.MinManufacturingDate != "undefined" && announceParams.MinManufacturingDate != null)
            {
                int minManufacturingDate = Convert.ToInt32(announceParams.MinManufacturingDate);

                announces = announces.Where(a => Convert.ToInt32(a.Car.ManufacturingDate.Year) >= minManufacturingDate);
            }
            else if (announceParams.MaxManufacturingDate != "undefined" && announceParams.MaxManufacturingDate != null)
            {
                int maxManufacturingDate = Convert.ToInt32(announceParams.MaxManufacturingDate);

                announces = announces.Where(a => Convert.ToInt32(a.Car.ManufacturingDate.Year) <= maxManufacturingDate);
            }

            //Prices
            if (announceParams.MinPrice != "undefined" && announceParams.MinPrice != null && announceParams.MaxPrice != "undefined" && announceParams.MaxPrice != null)
            {
                int minPrice = Convert.ToInt32(announceParams.MinPrice);
                int maxPrice = Convert.ToInt32(announceParams.MaxPrice);

                announces = announces.Where(a => Convert.ToInt32(a.Car.Price) >= minPrice && Convert.ToInt32(a.Car.Price) <= maxPrice);
            }

            if (announceParams.MinPrice != "undefined" && announceParams.MinPrice != null)
            {
                int minPrice = Convert.ToInt32(announceParams.MinPrice);

                announces = announces.Where(a => Convert.ToInt32(a.Car.Price) >= minPrice);

            }
            else if (announceParams.MaxPrice != "undefined" && announceParams.MaxPrice != null)
            {
                int maxPrice = Convert.ToInt32(announceParams.MaxPrice);

                announces = announces.Where(a => Convert.ToInt32(a.Car.Price) <= maxPrice);
            }

            if (!announceParams.All)
            {
                announces = announces.Where(a => a.SaveAnnounces.Any(sa => sa.UserId == userId) == true).AsQueryable();
            }

            if(announceParams.userAnnounces != "undefined" && announceParams.userAnnounces != null)
            {
                announces = announces.Where(a => a.UserId == userId).AsQueryable();
            }

            return await PagedList<Announce>.CreateAsync(announces, announceParams.PageNumber, announceParams.PageSize);
        }


        public async Task<PhotoForAnnounce> GetAnnouncePhoto(int id)
        {
            var photo = await _context.PhotoForAnnounces.Where(p => p.Id == id).FirstOrDefaultAsync();
            return photo;
        }

        public async Task<SaveAnnounce> GetAnnounceSaved(int userId, int announceId)
        {
            return await _context.SaveAnnounces.FirstOrDefaultAsync(u =>
            u.AnnounceId == announceId && u.UserId == userId);
        }

        public async Task<PagedList<Announce>> GetAnnouncesByUser(int userId, AnnounceParams announceParams)
        {
            var announces = _context.Announce.Where(a => a.UserId == userId).AsQueryable();

            return await PagedList<Announce>.CreateAsync(announces, announceParams.PageNumber, announceParams.PageSize);
        }
    }
}
