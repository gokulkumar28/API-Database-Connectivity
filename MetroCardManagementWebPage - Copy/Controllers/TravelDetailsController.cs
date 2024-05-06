using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelDeatilsController: ControllerBase
    {
        private static List<TravelDetails> _travelDetail = new List<TravelDetails>
        {
            new TravelDetails("CMRL1001","Airport","Egmore",DateTime.Parse("10/10/2023"),55,"TID2001"),
            new TravelDetails("CMRL1001","Egmore","Koyambedu",DateTime.Parse("10/10/2023"),32,"TID2002"),
            new TravelDetails("CMRL1002","Alandur","Koyambedu",DateTime.Parse("10/11/2023"),25,"TID2003"),
            new TravelDetails( "CMRL1002","Egmore","Thirumangalam",DateTime.Parse("10/11/2023"),25,"TID2004")
        };

        [HttpGet]
        public IActionResult GetUserDetail()
        {
            return Ok(_travelDetail);
        }

        [HttpGet("{travelID}")]
        public IActionResult GetUserDetailByID(string travelID)
        {
            var travelid = _travelDetail.Find(m => m.TravelID == travelID);
            if (travelid == null)
            {
                return NotFound();
            }
            return Ok(travelid);
        }
    }
}