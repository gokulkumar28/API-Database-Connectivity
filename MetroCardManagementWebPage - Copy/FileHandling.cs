using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MetroCardManagement
{
    public static class FileHandling
    {
        public static void Create()
        {
            if(!Directory.Exists("MetroCardManagement"))
            {
                Console.WriteLine("Creating Folder...");
                Directory.CreateDirectory("MetroCardManagement");
            }
            //User Deatil file
            if(!File.Exists("MetroCardManagement/UserDetails.csv"))
            {
                Console.WriteLine("Creating File....");
                File.Create("MetroCardManagement/UserDetails.csv").Close();
            }
            //Travel Details
            if(!File.Exists("MetroCardManagement/TravelDetails.csv"))
            {
                Console.WriteLine("Creating File....");
                File.Create("MetroCardManagement/TravelDetails.csv").Close();
            }
            //TicketDeatils
            if(!File.Exists("MetroCardManagement/TicketDetails.csv"))
            {
                Console.WriteLine("Creating file...");
                File.Create("MetroCardManagement/TicketDetails.csv").Close();
            }
        }

        public static void WriteToCSV()
        {
            string[] user=new string[Operations.userList.Count];
            for(int i=0;i<Operations.userList.Count;i++)
            {
                user[i]=Operations.userList[i].CardNumber+","+Operations.userList[i].UserName+","+Operations.userList[i].PhoneNumber+","+Operations.userList[i].Balance;
            }
            File.WriteAllLines("MetroCardManagement/UserDetails.csv",user);

            string[] ticket=new string[Operations.ticketList.Count];
            for(int i=0;i<Operations.ticketList.Count;i++)
            {
                ticket[i]=Operations.ticketList[i].TicketID+","+Operations.ticketList[i].FromLocation+","+Operations.ticketList[i].ToLocatioon+","+Operations.ticketList[i].TicketPrice;
            }
            File.WriteAllLines("MetroCardManagement/TicketDetails.csv",ticket);

            string[] travel=new string[Operations.travelList.Count];
            for(int i=0;i<Operations.travelList.Count;i++)
            {
                travel[i]=Operations.travelList[i].TravelID+","+Operations.travelList[i].CardNumber+","+Operations.travelList[i].FromLocation+","+Operations.travelList[i].ToLocation+","+Operations.travelList[i].Date+","+Operations.travelList[i].TravelCost;
            }
            File.WriteAllLines("MetroCardManagement/TravelDetails.csv",travel);


        }
    
        public static void ReadFromCSV()
        {
            string[] user=File.ReadAllLines("MetroCardManagement/UserDetails.csv");
            foreach(string userDetail in user)
            {
                string[] values=userDetail.Split(",");
                UserDetails user1=new UserDetails(values[0],values[1],values[2],double.Parse(values[3]));
                Operations.userList.Add(user1);
            }
           

            string[] ticket=File.ReadAllLines("MetroCardManagement/TicketDetails.csv");
            foreach(string tickets in ticket)
            {
                TicketFairDetails ticket1=new TicketFairDetails(tickets);
                Operations.ticketList.Add(ticket1);
            }


            string[] travels=File.ReadAllLines("MetroCardManagement/TravelDetails.csv");
            foreach(string travel in travels)
            {
                TravelDetails travel1=new TravelDetails(travel);
                Operations.travelList.Add(travel1);
            }
        }
    }
}