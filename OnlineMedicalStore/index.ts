let userIdAutoIncrement = 1000;
let medicineAutoIncerement=10;
let orderAutoIncrement=100;

let currentUserName:string;
let currentUserID: Users;
let selectedIndex:number;
let userBalance:number;
userBalance=0;

let count=0;

interface Users{
    userID:number;
    userName:string;
    password:string;
    email:string;
    mobile: string;
    balance: number;
  
}

interface Medicine{
    medicineID:number;
    medicineName:string;
    medicineCount:number;
    medicinePrice:number;
    // constructor(paramMedicineName:string,paramMedicineCount:number,paramMedicinePrice:number)
    // {
    //     medicineAutoIncerement++;
    //     this.MedicineId="MID"+medicineAutoIncerement.toString();
    //     this.MedcineName=paramMedicineName;
    //     this.MedicineCount=paramMedicineCount;
    //     this.MedicinePrice=paramMedicinePrice
    // }
}

interface Orders{
    userID:number;
    medicineID:number;
    orderID:number;
    totalAmount:number;
    medicineName:string;
    medicineCount:number;
   
}


async function MedicineDetail()
{
    const MedicineList=await fetchMedicine();
    let purchase=document.getElementById("purchase-table") as HTMLDivElement;
    purchase.style.display="none";
    let medicineTable=document.getElementById("medicine-table") as HTMLDivElement;
    medicineTable.style.display="block";

    const tableBody = document.querySelector("#dataTable tbody") as HTMLTableSectionElement;
    const element = document.getElementById('rows') as HTMLTableElement;
    element.innerHTML="";
    for(let i=0;i<MedicineList.length;i++)
        {
            const row=document.createElement("tr");
            row.innerHTML=`<td>${MedicineList[i].medicineID}</td>
            <td>${MedicineList[i].medicineName}</td>
            <td id="medicine-count">${MedicineList[i].medicineCount}</td>
            <td>${MedicineList[i].medicinePrice}</td>
            </td>
            `;
            tableBody.appendChild(row);
       }
}


async function purchase()
{
    const apiUrlMedicine='http://localhost:5028/api/Medicine';
    const MedicineList=await fetchMedicine();
    let inside=document.getElementById("medicine-table") as HTMLDivElement;
    inside.style.display="none";

    let purchase=document.getElementById("purchase-table") as HTMLDivElement;
    purchase.style.display="block";

    const tableBody = document.querySelector("#data-Table tbody") as HTMLTableSectionElement;
    const element = document.getElementById('rows-1') as HTMLTableElement;
    element.innerHTML="";
    count=0;
    for(let i=0;i<MedicineList.length;i++)
        {
            const row=document.createElement("tr");
            row.innerHTML=`<td >${MedicineList[i].medicineID}</td>
            <td >${MedicineList[i].medicineName}</td>
            <td id="2">${MedicineList[i].medicineCount}</td>
            <td >${MedicineList[i].medicinePrice}</td>
            <td><button onclick="add('${i}')">Purchase</button>
            `;
            tableBody.appendChild(row);
            count++;
       }
   
}
function add(i:number)
{   
    let editMedicine=document.getElementById("medicine-edit") as HTMLDivElement;
    editMedicine.style.display="block";
    selectedIndex=i;
    
    
}

async function edit()
{
let id=0;
    const medicineList=await fetchMedicine();
    const cancelList=await fetchOrder();
    let val=document.getElementById("edit-count") as HTMLInputElement;
   
    if(medicineList[selectedIndex].medicineCount>=Number(val.value))
        {
            
            let amount=parseInt(val.value)*medicineList[selectedIndex].medicinePrice;
            if(currentUserID.balance>=amount)
                {
                    
                    medicineList[selectedIndex].medicineCount-=Number(val.value);
                    currentUserID.balance-=amount;
                    const order: Orders ={
                        orderID: ++orderAutoIncrement,
                        userID:currentUserID.userID,
                        medicineID:medicineList[selectedIndex].medicineID,
                        medicineName:medicineList[selectedIndex].medicineName,
                        medicineCount:parseInt(val.value),
                        totalAmount:amount
                    };
                    addOrder(order);
                    medicineList[selectedIndex].medicineCount-=parseInt(val.value);
                                        // const updation: Medicine={
                    //     medicineID:medicineList[selectedIndex].medicineID,
                    //     medicineName:medicineList[selectedIndex].medicineName,
                    //     medicineCount:MediparseInt(val.value),
                    //     medicinePrice:medicineList[selectedIndex].medicinePrice
                    // }
                    UpdateMedicine(medicineList[selectedIndex].medicineID,medicineList[selectedIndex]);
                    alert("purchesed successfully");
                }
                else
                {
                    alert("You have no balance please top up");
                }
        }
        else
        {
            alert("count not available for this medicine");
        }
        id++;
}

async function cancel()
{
    const apiUrl='http://localhost:5028/api/Order';
    const cancelList=await fetchOrder();
    let inside=document.getElementById("medicine-table") as HTMLDivElement;
    inside.style.display="none";

    let purchase=document.getElementById("purchase-table") as HTMLDivElement;
    purchase.style.display="none";
  
    let cancel=document.getElementById("cancel-order") as HTMLDivElement;
    cancel.style.display="block";
    const tableBody=document.querySelector("#cancel-show-table tbody") as HTMLTableElement;
    tableBody.innerHTML="";
    for(let i=0;i<cancelList.length;i++)
        {
            let row=document.createElement("tr");
            row.innerHTML=`<td>${cancelList[i].orderID}</td>
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
}



async function cancelOrder(id:any) {


    const cancelList=await fetchOrder();
    const medicineList=await fetchMedicine();
    for(let i=0;i<medicineList.length;i++)
        {
           
            if(id===medicineList[i].medicineID)
                {
                   for(let j=0;j<cancelList.length;j++)
                    {
                        if(id===cancelList[j].medicineID)
                            {
                                console.log(medicineList[i].medicineID);
                                console.log(medicineList[j].medicineID);
                                medicineList[i].medicineCount+=cancelList[j].medicineCount;
                                await UpdateMedicine(id,medicineList[i]);
                                currentUserID.balance+=cancelList[j].totalAmount;
                                await UpdateUser(id,currentUserID);
                                console.log(currentUserID.balance);
                                alert("successfully order cancelled and balaced returned to your account");
                            }
                    }
                }
       }
}


function hi()
{
    let topUp=document.getElementById("topup") as HTMLDivElement;
    topUp.style.display="block";
}
async function topUp()
{
    
    let id=3;
    let form=document.getElementById("top-amount") as HTMLInputElement;
    // UserBalance+=parseInt(form.value);
    // console.log(form.value);
    //form.value="";
    currentUserID.balance += parseInt(form.value);
    await UpdateUser(id,currentUserID);
    let topUp=document.getElementById("topup") as HTMLDivElement;
    topUp.style.display="none";
    form.value="";
}

function orderHistory()
{

}

async function showBalance1()
{
    // let inside=document.getElementById("medicine-table") as HTMLDivElement;
    // inside.style.display="none";

    // let purchase=document.getElementById("purchase-table") as HTMLDivElement;
    // purchase.style.display="none";
  
    // let cancel=document.getElementById("cancel-order") as HTMLDivElement;
    // cancel.style.display="none";

    // let topUp=document.getElementById("topup") as HTMLDivElement;
    // topUp.style.display="none";
    
    let show=document.getElementById("showbalance") as HTMLDivElement;
    // show.style.display="block";
   const  value=await fetchUser();
    show.innerText=`your balance is ${currentUserID.balance}`;
}
function Signup()
{
    console.log(1);
    let showLogin=document.getElementById("show-login") as HTMLDivElement;
    let signup=document.getElementById("signup-page") as HTMLDivElement;
    showLogin.style.display="none";
    signup.style.display="block";
}
async function signin()
{
    
    
    let signin=document.getElementById("signin-page") as HTMLDivElement;
    
    //currentUserID = userList[0];

    let name=document.getElementById("name") as HTMLInputElement;
   
    signin.style.display="block";

}

async function LoginProcess() {
    const apiUrl='http://localhost:5028/api/User';
    const userList=await fetchUser();
    let showLogin=document.getElementById("show-login") as HTMLDivElement;
    let password=document.getElementById("password") as HTMLInputElement;
    let email=document.getElementById("email") as HTMLInputElement;
    userList.forEach((user)=>{
        if(user.email==email.value&&password.value==user.password)
            {
                currentUserID=user;
                showLogin.style.display="none";
                
                inside();
            }
    });
}
function inside()
{
    let signup=document.getElementById("signup-page") as HTMLDivElement;
    let inside=document.getElementById("inside") as HTMLDivElement;
    let name=document.getElementById("name") as HTMLFormElement;
    let welcome=document.getElementById("welcome") as HTMLElement;
    welcome.innerHTML= "Welcome "+name.value;
    let showLogin=document.getElementById("show-login") as HTMLDivElement;
    let loginpage=document.getElementById("signin-page") as HTMLDivElement;
    showLogin.style.display="none";
    currentUserName=name.value;
    welcome.style.alignContent="center";
    signup.style.display="none";
    loginpage.style.display="none";
    inside.style.display="block";
}


async function addUser(user:Users): Promise<void> {
    const response=await fetch('http://localhost:5028/api/User',{
       method: 'POST',
       headers:{
        'Content-Type':'application.json'
       } ,
       body: JSON.stringify(user)
    });
    if(!response.ok){
        throw new Error('Failed to add User');
    }
}

async function addMedicine(medicine:Medicine): Promise<void> {
    const response=await fetch('http://localhost:5028/api/Medicine',{
       method: 'POST',
       headers:{
        'Content-Type':'application.json'
       } ,
       body: JSON.stringify(medicine)
    });
    if(!response.ok){
        throw new Error('Failed to add User');
    }
    MedicineDetail();
}

async function addOrder(order:Orders): Promise<void> {
    const response=await fetch('http://localhost:5028/api/Order',{
       method: 'POST',
       headers:{
        'Content-Type':'application.json'
       } ,
       body: JSON.stringify(order)
    });
    if(!response.ok){
        throw new Error('Failed to add User');
    }
}

async function UpdateUser(id:number ,user:Users): Promise<void> {
    const response=await fetch(`http://localhost:5028/api/User/${id}`,{
       method: 'PUT',
       headers:{
        'Content-Type':'application.json'
       } ,
       body: JSON.stringify(user)
    });
    if(!response.ok){
        throw new Error('Failed to update User');
    }
}

async function UpdateMedicine(id:number ,medicine:Medicine): Promise<void> {
    const response=await fetch(`http://localhost:5028/api/Medicine/${id}`,{
       method: 'PUT',
       headers:{
        'Content-Type':'application.json'
       } ,
       body: JSON.stringify(medicine)
    });
    if(!response.ok){
        throw new Error('Failed to update Medicine');
    }

}

async function UpdateOrder(id:number ,order:Orders): Promise<void> {
    const response=await fetch(`http://localhost:5028/api/Order/${id}`,{
       method: 'PUT',
       headers:{
        'Content-Type':'application.json'
       } ,
       body: JSON.stringify(order)
    });
    if(!response.ok){
        throw new Error('Failed to update Order');
    }
}

async function DeleteMedicine(id:number ,medicine:Medicine): Promise<void> {
    const response=await fetch(`http://localhost:5028/api/Medicine/${id}`,{
       method: 'DELETE',
       headers:{
        'Content-Type':'application.json'
       } ,
       body: JSON.stringify(medicine)
    });
    if(!response.ok){
        throw new Error('Failed to delete medicine');
    }
}

async function fetchUser(): Promise<Users[]> {
    const apiUrl='http://localhost:5028/api/User';
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error ('Failed to fetch User ');
        }
        return await response.json();
}

async function fetchMedicine(): Promise<Medicine[]> {
    const apiUrl='http://localhost:5028/api/Medicine';
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error ('Failed to fetch Medicine ');
        }
        return await response.json();
}

async function fetchOrder(): Promise<Orders[]> {
    const apiUrl='http://localhost:5028/api/Order';
    const response=await fetch(apiUrl);
    if(!response.ok)
        {
            throw new Error ('Failed to fetch Order ');
        }
        return await response.json();
}
