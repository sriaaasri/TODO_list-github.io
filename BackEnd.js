//selecting items.
const alert = document.querySelector(".alert");
const form = document.querySelector(".form-center");
const grocery = document.querySelector("#item");
const submit = document.querySelector(".submit");
const container = document.querySelector(".grocery-container");
const clear = document.querySelector(".clear");
const list = document.querySelector(".grocery-list");
let editElement;
let editFlag = false;
let editId = "";
const added = "Item added to the list";
const inval = "Please enter valid item";
const dele = "Item removed";
let storage = [];

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const reg = /[A-Za-z0-9]+/;
  const value = grocery.value;
  const id = new Date().getTime().toString();

  // console.log(value);

  /* if(reg.test(value)){
     alert.textContent=added;
     alert.classList.add("valid");
     // console.log(alert.classList);
     setTimeout(function(){
       alert.classList.remove("valid");
       
     },1000);
   }
   else {
     alert.textContent=inval;
     alert.classList.add("invalid");
     // console.log("valid");
     setTimeout(function(){
       alert.classList.remove("invalid");
       
     },1000);*/
  if (value.length != 0 && !editFlag) {

    const element = document.createElement("article");
    element.classList.add("item");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);

    element.innerHTML = `<p class="name">${value}</p>
            <div class="btn-container">
              <button type="button" class=" btn edit">
                <i class="fas fa-edit"></i>
              </button>
              <button type=button class=" btn delete">
                <i class="fas fa-trash"></i>
              </button>
            </div>`
    
    list.appendChild(element);
    displayAlert("item added to the list ", "valid");
    container.classList.add("show-container");
    // console.log(container.classList);
    //add to local storage

    setBackToDefault();
    const individual_delete = element.querySelector(".delete");
    const individual_edit = element.querySelector(".edit");
    individual_delete.addEventListener("click", deleteOne);
    individual_edit.addEventListener("click", editOne);



  }


  else if (value.length != 0 && editFlag) {
    editElement.innerHTML = value;
    // displayAlert(added,"valid");
    displayAlert("value changed", "valid");

    setBackToDefault();



  }
  else {
    displayAlert(inval, "invalid");
  }
});
clear.addEventListener("click", function() {

  let targets = document.querySelectorAll(".item");

  if (targets.length > 0) {
    targets.forEach(function(item) {
      list.removeChild(item);


    });




  }
  container.classList.remove("show-container");
  displayAlert("empty list", "removed");
  setBackToDefault();



});


function displayAlert(content, target) {
  alert.textContent = content;
  alert.classList.add(target);

  setTimeout(function() {
    alert.classList.remove(target);

  }, 1000);
}

function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submit.textContent = "submit";




}
function deleteOne(e) {
  const ele = e.currentTarget.parentElement.parentElement;
  // const id=ele.dataSet.id
  list.removeChild(ele);
  displayAlert("removed item", "removed");
  setBackToDefault();

  if (list.children.length == 0) {
    container.classList.remove("show-container");
    displayAlert("empty list", "removed");
    setBackToDefault();



  }

}

function editOne(e) {
  const ele = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = ele.dataset.id;
  submit.innerHTML = "edit";
}






