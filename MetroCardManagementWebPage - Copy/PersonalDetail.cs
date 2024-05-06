using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetroCardManagement
{
    public class PersonalDetail
    {
        //•	UserName
	//Phone Number

    public string UserName { get; set; }

    public string PhoneNumber { get; set; }

    //Constructor Creation

    public PersonalDetail(string userName,string phoneNumber)
    {
        UserName=userName;
        PhoneNumber=phoneNumber;
    }
    }
}