
using OnlineMedicalStore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace OnlineMedicalStore
{

    [Table("medicine", Schema = "public")]
    public class Medicine
    {

        public int MedicineID { get; set; }
        public string MedicineName { get; set; }
        public int MedicineCount { get; set; }
        public int MedicinePrice { get; set; }
    }
}