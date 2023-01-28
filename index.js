let expAddButton = document.getElementById("exp_add");
let form = document.getElementById("exp_form")
let expense_list = document.getElementById("exps")


let btnEdit = document.createElement("button");
btnEdit.className = "btn btn-success btn-md float-right edit";
btnEdit.appendChild(document.createTextNode("Edit"));

let btndelete = document.createElement("button");
btndelete.className = "btn btn-danger btn-md float-right delete";
btndelete.appendChild(document.createTextNode("X"));

form.addEventListener("submit",addExpense);
expense_list.addEventListener("click",listUpdate);

document.addEventListener("DOMContentLoaded",refreshExpenses);

function addExpense(e){
    
    e.preventDefault();
    let amount = document.getElementById("amt");
    let description = document.getElementById("descrip");
    let category = document.getElementById("categ");


    let newExpense = {
        expAmount : amount.value,
        expDescription : description.value,
        expCategory : category.value
    }
    let newExpense_serialized = JSON.stringify(newExpense);
    localStorage.setItem(description.value , newExpense_serialized );
    refreshExpenses();
}

function refreshExpenses(){
    expense_list.innerHTML= "";

    let count = localStorage.length
    let expenses = []
    for (let i = 0; i < count; i++) {
        const expense = JSON.parse(localStorage.getItem(localStorage.key(i)));
        expenses.push(expense)
    }
    expenses.forEach((expObj)=>{
        let li = document.createElement("li");
        li.setAttribute("class","list-group-item");
        li.appendChild(document.createTextNode(`${expObj.expAmount} || ${expObj.expDescription} || ${expObj.expCategory}`));
        li.appendChild(btnEdit);
        li.appendChild(btndelete);
        expense_list.appendChild(li.cloneNode(true));
    })

}

function listUpdate(e){
    if (e.target.classList.contains("delete")){
        let exp = e.target.parentElement;
        const expData = exp.textContent.substring(0);
        
        let key = expData.split(" || ")[1];

        localStorage.removeItem(key);
        expense_list.removeChild(exp);
    }
    else if(e.target.classList.contains("edit")){
        let exp = e.target.parentElement;
        const expData = exp.textContent.substring();
        let dataArr = expData.split(" || ");

        let amount = document.getElementById("amt");
        let description = document.getElementById("descrip");
        let category = document.getElementById("categ");

        alert("Edit the values in the form");
        amount.setAttribute("value" , Number(dataArr[0]));
        description.setAttribute("value",dataArr[1]);
        category.setAttribute("value",dataArr[2]);
        

    }
}
