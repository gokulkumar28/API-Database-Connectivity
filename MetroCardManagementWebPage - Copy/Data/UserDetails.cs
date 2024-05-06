using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetroCardManagement
{
    public class UserDetails
   {


        private static int s_cardNumber=1000;

        public string CardNumber { get;  }
        public double Balance { get;set;  }

        //Constructor Creation

        public UserDetails(string userName,string phoneNumber,double balance)
        {
            s_cardNumber++;
            CardNumber="CMRL"+s_cardNumber;
            Balance=balance;
        }
        public UserDetails(string cardNumber,string  userName,string phoneNumber,double balance )
        {
            s_cardNumber=int.Parse(cardNumber.Remove(0,4));
            CardNumber=cardNumber;
            Balance=balance;
        }
     

    }
}