using System;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace OnlineMedicalStore
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController: ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public MedicineController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetMedicine()
        {
            return Ok(_dbContext.medicine.ToList());
        }
        [HttpGet("{MedicineID}")]
        public IActionResult GetMedicineID(int MedicineID)
        {
            var medicine=_dbContext.medicine.FirstOrDefault(m=> m.MedicineID==MedicineID);
            if(medicine==null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        [HttpPost]
        public IActionResult PostMedicine([FromBody] Medicine medicine)
        {
            _dbContext.medicine.Add(medicine);
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult PutMedicine(int id,[FromBody] Medicine medicine)
        {
            var medicineOld =_dbContext.medicine.FirstOrDefault(m=> m.MedicineID == id);
            if(medicineOld==null)
            {
                return NotFound();
            }
            medicineOld.MedicineCount=medicine.MedicineCount;
            medicineOld.MedicineName=medicine.MedicineName;
            medicineOld.MedicinePrice=medicine.MedicinePrice;
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteMedicine(int id)
        {
            var medicine=_dbContext.medicine.FirstOrDefault(m=> m.MedicineID== id);
            if(medicine==null)
            {
                return NotFound();
            }
            _dbContext.medicine.Remove(medicine);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}


// using System;
// using System.Collections.Generic;
// using System.Data.Entity;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;
 
// namespace MedicalStoreApplicationApi.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class MedicineDetailsController:ControllerBase
//     {
//         private readonly ApplicationDBContext _dbContext;
//         public MedicineDetailsController(ApplicationDBContext applicationDBContext)
//         {
//             _dbContext=applicationDBContext;
//         }
//         [HttpGet]
//     //Get Details
//         public IActionResult GetMedicineDetails()
//         {
//             return Ok(_dbContext.medicine.ToList());
//         }
//         //Set Details
//          [HttpGet("{MedicineID}")]
//         public IActionResult GetIndividualMedicineDetails(int medicineID)
//         {
//             var medicine=_dbContext.medicine.FirstOrDefaultAsync(medicine=>medicine.MedicineID==medicineID);
//             if(medicine==null)
//             {
//                 return NotFound();
//             }
//             return Ok(medicine);
//         }
//         //Add Details
//         [HttpPost]
//         public IActionResult AddMedicineDetails([FromBody] MedicineDetails medicine)
//         {
//             _dbContext.medicines.Add(medicine);
//             _dbContext.SaveChanges();
//             return Ok();
//         }
//         //Update Details
//         [HttpPut("{MedicineID}")]
//         public IActionResult UpdateMedicineDetails(int medicineID,[FromBody] MedicineDetails medicine)
//         {
//             var medicineOld=_dbContext.medicines.FirstOrDefault(medicine=>medicine.MedicineID==medicineID);
//             if(medicineOld==null)
//             {
//                 return NotFound();
//             }
//             medicineOld.AvailableCount=medicine.AvailableCount;
//             medicineOld.ExpiryDate=medicine.ExpiryDate;
//             medicineOld.MedicineName=medicine.MedicineName;
//             medicineOld.Price=medicine.Price;
//             _dbContext.SaveChanges();
//             return Ok();
//         }
//         //Delete Details
//         [HttpDelete("{MedicineID}")]
//         public IActionResult DeleteMedicine(int medicineID)
//         {
//         var medicine=_dbContext.medicines.FirstOrDefault(medicine=>medicine.MedicineID==medicineID);
//             if(medicine==null)
//             {
//                 return NotFound();
//             }
//             _dbContext.medicines.Remove(medicine);
//             _dbContext.SaveChanges();
//             return Ok();
//         }
//     }
// }
// has context menu