var autoCardNumber = 1000;
var autoTravelID = 2000;
var autoTicket = 3000;
var currentUser;
var User = /** @class */ (function () {
    function User(userName, mobile, balance, cardNumber) {
        autoCardNumber++;
        this.CardNumber = "CMRL" + autoCardNumber;
        this.UserName = userName;
        this.Mobile = mobile;
        this.Balance = balance;
        if (cardNumber) {
            this.CardNumber = cardNumber;
        }
    }
    return User;
}());
var userList = new Array();
userList.push(new User("Ravi", 9848812345, 1000, "CMRL1001"));
userList.push(new User("Baskaran", 9948854321, 1000, "CMRL1002"));
var TravelDetails = /** @class */ (function () {
    function TravelDetails(cardNumber, fromLocation, toLocation, date, travelCost, travelID) {
        autoTravelID++;
        this.TravelID = "TID" + autoTravelID;
        this.CardNumber = cardNumber;
        this.FromLocation = fromLocation;
        this.ToLocation = toLocation;
        this.Date = date;
        this.TravelCost = travelCost;
        if (travelID) {
            this.TravelID = travelID;
        }
    }
    return TravelDetails;
}());
var travelDetailsList = new Array();
travelDetailsList.push(new TravelDetails("CMRL1001", "Airport", "Egmore", "10/10/2023", 55, "TID2001"));
travelDetailsList.push(new TravelDetails("CMRL1001", "Egmore", "Koyambedu", "10/10/2023", 32, "TID2002"));
travelDetailsList.push(new TravelDetails("CMRL1002", "Alandur", "Koyambedu", "10/11/2023", 25, "TID2003"));
travelDetailsList.push(new TravelDetails("CMRL1002", "Egmore", "Thirumangalam", "10/11/2023", 25, "TID2004"));
var TicketFairDetail = /** @class */ (function () {
    function TicketFairDetail(fromLocation, toLocation, ticketPrice, ticketID) {
        autoTicket++;
        this.TicketID = "MR" + autoTicket;
        this.FromLocation = fromLocation;
        this.ToLocation = toLocation;
        this.TicketPrice = ticketPrice;
        if (ticketID) {
            this.TicketID = ticketID;
        }
    }
    return TicketFairDetail;
}());
var ticketFairList = new Array();
ticketFairList.push(new TicketFairDetail("Airport", "Egmore", 55, "MR3001"));
ticketFairList.push(new TicketFairDetail("Airport", "Koyambedu", 25, "MR3002"));
ticketFairList.push(new TicketFairDetail("Alandur", "Koyambedu", 25, "MR3003"));
ticketFairList.push(new TicketFairDetail("Koyambedu", "Egmore", 32, "MR3004"));
ticketFairList.push(new TicketFairDetail("Vadapalani", "Egmore", 45, "MR3005"));
ticketFairList.push(new TicketFairDetail("Arumbakam", "Egmore", 25, "MR3006"));
ticketFairList.push(new TicketFairDetail("vadapalani", "Koyambedu", 25, "MR3007"));
ticketFairList.push(new TicketFairDetail("Arumbakam", "Koyambedu", 16, "MR3008"));
function NewUserRegistration() {
    var mainMenu = document.getElementById("mainmenu");
    mainMenu.style.display = "none";
    var userRegistration = document.getElementById("user-registration-page");
    userRegistration.style.display = "block";
}
function ShowSuccessfullRegistration() {
    var userRegistration = document.getElementById("user-registration-page");
    userRegistration.style.display = "none";
    var userName = document.getElementById("registration-username");
    var mobile = document.getElementById("registration-mobile");
    var balance = document.getElementById("registration-balance");
    userList.push(new User(userName.value, parseInt(mobile.value), parseInt(balance.value)));
    var message = document.getElementById("successful-registration-message");
    for (var i = 0; i < userList.length; i++) {
        if (parseInt(mobile.value) === userList[i].Mobile) {
            message.innerText = " ".concat(userList[i].CardNumber);
        }
    }
    var show = document.getElementById("successfull-registration");
    show.style.display = "block";
}
function Login() {
    var mainMenu = document.getElementById("mainmenu");
    mainMenu.style.display = "none";
    var invaildloginPage = document.getElementById("invalid-login");
    invaildloginPage.style.display = "none";
    var loginPage = document.getElementById("login-page");
    loginPage.style.display = "block";
}
function MainMenu() {
    var show = document.getElementById("successfull-registration");
    show.style.display = "none";
    var userRegistration = document.getElementById("user-registration-page");
    userRegistration.style.display = "none";
    var mainMenu = document.getElementById("mainmenu");
    mainMenu.style.display = "block";
}
function SubMenu() {
    var travelHistory = document.getElementById("view-travel-history-display");
    travelHistory.style.display = "block";
    var showBalance = document.getElementById("show-balance-display");
    showBalance.style.display = "none";
    var cardNumber = document.getElementById("card-number");
    var username = document.getElementById("username");
    var check = 0;
    for (var i = 0; i < userList.length; i++) {
        if (cardNumber.value.toUpperCase() === userList[i].CardNumber) {
            username.innerText = " ".concat(userList[i].UserName);
            check++;
            var subMenu = document.getElementById("sub-menu");
            subMenu.style.display = "block";
            var loginPage = document.getElementById("login-page");
            loginPage.style.display = "none";
            var showBalance_1 = document.getElementById("show-balance-display");
            showBalance_1.style.display = "none";
        }
    }
    if (check === 0) {
        alert("worng CardNumber enter right one");
        var invaildloginPage = document.getElementById("invalid-login");
        invaildloginPage.style.display = "block";
        var loginPage = document.getElementById("login-page");
        loginPage.style.display = "none";
    }
}
function BalanceCheck() {
    var balanceCheck = document.getElementById("balance-check-display");
    balanceCheck.style.display = "block";
    var subMenu = document.getElementById("sub-menu");
    subMenu.style.display = "none";
}
function ShowBalance() {
    var showBalance = document.getElementById("show-balance-display");
    showBalance.style.display = "block";
    var balanceCheck = document.getElementById("balance-check-display");
    balanceCheck.style.display = "none";
    var recharge = document.getElementById("recharge-display");
    recharge.style.display = "none";
    var balanceCheckCardNumber = document.getElementById("balance-check-card-number");
    var check = 0;
    for (var i = 0; i < userList.length; i++) {
        if (balanceCheckCardNumber.value.toUpperCase() === userList[i].CardNumber) {
            check++;
            var subMenu = document.getElementById("sub-menu");
            subMenu.style.display = "none";
            var recharge_1 = document.getElementById("recharge-display");
            recharge_1.style.display = "none";
            var showBalance_2 = document.getElementById("show-balance-display");
            showBalance_2.style.display = "block";
            var displaybalance = document.getElementById("display-balance");
            displaybalance.innerText = "".concat(userList[i].Balance);
        }
    }
    if (check === 0) {
        alert("worng CardNumber enter right one");
        var invaildloginPage = document.getElementById("invalid-login");
        invaildloginPage.style.display = "block";
        var loginPage = document.getElementById("login-page");
        loginPage.style.display = "none";
    }
}
function Recharge() {
    var recharge = document.getElementById("recharge-display");
    recharge.style.display = "block";
    var subMenu = document.getElementById("sub-menu");
    subMenu.style.display = "none";
}
function ViewTravelHistory() {
    var travelHistory = document.getElementById("view-travel-history-display");
    travelHistory.style.display = "block";
    var subMenu = document.getElementById("sub-menu");
    subMenu.style.display = "none";
    var tableBody = document.querySelector("#travel-history-table-data tbody");
    tableBody.innerHTML = "";
    for (var i = 0; i < travelDetailsList.length; i++) {
        if (currentUser.CardNumber.toUpperCase() === travelDetailsList[i].CardNumber) {
            var row = document.createElement("tr");
            row.innerHTML = "<td>".concat(travelDetailsList[i].CardNumber, "</td>\n            <td>").concat(travelDetailsList[i].FromLocation, "</td>\n            <td>").concat(travelDetailsList[i].ToLocation, "</td>\n            <td>").concat(travelDetailsList[i].Date, "</td>\n            <td>").concat(travelDetailsList[i].TravelCost, "</td>\n            ");
            tableBody.append(row);
        }
        else {
            alert("you have not yet travelled anywhere");
        }
    }
}
