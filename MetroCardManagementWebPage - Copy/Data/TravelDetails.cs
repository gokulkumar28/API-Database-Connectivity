using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetroCardManagement
{
    public class TravelDetails
    {
    private static int s_travelID=2000;
      public string TravelID { get;  }
      public string CardNumber { get; set; }
      public string  FromLocation { get; set; }
      public string ToLocation{get;set;}
      public DateTime Date { get; set; }
      public double TravelCost { get; set; }

      //Constructor Creation

      public TravelDetails(string cardNumber,string fromLocation,string toLocation,DateTime date,double travelCost)
      {
        s_travelID++;
        TravelID="TID"+s_travelID;
        CardNumber=cardNumber;
        FromLocation=fromLocation;
        ToLocation=toLocation;
        Date=date;
        TravelCost=travelCost;
      }   

      public TravelDetails(string cardNumber,string fromLocation,string toLocation,DateTime date,double travelCost,string travelid)
      {
       
        TravelID=travelid;
        CardNumber=cardNumber;
        FromLocation=fromLocation;
        ToLocation=toLocation;
        Date=date;
        TravelCost=travelCost;
      }  

    }
}