using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace MetroCardManagement
{
    public static class Operations
    {
      public static List<UserDetails> userList=new List<UserDetails>();
      public static List<TravelDetails> travelList=new List<TravelDetails>();
      public static List<TicketFairDetails> ticketList=new List<TicketFairDetails>();
        static UserDetails currentLogedInUser;

       public static void MainMenu()
       {
        int mainChoice;
        do{
        Console.WriteLine("*************************Welcome To Metro Card Management *************************** ");
        Console.WriteLine("1. New User Registration \n2. Login User\n3 .Exit\n");
        Console.Write("Enter Your choice : ");
         mainChoice=int.Parse(Console.ReadLine());
         switch(mainChoice)
         {
            case 1:
            {
                NewUserRegistration();
                break;
            }
            case 2:
            {
                LoginUser();
                break;
            }
            case 3:
            {
                Console.WriteLine("Successfully Exited from application...");
                break;
            }
         }
        }while(mainChoice!=3);
       }// Main Menu Ends Here
        
       public static void NewUserRegistration()
       {
            Console.WriteLine("****************Welcome to User Registration************************");
            Console.Write("Enter Your Name : ");
            string name=Console.ReadLine();
            Console.Write("Enter Your Phone Number : ");
            string phone=Console.ReadLine();
            Console.Write("Enter Amount your Card : " );
            double amount=double.Parse(Console.ReadLine());
            UserDetails currentUser=new UserDetails(name,phone,amount);
            userList.Add(currentUser);
            Console.WriteLine("You have successfully registered your card Number is : "+currentUser.CardNumber);
       } //User Registrationn Ends Here

        public static void LoginUser()
        {
            Console.WriteLine("*********************Welcome to LoginUser*************************");
            Console.Write("Enter Your Card Number : ");
            string cardNumber=Console.ReadLine();
            bool cardCheck=true;
            foreach(UserDetails user in userList)
            {
                currentLogedInUser=user;
                if(cardNumber.ToUpper()==currentLogedInUser.CardNumber)
                {
                    cardCheck=false;
                    SubMenu();
                }
            }
            if(cardCheck)
            {
                Console.WriteLine("Card Number you Entered is Not a valid One....");
            }
        }
        
        public static void SubMenu()
        {
            int subChoice;
            do{
            Console.WriteLine("1. Blance Check\n2. Recharge\n3. View Travel History\n4. Travel \n5. Exit");
            subChoice=int.Parse(Console.ReadLine());
            switch(subChoice)
            {
                case 1:
                {
                    BalanceCheck();
                    break;
                }
                case 2:
                {
                    Recharge();
                    break;
                }
                case 3:
                {
                    ViewTravelHistory();
                    break;
                }
                case 4:
                {
                    Travel();
                    break;
                }
                case 5:
                {
                    Console.WriteLine("You have successfully Exited from Sub Menu...");
                    break;
                }
            }
            }while(subChoice!=5);

        }//SubMenu ends here

        public static void BalanceCheck()
        {
            Console.Write("Enter Card Number : ");
            string cardNumber=Console.ReadLine();
            bool cardCheck=true;
            // foreach(UserDetails user in userList)
            // {
            //     if(cardNumber.ToUpper()==user.CardNumber)
            //     {
            //         cardCheck=false;
            //         Console.WriteLine("Your Balance is : "+user.Balance);
            //     }
            // }
            if(currentLogedInUser.CardNumber==cardNumber.ToUpper())
            {
                Console.WriteLine(currentLogedInUser.Balance);
            }
            else
            {
                Console.WriteLine("Invalid card Number....");
            }
        }//BalanceCheck Ends Here
        
        public static void Recharge()
        {
            Console.Write("Enter Your Card Number to Recharage: ");
            string cardNumber=Console.ReadLine();
            Console.Write("Enter Amount : ");
            double rechargeAmount=double.Parse(Console.ReadLine());
            // foreach(UserDetails user in userList)
            // {
            //     if(cardNumber.ToUpper()==user.CardNumber)
            //     {
            //         user.Balance+=rechargeAmount;
            //     }
            // }
           if(currentLogedInUser.CardNumber==cardNumber.ToUpper())
            {
                Console.WriteLine("Your balanvce is :"+currentLogedInUser.WalletRecharge(rechargeAmount));
            }
            else
            {
                Console.WriteLine("Invalid card Number....");
            }

        }//Reccharge Ends here

        public static void ViewTravelHistory()
        {
            Console.WriteLine("*************Your Travel History*******************\n");
            Console.WriteLine("________________________________________________________________________________");
            Console.WriteLine("|CardNumber   |From Location|  To Location|  Date                |  travel Cost|");
            Console.WriteLine("________________________________________________________________________________");
            foreach(TravelDetails travel in travelList)
            {
                Console.WriteLine($"|{travel.CardNumber,13}|{travel.FromLocation,13}|{travel.ToLocation,13}|{travel.Date,13}|{travel.TravelCost,13}|");
            }
            Console.WriteLine("________________________________________________________________________________");

        } //Travel hISSTORY ends here

        public static void Travel()
        {
            Console.WriteLine("________________________________________________________");
            Console.WriteLine("|  Ticket ID  |From Location| To Location | Ticket Price|");
            Console.WriteLine("________________________________________________________");
            foreach(TicketFairDetails ticket in ticketList)
            {
                Console.WriteLine($"|{ticket.TicketID,13}|{ticket.FromLocation,13}|{ticket.ToLocatioon,13}|{ticket.TicketPrice,13}|");
            }
            Console.WriteLine("_________________________________________________________");

            Console.Write("Enter Ticket ID : ");
            string ticketID=Console.ReadLine();
            bool ticketCheck=true;
            foreach(TicketFairDetails ticket in ticketList)
            {
                if(ticketID.ToUpper()==ticket.TicketID)
                {
                    ticketCheck=false;
                    if(currentLogedInUser.Balance>=ticket.TicketPrice)
                    {
                        currentLogedInUser.DeductBalance(ticket.TicketPrice);
                        Console.WriteLine("Ticket Collected successfully");
                        TravelDetails travel=new TravelDetails(currentLogedInUser.CardNumber,ticket.FromLocation,ticket.ToLocatioon,DateTime.Now,ticket.TicketPrice);
                        travelList.Add(travel);
                    }
                    else
                    {
                        Console.WriteLine("You have Insufficient balance please recharge and try again.....");
                    }
                }
            }
            if(ticketCheck)
            {
                Console.WriteLine("Invalid Ticket ID...");
            }

        }//Travel Ends Here

        public static void AddDefaultData()
        {
            UserDetails user1=new UserDetails("Ravi","9848812345",1000);
            UserDetails user2=new UserDetails("Baskaran","9948854321",1000);
            userList.Add(user1);
            userList.Add(user2);

            TravelDetails travel1=new TravelDetails("CMRL1001","Airport","Egmore",DateTime.ParseExact("10/10/2023","dd/MM/yyyy",null),55);
            TravelDetails travel2=new TravelDetails("CMRL1001","Egmore","Koyambedu",DateTime.ParseExact("10/10/2023","dd/MM/yyyy",null),32);
            TravelDetails travel3=new TravelDetails("CMRL1002","Alandur","Koyambedu",DateTime.ParseExact("10/11/2023","dd/MM/yyyy",null),25);
            TravelDetails travel4=new TravelDetails("CMRL1002","Egmore","Thirumangalam",DateTime.ParseExact("10/11/2023","dd/MM/yyyy",null),25);
            travelList.Add(travel1);
            travelList.Add(travel2);
            travelList.Add(travel3);
            travelList.Add(travel4);
            TicketFairDetails ticket1=new TicketFairDetails("Airport","Egmore",55);
            TicketFairDetails ticket2=new TicketFairDetails("Airport","Koyambedu",25);
            TicketFairDetails ticket3=new TicketFairDetails("Alandur","Koyambedu",25);
            TicketFairDetails ticket4=new TicketFairDetails("koyambedu","Egmore",32);
            TicketFairDetails ticket5=new TicketFairDetails("Vadapalani","Egmore",45);
            TicketFairDetails ticket6=new TicketFairDetails("Arumbakam","Egmore",25);
            TicketFairDetails ticket7=new TicketFairDetails("Vadapalani","Koyambedu",25);
            TicketFairDetails ticket8=new TicketFairDetails("Arumbakam","Koyambedu",16);
            ticketList.Add(ticket1);
            ticketList.Add(ticket2);
            ticketList.Add(ticket3);
            ticketList.Add(ticket4);
            ticketList.Add(ticket5);
            ticketList.Add(ticket6);
            ticketList.Add(ticket7);
            ticketList.Add(ticket8);


        }
    }
}