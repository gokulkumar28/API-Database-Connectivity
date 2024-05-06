using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace OnlineMedicalStore
{
     [Table("orders", Schema = "public")]
    public class Orders
    {
   
    public int UserID { get; set; }
    public int MedicineID { get; set; }
    public int OrderID { get; set; }
    public string MedicineName { get; set; }
    public int MedicineCount { get; set; }

    public double TotalAmount{get;set;}

    }
}