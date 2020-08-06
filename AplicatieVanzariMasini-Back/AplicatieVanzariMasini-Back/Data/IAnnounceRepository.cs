using AplicatieVanzariMasini_Back.Helpers;
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
        Task<PagedList<Announce>> GetAnnounces(AnnounceParams announceParams, int userId);
        Task<PhotoForAnnounce> GetAnnouncePhoto(int id);
        Task<SaveAnnounce> GetAnnounceSaved(int userId, int announceId);
    }
}
