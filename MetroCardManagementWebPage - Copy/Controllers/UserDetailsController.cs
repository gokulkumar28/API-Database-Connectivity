using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController:ControllerBase
    {
        private static List<UserDetails> _userDetail=new List<UserDetails>
        {
            new UserDetails("Ravi","9848812345",1000),
             new UserDetails("Baskaran","9948854321",1000)
        };

        [HttpGet]
        public IActionResult GetUserDetail()
        {
            return Ok(_userDetail);
        }

        [HttpGet("{CardNumber}")]
        public IActionResult GetUserDetailByID(string CardNumber)
        {
            var cardNumber=_userDetail.Find(m => m.CardNumber == CardNumber);
            if(cardNumber==null)
            {
                return NotFound();
            }
            return Ok(cardNumber);
        }
    }
}