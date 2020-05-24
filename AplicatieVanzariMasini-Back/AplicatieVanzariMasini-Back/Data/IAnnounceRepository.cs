using AplicatieVanzariMasini_Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Data
{
    public interface IAnnounceRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<Announce> GetAnnounce(int id);
        Task<List<Announce>> GetAnnounces();
        Task<PhotoForAnnounce> GetAnnouncePhoto(int id);
        //Task<Like> GetAnnounceLike(int announceId, int recipientId);
        //Task<IEnumerable<int>> GetAnnounceLikes(int id, bool likers);

    }
}
