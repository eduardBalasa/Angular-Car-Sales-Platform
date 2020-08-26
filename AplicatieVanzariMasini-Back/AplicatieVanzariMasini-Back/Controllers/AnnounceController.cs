using AplicatieVanzariMasini_Back.Data;
using AplicatieVanzariMasini_Back.Dtos;
using AplicatieVanzariMasini_Back.Helpers;
using AplicatieVanzariMasini_Back.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{id}", Name = "GetAnnounce")]
        public async Task<IActionResult> GetAnnounce(int id)
        {
            var announce = await _announceRepository.GetAnnounce(id);

            var announceToReturn = _mapper.Map<AnnounceForReturnDto>(announce);

            return Ok(announceToReturn);
        }

        [HttpGet("GetAnnouncesByUser/{userId}")]
        public async Task<IActionResult> GetAnnouncesByUser(int userId, [FromQuery] AnnounceParams announceParams)
        {
            //var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var announce = await _announceRepository.GetAnnouncesByUser(userId, announceParams);

            var announceToReturn = _mapper.Map<IEnumerable<AnnounceAndCarForReturnDto>>(announce);

            Response.AddPagination(announce.CurrentPage, announce.PageSize,
               announce.TotalCount, announce.TotalPages);

            return Ok(announceToReturn);

        }
        [AllowAnonymous]
        [HttpGet("GetAnnounces")]
        public async Task<IActionResult> GetAnnounces([FromQuery]AnnounceParams announceParams)
        {
            var currentUserId = 1;
            if (!announceParams.All)
            {
                currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            }

            var announceFromRepo = await _announceRepository.GetAnnounces(announceParams, currentUserId);

            var announces = _mapper.Map<IEnumerable<AnnounceAndCarForReturnDto>>(announceFromRepo);

            Response.AddPagination(announceFromRepo.CurrentPage, announceFromRepo.PageSize,
                announceFromRepo.TotalCount, announceFromRepo.TotalPages);

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
                ModelVersionId = carAnnounceDto.ModelVersionId,
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
                Features = carAnnounceDto.Features,
                CarId = car.CarId,
                UserId = userId
            });

            if (await _repo.SaveAll())
            {

                return NoContent();

            }
            return BadRequest("A aparut o problema");
        }

        [HttpPost("{userId}/save/{announceId}")]
        public async Task<IActionResult> SaveAnnounce(int userId, int announceId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var save = await _announceRepository.GetAnnounceSaved(userId, announceId);

            if (save != null)
                return BadRequest("Ai salvat deja acest anunt!");

            if (await _announceRepository.GetAnnounce(announceId) == null)
                return NotFound();

            save = new SaveAnnounce
            {
                UserId = userId,
                AnnounceId = announceId
            };

            _repo.Add<SaveAnnounce>(save);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Eroare la salvarea anuntului");
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteAnnounce(Announce announce)
        {
            if (announce.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) && User.FindFirst(ClaimTypes.Role).Value != "Admin")
            {
                return Unauthorized();
            }

            _repo.Delete(announce);
            var carForDelete = await _repo.GetCar(announce.CarId);
            _repo.Delete(carForDelete);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }
            return BadRequest("Stergerea a esuat!");
        }
    }
}

