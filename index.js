let inputBtn = document.getElementById("input-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

// When the save tab button is clicked it will save the url of the current tab on your browser to the DOM
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// When the delete all button is clicked it will delete all of the values from the DOM, localStorage, and the myLeads array
deleteBtn.addEventListener("click", function () {
  myLeads = [];
  localStorage.clear();
  render(myLeads);
});

// When the save input button is clicked it will save whatever value is in the input to the DOM
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  render(myLeads);

  console.log(localStorage.getItem("myLeads"));
});

// This statement makes sure that the values of the input are kept on refresh of the browser
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// This function renders our the value of the input onto the DOM
function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    console.log(leads[i]);
    listItems += `<li>
          <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
          </a>
        </li>        

    `;
  }
  ulEl.innerHTML = listItems;
}
