using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketFairDetailsController : ControllerBase
    {
        private static List<TicketFairDetails> _ticketFairDetail = new List<TicketFairDetails>
        {
            new TicketFairDetails("Airport","Egmore",55,"MR3001"),
            new TicketFairDetails("Airport","Koyambedu",25,"MR3002"),
            new TicketFairDetails("Alandur","Koyambedu",25,"MR3003"),
            new TicketFairDetails("Koyambedu","Egmore",32,"MR3004"),
            new TicketFairDetails("Vadapalani","Egmore",45,"MR3005"),
            new TicketFairDetails("Arumbakam","Egmore",25,"MR3006"),
            new TicketFairDetails("vadapalani","Koyambedu",25,"MR3007"),
            new TicketFairDetails("Arumbakam","Koyambedu",16,"MR3008"),
        };

        [HttpGet]
        public IActionResult GetUserDetail()
        {
            return Ok(_ticketFairDetail);
        }

        [HttpGet("{ticketID}")]
        public IActionResult GetUserDetailByID(string ticketID)
        {
            var ticketid = _ticketFairDetail.Find(m => m.TicketID == ticketID);
            if (ticketid == null)
            {
                return NotFound();
            }
            return Ok(ticketid);
        }
    }
}