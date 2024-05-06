"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let userIdAutoIncrement = 1000;
let medicineAutoIncerement = 10;
let orderAutoIncrement = 100;
let currentUserName;
let currentUserID;
let selectedIndex;
let userBalance;
userBalance = 0;
let count = 0;
function MedicineDetail() {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineList = yield fetchMedicine();
        let purchase = document.getElementById("purchase-table");
        purchase.style.display = "none";
        let medicineTable = document.getElementById("medicine-table");
        medicineTable.style.display = "block";
        const tableBody = document.querySelector("#dataTable tbody");
        const element = document.getElementById('rows');
        element.innerHTML = "";
        for (let i = 0; i < MedicineList.length; i++) {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${MedicineList[i].medicineID}</td>
            <td>${MedicineList[i].medicineName}</td>
            <td id="medicine-count">${MedicineList[i].medicineCount}</td>
            <td>${MedicineList[i].medicinePrice}</td>
            </td>
            `;
            tableBody.appendChild(row);
        }
    });
}
function purchase() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrlMedicine = 'http://localhost:5028/api/Medicine';
        const MedicineList = yield fetchMedicine();
        let inside = document.getElementById("medicine-table");
        inside.style.display = "none";
        let purchase = document.getElementById("purchase-table");
        purchase.style.display = "block";
        const tableBody = document.querySelector("#data-Table tbody");
        const element = document.getElementById('rows-1');
        element.innerHTML = "";
        count = 0;
        for (let i = 0; i < MedicineList.length; i++) {
            const row = document.createElement("tr");
            row.innerHTML = `<td >${MedicineList[i].medicineID}</td>
            <td >${MedicineList[i].medicineName}</td>
            <td id="2">${MedicineList[i].medicineCount}</td>
            <td >${MedicineList[i].medicinePrice}</td>
            <td><button onclick="add('${i}')">Purchase</button>
            `;
            tableBody.appendChild(row);
            count++;
        }
    });
}
function add(i) {
    let editMedicine = document.getElementById("medicine-edit");
    editMedicine.style.display = "block";
    selectedIndex = i;
}
function edit() {
    return __awaiter(this, void 0, void 0, function* () {
        let id = 0;
        const medicineList = yield fetchMedicine();
        const cancelList = yield fetchOrder();
        let val = document.getElementById("edit-count");
        if (medicineList[selectedIndex].medicineCount >= Number(val.value)) {
            let amount = parseInt(val.value) * medicineList[selectedIndex].medicinePrice;
            if (currentUserID.balance >= amount) {
                medicineList[selectedIndex].medicineCount -= Number(val.value);
                currentUserID.balance -= amount;
                const order = {
                    orderID: ++orderAutoIncrement,
                    userID: currentUserID.userID,
                    medicineID: medicineList[selectedIndex].medicineID,
                    medicineName: medicineList[selectedIndex].medicineName,
                    medicineCount: parseInt(val.value),
                    totalAmount: amount
                };
                addOrder(order);
                medicineList[selectedIndex].medicineCount -= parseInt(val.value);
                UpdateMedicine(medicineList[selectedIndex].medicineID, medicineList[selectedIndex]);
                alert("purchesed successfully");
            }
            else {
                alert("You have no balance please top up");
            }
        }
        else {
            alert("count not available for this medicine");
        }
        id++;
    });
}
function cancel() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5028/api/Order';
        const cancelList = yield fetchOrder();
        let inside = document.getElementById("medicine-table");
        inside.style.display = "none";
        let purchase = document.getElementById("purchase-table");
        purchase.style.display = "none";
        let cancel = document.getElementById("cancel-order");
        cancel.style.display = "block";
        const tableBody = document.querySelector("#cancel-show-table tbody");
        tableBody.innerHTML = "";
        for (let i = 0; i < cancelList.length; i++) {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${cancelList[i].orderID}</td>
            <td>${cancelList[i].userID}</td>
            <td>${cancelList[i].medicineName}</td>
            <td>${cancelList[i].medicineCount}</td>
            <td>${cancelList[i].totalAmount}</td>
            <td>
            <button onclick="cancelOrder('${cancelList[i].medicineID}')">cancel</button>
            </td>
            `;
            tableBody.appendChild(row);
        }
    });
}
function cancelOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const cancelList = yield fetchOrder();
        const medicineList = yield fetchMedicine();
        for (let i = 0; i < medicineList.length; i++) {
            if (id === medicineList[i].medicineID) {
                for (let j = 0; j < cancelList.length; j++) {
                    if (id === cancelList[j].medicineID) {
                        console.log(medicineList[i].medicineID);
                        console.log(medicineList[j].medicineID);
                        medicineList[i].medicineCount += cancelList[j].medicineCount;
                        yield UpdateMedicine(id, medicineList[i]);
                        currentUserID.balance += cancelList[j].totalAmount;
                        yield UpdateUser(id, currentUserID);
                        console.log(currentUserID.balance);
                        alert("successfully order cancelled and balaced returned to your account");
                    }
                }
            }
        }
    });
}
function hi() {
    let topUp = document.getElementById("topup");
    topUp.style.display = "block";
}
function topUp() {
    return __awaiter(this, void 0, void 0, function* () {
        let id = 3;
        let form = document.getElementById("top-amount");
        currentUserID.balance += parseInt(form.value);
        yield UpdateUser(id, currentUserID);
        let topUp = document.getElementById("topup");
        topUp.style.display = "none";
        form.value = "";
    });
}
function orderHistory() {
}
function showBalance1() {
    return __awaiter(this, void 0, void 0, function* () {
        let show = document.getElementById("showbalance");
        const value = yield fetchUser();
        show.innerText = `your balance is ${currentUserID.balance}`;
    });
}
function Signup() {
    console.log(1);
    let showLogin = document.getElementById("show-login");
    let signup = document.getElementById("signup-page");
    showLogin.style.display = "none";
    signup.style.display = "block";
}
function signin() {
    return __awaiter(this, void 0, void 0, function* () {
        let signin = document.getElementById("signin-page");
        let name = document.getElementById("name");
        signin.style.display = "block";
    });
}
function LoginProcess() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5028/api/User';
        const userList = yield fetchUser();
        let showLogin = document.getElementById("show-login");
        let password = document.getElementById("password");
        let email = document.getElementById("email");
        userList.forEach((user) => {
            if (user.email == email.value && password.value == user.password) {
                currentUserID = user;
                showLogin.style.display = "none";
                inside();
            }
        });
    });
}
function inside() {
    let signup = document.getElementById("signup-page");
    let inside = document.getElementById("inside");
    let name = document.getElementById("name");
    let welcome = document.getElementById("welcome");
    welcome.innerHTML = "Welcome " + name.value;
    let showLogin = document.getElementById("show-login");
    let loginpage = document.getElementById("signin-page");
    showLogin.style.display = "none";
    currentUserName = name.value;
    welcome.style.alignContent = "center";
    signup.style.display = "none";
    loginpage.style.display = "none";
    inside.style.display = "block";
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5028/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add User');
        }
    });
}
function addMedicine(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5028/api/Medicine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to add User');
        }
        MedicineDetail();
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5028/api/Order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to add User');
        }
    });
}
function UpdateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5028/api/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update User');
        }
    });
}
function UpdateMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5028/api/Medicine/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to update Medicine');
        }
    });
}
function UpdateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5028/api/Order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update Order');
        }
    });
}
function DeleteMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5028/api/Medicine/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to delete medicine');
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5028/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch User ');
        }
        return yield response.json();
    });
}
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5028/api/Medicine';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Medicine ');
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5028/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Order ');
        }
        return yield response.json();
    });
}
