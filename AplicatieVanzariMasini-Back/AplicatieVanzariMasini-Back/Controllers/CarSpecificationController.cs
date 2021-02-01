using AplicatieVanzariMasini_Back.Data;
using AplicatieVanzariMasini_Back.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CarSpecificationController : ControllerBase
    {
        private readonly ICarSpecificationRepository _repo;
        private readonly IMapper _mapper;

        public CarSpecificationController(ICarSpecificationRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("GetBodies")]
        public async Task<IActionResult> GetBodies()
        {
            var bodyFromRepo = await _repo.GetBodies();

            var body = _mapper.Map<List<SpecificationForReturnDto>>(bodyFromRepo);

            return Ok(body);
        }

        [HttpGet("GetBrands")]
        public async Task<IActionResult> GetBrands()
        {
            var brandFromRepo = await _repo.GetBrands();

            var brand = _mapper.Map<List<SpecificationForReturnDto>>(brandFromRepo);

            return Ok(brand);
        }

        [HttpGet("GetModels")]
        public async Task<IActionResult> GetModels()
        {
            var modelFromRepo = await _repo.GetModels();

            var model = _mapper.Map<List<SpecificationForReturnDto>>(modelFromRepo);

            return Ok(model);
        }

        [HttpGet("GetModelVersions")]
        public async Task<IActionResult> GetModelVersions()
        {
            var modelVersionFromRepo = await _repo.GetModelVersions();

            var modelVersion = _mapper.Map<List<ModelVersionForReturnDto>>(modelVersionFromRepo);

            return Ok(modelVersion);
        }

        [HttpGet("GetTransmissions")]
        public async Task<IActionResult> GetTransmissions()
        {
            var transmissionFromRepo = await _repo.GetTransmissions();

            var transmission = _mapper.Map<List<SpecificationForReturnDto>>(transmissionFromRepo);

            return Ok(transmission);
        }

        [HttpGet("GetManufacturingDates")]
        public async Task<IActionResult> GetManufacturingDates()
        {
            var manufacturingDateFromRepo = await _repo.GetManufacturingDates();

            var manufacturingDate = _mapper.Map<List<ManufacturingToReturnDto>>(manufacturingDateFromRepo);

            return Ok(manufacturingDate);
        }

        [HttpGet("GetPollutionRules")]
        public async Task<IActionResult> GetPollutionRules()
        {
            var pollutionRuleFromRepo = await _repo.GetPollutionRules();

            var pollutionRule = _mapper.Map<List<SpecificationForReturnDto>>(pollutionRuleFromRepo);

            return Ok(pollutionRule);
        }

        [HttpGet("GetGearboxes")]
        public async Task<IActionResult> GetGearboxes()
        {
            var gearboxFromRepo = await _repo.GetGearboxes();

            var gearbox = _mapper.Map<List<SpecificationForReturnDto>>(gearboxFromRepo);

            return Ok(gearbox);
        }

        [HttpGet("GetFuels")]
        public async Task<IActionResult> GetFuels()
        {
            var fuelFromRepo = await _repo.GetFuels();

            var fuel = _mapper.Map<List<SpecificationForReturnDto>>(fuelFromRepo);

            return Ok(fuel);
        }

        [HttpGet("GetCountries")]
        public async Task<IActionResult> GetCountries()
        {
            var countryFromRepo = await _repo.GetCountries();

            var country = _mapper.Map<List<SpecificationForReturnDto>>(countryFromRepo);

            return Ok(country);
        }


    }
}
