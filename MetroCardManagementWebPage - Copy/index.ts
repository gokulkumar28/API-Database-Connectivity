let autoCardNumber=1000;
let autoTravelID=2000;
let autoTicket=3000;

let currentUser:User;

class User
{
    CardNumber:string;
    UserName:string;
    Balance:number;
    Mobile:number;
    constructor  (userName:string,mobile:number,balance:number,cardNumber?:string)
    {
        autoCardNumber++;
        this.CardNumber="CMRL"+autoCardNumber;
        this.UserName=userName;
        this.Mobile=mobile;
        this.Balance=balance;
        if(cardNumber)
            {
                this.CardNumber=cardNumber;
            }
    }

    
}

let userList:Array<User> =new Array<User>();
userList.push(new User("Ravi",9848812345,1000,"CMRL1001"));
userList.push(new User("Baskaran",9948854321,1000,"CMRL1002"));

class TravelDetails
{
    
    TravelID:string;
    CardNumber:string;
    FromLocation:string;
    ToLocation:string;
    Date:string;
    TravelCost:number;
    constructor(cardNumber:string,fromLocation:string,toLocation:string,date:string,travelCost:number,travelID?:string)
    {
        autoTravelID++;
        this.TravelID="TID"+autoTravelID;
        this.CardNumber=cardNumber;
        this.FromLocation=fromLocation;
        this.ToLocation=toLocation;
        this.Date=date;
        this.TravelCost=travelCost;
        if(travelID)
            {
                this.TravelID=travelID;
            }
    }
}

let travelDetailsList:Array<TravelDetails>=new Array<TravelDetails>();

travelDetailsList.push(new TravelDetails("CMRL1001","Airport","Egmore","10/10/2023",55,"TID2001"));
travelDetailsList.push(new TravelDetails("CMRL1001","Egmore","Koyambedu","10/10/2023",32,"TID2002"));
travelDetailsList.push(new TravelDetails("CMRL1002","Alandur","Koyambedu","10/11/2023",25,"TID2003"));
travelDetailsList.push(new TravelDetails( "CMRL1002","Egmore","Thirumangalam","10/11/2023",25,"TID2004"));


class TicketFairDetail
{
   
    TicketID:string;
    FromLocation:string;
    ToLocation:string;
    TicketPrice:number;
    constructor (fromLocation:string,toLocation:string,ticketPrice:number,ticketID?:string)
    {
        autoTicket++;
        this.TicketID="MR"+autoTicket;
        this.FromLocation=fromLocation;
        this.ToLocation=toLocation;
        this.TicketPrice=ticketPrice;
        if(ticketID)
            {
                this.TicketID=ticketID;
            }
    }
}

let ticketFairList:Array<TicketFairDetail> =new Array<TicketFairDetail>();
ticketFairList.push(new TicketFairDetail("Airport","Egmore",55,"MR3001"));
ticketFairList.push(new TicketFairDetail("Airport","Koyambedu",25,"MR3002"));
ticketFairList.push(new TicketFairDetail("Alandur","Koyambedu",25,"MR3003"));
ticketFairList.push(new TicketFairDetail("Koyambedu","Egmore",32,"MR3004"));
ticketFairList.push(new TicketFairDetail("Vadapalani","Egmore",45,"MR3005"));
ticketFairList.push(new TicketFairDetail("Arumbakam","Egmore",25,"MR3006"));
ticketFairList.push(new TicketFairDetail("vadapalani","Koyambedu",25,"MR3007"));
ticketFairList.push(new TicketFairDetail("Arumbakam","Koyambedu",16,"MR3008"));

function NewUserRegistration()
{

    let mainMenu=document.getElementById("mainmenu") as HTMLDivElement;
    mainMenu.style.display="none";
    let userRegistration=document.getElementById("user-registration-page") as HTMLDivElement;
    userRegistration.style.display="block";
    
}

function ShowSuccessfullRegistration()
{
    let userRegistration=document.getElementById("user-registration-page") as HTMLDivElement;
    userRegistration.style.display="none";
    

    let userName=document.getElementById("registration-username") as HTMLInputElement;
    let mobile=document.getElementById("registration-mobile") as HTMLInputElement;
    let balance=document.getElementById("registration-balance") as HTMLInputElement;


    userList.push(new User(userName.value,parseInt(mobile.value),parseInt(balance.value)));
    let message=document.getElementById("successful-registration-message") as HTMLSpanElement;
   
    for(let i=0;i<userList.length;i++)
        {
            if(parseInt(mobile.value)===userList[i].Mobile)
                {
                    message.innerText=` ${userList[i].CardNumber}`;
                }
        }
    let show=document.getElementById("successfull-registration") as HTMLDivElement;
    show.style.display="block";
}


function Login()
{
    let mainMenu=document.getElementById("mainmenu") as HTMLDivElement;
    mainMenu.style.display="none";

    let invaildloginPage=document.getElementById("invalid-login") as HTMLDivElement;
    invaildloginPage.style.display="none";
    let loginPage=document.getElementById("login-page") as HTMLDivElement;
    loginPage.style.display="block";

   
}

function MainMenu()
{
    let show=document.getElementById("successfull-registration") as HTMLDivElement;
    show.style.display="none";
    let userRegistration=document.getElementById("user-registration-page") as HTMLDivElement;
    userRegistration.style.display="none";
    let mainMenu=document.getElementById("mainmenu") as HTMLDivElement;
    mainMenu.style.display="block";

}

function SubMenu()
{
    let travelHistory=document.getElementById("view-travel-history-display") as HTMLDivElement;
    travelHistory.style.display="block";
    let showBalance=document.getElementById("show-balance-display") as HTMLDivElement;
    showBalance.style.display="none";
    let cardNumber=document.getElementById("card-number") as HTMLInputElement;
    let username=document.getElementById("username") as HTMLSpanElement;
    let check=0;
    for(let i=0;i<userList.length;i++)
        {
            if(cardNumber.value.toUpperCase()===userList[i].CardNumber)
                {
                    username.innerText=` ${userList[i].UserName}`;
                    check++;
                    let subMenu=document.getElementById("sub-menu") as HTMLDivElement;
                    subMenu.style.display="block";
                    let loginPage=document.getElementById("login-page") as HTMLDivElement;
                    loginPage.style.display="none";
                    let showBalance=document.getElementById("show-balance-display") as HTMLDivElement;
                    showBalance.style.display="none";
                }
        }
        if(check===0)
            {
                alert("worng CardNumber enter right one");
                let invaildloginPage=document.getElementById("invalid-login") as HTMLDivElement;
                invaildloginPage.style.display="block";
                let loginPage=document.getElementById("login-page") as HTMLDivElement;
                    loginPage.style.display="none";
            }

}

function BalanceCheck()
{
    let balanceCheck=document.getElementById("balance-check-display") as HTMLDivElement;
    balanceCheck.style.display="block";
    let subMenu=document.getElementById("sub-menu") as HTMLDivElement;
    subMenu.style.display="none";
}

function ShowBalance()
{
    let showBalance=document.getElementById("show-balance-display") as HTMLDivElement;
    showBalance.style.display="block";
    let balanceCheck=document.getElementById("balance-check-display") as HTMLDivElement;
    balanceCheck.style.display="none";
    let recharge=document.getElementById("recharge-display") as HTMLDivElement;
    recharge.style.display="none";
    let balanceCheckCardNumber=document.getElementById("balance-check-card-number") as HTMLInputElement;
    let check=0;
    for(let i=0;i<userList.length;i++)
        {
            if(balanceCheckCardNumber.value.toUpperCase()===userList[i].CardNumber)
                {
                   check++;
                    let subMenu=document.getElementById("sub-menu") as HTMLDivElement;
                    subMenu.style.display="none";
                    let recharge=document.getElementById("recharge-display") as HTMLDivElement;
                    recharge.style.display="none";
                    let showBalance=document.getElementById("show-balance-display") as HTMLDivElement;
                    showBalance.style.display="block";
                    let displaybalance=document.getElementById("display-balance") as HTMLSpanElement;
                    displaybalance.innerText=`${userList[i].Balance}`;
                }
        }
        if(check===0)
            {
                alert("worng CardNumber enter right one");
                let invaildloginPage=document.getElementById("invalid-login") as HTMLDivElement;
                invaildloginPage.style.display="block";
                let loginPage=document.getElementById("login-page") as HTMLDivElement;
                    loginPage.style.display="none";
            }



}

function Recharge()
{
    let recharge=document.getElementById("recharge-display") as HTMLDivElement;
    recharge.style.display="block";
    let subMenu=document.getElementById("sub-menu") as HTMLDivElement;
    subMenu.style.display="none";
}

function ViewTravelHistory()
{
    let travelHistory=document.getElementById("view-travel-history-display") as HTMLDivElement;
    travelHistory.style.display="block";
    let subMenu=document.getElementById("sub-menu") as HTMLDivElement;
    subMenu.style.display="none";
    let tableBody=document.querySelector("#travel-history-table-data tbody") as HTMLTableSectionElement;
    tableBody.innerHTML="";
    
    for(let i=0;i<travelDetailsList.length;i++)
        {
            if(currentUser.CardNumber.toUpperCase()===travelDetailsList[i].CardNumber)
                {
                    const row=document.createElement("tr");
                    row.innerHTML=`<td>${travelDetailsList[i].CardNumber}</td>
            <td>${travelDetailsList[i].FromLocation}</td>
            <td>${travelDetailsList[i].ToLocation}</td>
            <td>${travelDetailsList[i].Date}</td>
            <td>${travelDetailsList[i].TravelCost}</td>
            `;
            tableBody.append(row);
                }
            else
            {
                alert("you have not yet travelled anywhere");
            }
            
        }
    
}