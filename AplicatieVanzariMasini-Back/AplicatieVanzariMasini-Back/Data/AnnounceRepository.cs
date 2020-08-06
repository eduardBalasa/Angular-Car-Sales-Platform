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

            if(announceParams.Model != "undefined" && announceParams.Model != null)
            {
                announces = announces.Where(a => a.Car.Model.Name == announceParams.Model);
            }

            if (announceParams.Fuel != "undefined" && announceParams.Fuel != null)
            {
                announces = announces.Where(a => a.Car.Fuel.Name == announceParams.Fuel);
            }

            if (announceParams.Km != "undefined" && announceParams.Km != null)
            {
                announces = announces.Where(a => a.Car.Km == announceParams.Km);
            }

            if (announceParams.ManufacturingDate != "undefined" && announceParams.ManufacturingDate != null)
            {
                announces = announces.Where(a => a.Car.ManufacturingDate.Year == announceParams.ManufacturingDate);
            }

            if (announceParams.Price != "undefined" && announceParams.Price != null)
            {
                announces = announces.Where(a => a.Car.Price == announceParams.Price);
            }

            if (!announceParams.All)
            {
                 announces = announces.Where(a => a.SaveAnnounces.Any(sa => sa.UserId == userId) == true).AsQueryable();
            }


            return await PagedList<Announce>.CreateAsync(announces, announceParams.PageNumber, announceParams.PageSize);
        }


        public async Task<PhotoForAnnounce> GetAnnouncePhoto(int id)
        {
            //var photo = await _context.PhotoForAnnounces.IgnoreQueryFilters()
            //    .FirstOrDefaultAsync(p => p.AnnounceId == id);
            var photo = await _context.PhotoForAnnounces.Where(p => p.Id == id).FirstOrDefaultAsync();
            return photo;
        }

        public async Task<SaveAnnounce> GetAnnounceSaved(int userId, int announceId)
        {
            return await _context.SaveAnnounces.FirstOrDefaultAsync(u =>
            u.AnnounceId == announceId && u.UserId == userId);
        }
    }
}
