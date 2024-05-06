using System;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace OnlineMedicalStore
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbContext.users.ToList());
        }

        [HttpGet("{UserID}")]
        public IActionResult GetUserID(int UserID)
        {
            var userID=_dbContext.users.FirstOrDefault( m => m.UserID==UserID);
            if(userID==null){
                return NotFound();
            }
            return Ok(userID);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] Users UserData)
        {
            _dbContext.users.Add(UserData);
            return Ok();
        }
       
    
        [HttpPut("{id}")]
        public IActionResult PutUser(int id,[FromBody] Users User)
        {
            var userold=_dbContext.users.FirstOrDefault(m=> m.UserID == id);
            if(userold==null)
            {
                return NotFound();
            }
            userold.UserName=User.UserName;
            userold.Balance=User.Balance;
            userold.Date=User.Date;
            userold.Email=User.Email;
            userold.Mobile=User.Mobile;
            userold.Password=User.Password;
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user=_dbContext.users.FirstOrDefault(m=> m.UserID== id);
            if(user==null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            return Ok();

        }

    }
}