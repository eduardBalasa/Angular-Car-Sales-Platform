using AplicatieVanzariMasini_Back.Data;
using AplicatieVanzariMasini_Back.Dtos;
using AplicatieVanzariMasini_Back.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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

        public AnnounceController(IAnnounceRepository announceRepository, IMapper mapper,
            ICarRepository repo)
        {
            _announceRepository = announceRepository;
            _mapper = mapper;
            _repo = repo;
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
                State = carAnnounceDto.State,
                Damaged = carAnnounceDto.Damaged,
                ParticleFilter = carAnnounceDto.ParticleFilter,
                RightHandDrive = carAnnounceDto.RightHandDrive,
                BrandId = carAnnounceDto.BrandId,
                BodyId = carAnnounceDto.BodyId,
                ModelId = carAnnounceDto.ModelId,
                ManufacturingDate = carAnnounceDto.ManufacturingDate,
                FuelId = carAnnounceDto.FuelId,
                CylindricalCapacityId = carAnnounceDto.CylindricalCapacityId,
                CountryId = carAnnounceDto.CountryId,
                GearboxId = carAnnounceDto.GearboxId,
                TransmissionId = carAnnounceDto.TransmissionId,
                PollutionRuleId = carAnnounceDto.PollutionRuleId,
                PowerId = carAnnounceDto.PowerId,
                PriceId = carAnnounceDto.PriceId,
                KmId = carAnnounceDto.KmId

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
    }
}

