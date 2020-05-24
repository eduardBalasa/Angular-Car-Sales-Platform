using AplicatieVanzariMasini_Back.Data;
using AplicatieVanzariMasini_Back.Dtos;
using AplicatieVanzariMasini_Back.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Controllers
{
    //[ServiceFilter(typeof(LogUserActivity))]
    [Route("[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarRepository _carRepo;
        private readonly IMapper _mapper;

        public CarsController(ICarRepository carRepo, IMapper mapper)
        {
            _carRepo = carRepo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetCar")]
        public async Task<IActionResult> GetCar(int id)
        {
            var carFromRepo = await _carRepo.GetCar(id);

            var carToReturn = _mapper.Map<CarForReturnDto>(carFromRepo);

            return Ok(carToReturn);
        }

        [HttpGet("GetCars")]
        public async Task<IActionResult> GetCars()
        {
            var carsFromRepo = await _carRepo.GetCars();

            var carsToReturn = _mapper.Map<List<CarForReturnDto>>(carsFromRepo);

            return Ok(carsToReturn);
        }

     
    }
}
