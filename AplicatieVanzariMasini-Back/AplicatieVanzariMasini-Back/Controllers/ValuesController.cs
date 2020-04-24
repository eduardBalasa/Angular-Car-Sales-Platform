﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AplicatieVanzariMasini_Back.Data;
using AplicatieVanzariMasini_Back.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AplicatieVanzariMasini_Back.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }

        // GET values
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.Values.ToListAsync();

            return Ok(values);
        }

        // GET values/5
        [Authorize(Roles = "Member")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);

            return Ok(value);
        }

        // POST values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
