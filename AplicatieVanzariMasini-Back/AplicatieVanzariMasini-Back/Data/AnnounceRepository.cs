using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<List<Announce>> GetAnnounces()
        {
            return await _context.Announce.ToListAsync();
        }


        public async Task<PhotoForAnnounce> GetAnnouncePhoto(int id)
        {
            var photo = await _context.PhotoForAnnounces.IgnoreQueryFilters()
                .FirstOrDefaultAsync(p => p.AnnounceId == id);

            return photo;
        }

        //public async Task<Like> GetAnnounceLike(int announceId, int recipientId)
        //{
        //    return await _context.Likes.FirstOrDefaultAsync(u =>
        //    u.LikerId == announceId && u.LikeeId == recipientId);
        //}

        //private async Task<IEnumerable<int>> GetAnnounceLikes(int id, bool likers)
        //{
        //    var announce = await _context.Announce.FirstOrDefaultAsync(u => u.AnnounceId == id);

        //    if (likers)
        //    {
        //        return announce.AnnounceLikers.Where(u => u.AnnounceLikeeId == id).Select(i => i.AnnounceLikeeId);
        //    }
        //    else
        //    {
        //        return announce.AnnounceLikees.Where(u => u.AnnounceLikerId == id).Select(i => i.AnnounceLikerId);
        //    }

        //}

    }
}
