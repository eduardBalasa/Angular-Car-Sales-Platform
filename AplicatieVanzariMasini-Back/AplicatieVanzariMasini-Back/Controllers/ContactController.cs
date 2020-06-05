using AplicatieVanzariMasini_Back.Data;
using AplicatieVanzariMasini_Back.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AplicatieVanzariMasini_Back.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private IEmailSender _emailSender;

        public ContactController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        [HttpPost("SendContactMessage")]
        public IActionResult SendContactMessage(Contact contactForm)
        {

            //save message to the database
            var hasBeenSend = _emailSender.SendEmail(contactForm.Email, $"doarAutomobile.ro-{DateTime.Now}-{contactForm.Phone}", contactForm.Message, contactForm.Name);
            if (hasBeenSend)
            {
                return Ok();
            }
            else{
                return NotFound();
            }
        }
    }
}
