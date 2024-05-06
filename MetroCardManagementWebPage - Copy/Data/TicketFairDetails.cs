
using System;
namespace MetroCardManagement
{
    public class TicketFairDetails
    {
         private static int s_ticketID=3000;
        //property

        public string TicketID { get; }
        public string FromLocation { get; set; }
        public string ToLocatioon { get; set; }
        public double TicketPrice { get; set; }

         public TicketFairDetails(string fromLocation,string toLocation,double ticketPrice)
        {
            s_ticketID++;
            TicketID="MR"+s_ticketID;
            FromLocation=fromLocation;
            ToLocatioon=toLocation;
            TicketPrice=ticketPrice;
        }

        public TicketFairDetails(string fromLocation,string toLocation,double ticketPrice,string ticketID)
        {
            TicketID=ticketID;
            FromLocation=fromLocation;
            ToLocatioon=toLocation;
            TicketPrice=ticketPrice;
        }
    }
}