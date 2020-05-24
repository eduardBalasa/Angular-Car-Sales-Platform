using AplicatieVanzariMasini_Back.Data;
using AplicatieVanzariMasini_Back.Dtos;
using AplicatieVanzariMasini_Back.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnnounceController : ControllerBase
    {
        private readonly IAnnounceRepository _announceRepository;
        private readonly IMapper _mapper;
        private readonly ICarRepository _repo;
        private readonly DataContext _context;

        public AnnounceController(DataContext context, IAnnounceRepository announceRepository, IMapper mapper,
            ICarRepository repo)
        {
            _announceRepository = announceRepository;
            _mapper = mapper;
            _repo = repo;
            _context = context;
        }

        [HttpGet("{id}", Name="GetAnnounce")]
        public async Task<IActionResult> GetAnnounce(int id)
        {
            var announce = await _announceRepository.GetAnnounce(id);

            var announceToReturn = _mapper.Map<AnnounceForReturnDto>(announce);

            return Ok(announceToReturn);
        }

        [HttpGet("GetAnnounces")]
        public async Task<IActionResult> GetAnnounces()
        {
            var announceFromRepo = await _announceRepository.GetAnnounces();

            var announces = _mapper.Map<List<AnnounceAndCarForReturnDto>>(announceFromRepo);

            return Ok(announces);
        }


        [HttpPost("{userId}")]
        public async Task<IActionResult> AddAnnounce(int userId, CarForAnnounceDto carAnnounceDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            var car = new Car()
            {
                Km = carAnnounceDto.Km,
                Price = carAnnounceDto.Price,
                EnginePower = carAnnounceDto.EnginePower,
                CylindricalCapacity = carAnnounceDto.CylindricalCapacity,
                State = carAnnounceDto.State,
                Damaged = carAnnounceDto.Damaged,
                ParticleFilter = carAnnounceDto.ParticleFilter,
                RightHandDrive = carAnnounceDto.RightHandDrive,
                BrandId = carAnnounceDto.BrandId,
                BodyId = carAnnounceDto.BodyId,
                ModelId = carAnnounceDto.ModelId,
                FuelId = carAnnounceDto.FuelId,
                CountryId = carAnnounceDto.CountryId,
                GearboxId = carAnnounceDto.GearboxId,
                TransmissionId = carAnnounceDto.TransmissionId,
                ManufacturingDateId = carAnnounceDto.ManufacturingDateId,
                PollutionRuleId = carAnnounceDto.PollutionRuleId

            };

            _repo.Add(car);

            await _repo.SaveAll();

            _repo.Add(new Announce()
            {
                Title = carAnnounceDto.Title,
                Description = carAnnounceDto.Description,
                CreatedDate = carAnnounceDto.CreatedDate,
                CarId = car.CarId
            });

            if (await _repo.SaveAll())
            {

                return NoContent();

            }
            return BadRequest("A aparut o problema");
        }

        //[HttpPost("{id}/like/{recipientId}")]
        //public async Task<IActionResult> LikeAnnounce(int id, int recipientId)
        //{
        //    if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //        return Unauthorized();

        //    var like = await _announceRepository.GetAnnounceLike(id, recipientId);

        //    if (like != null)
        //        return BadRequest("Ai apreciat deja acest anunt!");

        //    if (await _announceRepository.GetAnnounce(recipientId) == null)
        //        return NotFound();

        //    like = new Like
        //    {
        //        LikerId = id,
        //        LikeeId = recipientId
        //    };

        //    _repo.Add<Like>(like);

        //    if (await _repo.SaveAll())
        //        return Ok();

        //    return BadRequest("Eroare la aprecierea anuntului");
        //}
    }
}

