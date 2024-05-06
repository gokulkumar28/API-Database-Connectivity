using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace OnlineMedicalStore
{
    [Table("users", Schema = "public")]
    public class Users{
    
    public int UserID { get;set; }
    public string UserName { get; set; }

    public string Password { get; set; }
    public string Email { get; set; }
    public int Mobile { get; set; }

    public DateTime Date { get; set; }
    public double Balance { get; set; }
  
}
}