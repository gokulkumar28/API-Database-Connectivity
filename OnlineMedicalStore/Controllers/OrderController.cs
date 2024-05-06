using System;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace OnlineMedicalStore
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController:ControllerBase
    {
        // private static List<Orders> _Order=new List<Orders>()
        // {
        //     new Orders{UserID=1,MedicineID=3,OrderID=5,MedicineName="Paracetommal",MedicineCount=10,TotalAmount=123.2},
        //     new Orders{UserID=2,MedicineID=3,OrderID=6,MedicineName="Paracetommal-10",MedicineCount=10,TotalAmount=12.90}
        // };
        private readonly ApplicationDBContext _dbContext;
        public OrderController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(_dbContext.orders.ToList());
        }

        [HttpGet("{OrderID}")]
        public IActionResult GetOrderID(int OrderID)
        {
            var orderID=_dbContext.orders.FirstOrDefault( m => m.OrderID==OrderID);
            if(orderID==null){
                return NotFound();
            }
            return Ok(orderID);
        }

        [HttpPost]
        public IActionResult PostOrder([FromBody] Orders OrderData)
        {
            _dbContext.orders.Add(OrderData);
            return Ok();
        }
       
    
        [HttpPut("id")]
        public IActionResult PutUser(int id,[FromBody] Orders Order)
        {
            var oldOrder=_dbContext.orders.FirstOrDefault(m=> m.OrderID == id);
            if(oldOrder==null)
            {
                return NotFound();
            }
            oldOrder.UserID=Order.UserID;
            oldOrder.MedicineName=Order.MedicineName;
            oldOrder.MedicineID=Order.MedicineID;
            oldOrder.MedicineCount=Order.MedicineCount;
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var order=_dbContext.orders.FirstOrDefault(m=> m.OrderID== id);
            if(order==null)
            {
                return NotFound();
            }
            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}