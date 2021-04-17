// Global constants and variables declaration
const BASE_URL = "http://localhost:3000/";
let curPage = 1;

// Function Calls
getMonsters(curPage).then(showMonsters);
createMonsterForm();
addNavListeners();





// OBJECTIVE 1
// When the page loads, show the first 50 monsters. 
// Each monster's name, age, and description should be shown.

// 1. Get the relevant data
// 2. Create a component with the data
// 3. Append the component to the DOM

// 1. Get the relevant data
// http://localhost:3000/monsters/?_limit=50&_page=1
function getMonsters(page) {
  const url = `${BASE_URL}monsters/?_limit=50&_page=${page}`;
  return fetch(url)
    .then(res => res.json())
}

// 2. Create a component with the data
/*
<div>
  <h2>Monster Name</h2>
  <h3>Monster Age</h3>
  <p>Monster description</p>
</div> 
*/

function createMonsterDiv(monsterObj) {
  const div = document.createElement('div'),
    h2 = document.createElement('h2'),
    h3 = document.createElement('h3'),
    p = document.createElement('p');

  h2.textContent = monsterObj.name;
  h3.textContent = monsterObj.age;
  p.textContent = monsterObj.description;

  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(p);

  return div;
}

const testMonsterObj = {
  "name": "Chronos",
  "age": 4005.302453418598,
  "description": "Effulgence eldritch shunned foetid. Ululate gibbering tenebrous foetid iridescence daemoniac. Stench nameless gambrel. Amorphous furtive iridescence noisome. Foetid mortal nameless.",
  "id": 1
}

// 3. Append the component to the DOM
/*
<div id='monster-container'>
  <div>
    <h2>Monster Name</h2>
    <h3>Monster Age</h3>
    <p>Monster description</p>
  </div>
</div>
*/

function showMonsters(monstersArray) {
  clearMonstersContainer();
  const monsterContainer = document.getElementById('monster-container');
  monstersArray.forEach(monsterObj => {
    const monsterDiv = createMonsterDiv(monsterObj);
    monsterContainer.appendChild(monsterDiv);
  });
}

function clearMonstersContainer() {
  document.querySelector("#monster-container").innerHTML = "";
}

const testMonstersArray = [
  {
    "name": "Chronos",
    "age": 4005.302453418598,
    "description": "Effulgence eldritch shunned foetid. Ululate gibbering tenebrous foetid iridescence daemoniac. Stench nameless gambrel. Amorphous furtive iridescence noisome. Foetid mortal nameless.",
    "id": 1
  },
  {
    "name": "Tartarus",
    "age": 1874.4913565609456,
    "description": "Cyclopean swarthy amorphous singular accursed furtive non-euclidean stygian. Swarthy gibbering charnel eldritch daemoniac gibbous. Cyclopean lurk hideous tentacles squamous immemorial tenebrous mortal. Madness tentacles furtive mortal foetid decadent. Foetid immemorial comprehension.",
    "id": 2
  },
  {
    "name": "Hemera",
    "age": 4094.8375978925988,
    "description": "Dank immemorial abnormal gambrel. Cat lurk unutterable. Abnormal tenebrous ululate. Nameless swarthy manuscript eldritch indescribable accursed antediluvian decadent.",
    "id": 3
  },
  {
    "name": "Tartarus",
    "age": 2364.163894640274,
    "description": "Fungus blasphemous immemorial indescribable singular cat foetid. Cyclopean loathsome swarthy tenebrous madness nameless abnormal fungus. Daemoniac fungus fainted.",
    "id": 4
  }
]

// showMonsters(testMonstersArray);

// getMonsters(1).then(monstersArray => console.log(monstersArray));
// getMonsters(1).then(console.log);

// getMonsters(2)
//   .then(monstersArray => showMonsters(monstersArray));

// getMonsters(1)
//   .then(showMonsters)
//   .catch(error => {
//     console.log(error);
//   })





// OBJECTIVE 2: Form for creating new monsters
function createMonsterForm() {
  const form = document.createElement("form"),
    nameInput = document.createElement("input"),
    ageInput = document.createElement("input"),
    descInput = document.createElement("input"),
    submitBtn = document.createElement("button");

  form.id = "monster-form";
  nameInput.id = "name";
  ageInput.id = "age";
  descInput.id = "description";

  nameInput.placeholder = "name";
  ageInput.placeholder = "age";
  descInput.placeholder = "description";
  submitBtn.textContent = "Create";

  form.appendChild(nameInput);
  form.appendChild(ageInput);
  form.appendChild(descInput);
  form.appendChild(submitBtn);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const monsterObj = getFormData();
    postMonster(monsterObj);
    clearForm();
    });

  document.getElementById("create-monster").appendChild(form);
}

function getFormData() {
  let a = document.querySelector("#name"),
    b = document.querySelector("#age"),
    c = document.querySelector("#description");

  return {
    name: a.value,
    age: parseFloat(b.value),
    description: c.value,
  };
}

function postMonster(monster) {
  let URL = `${BASE_URL}monsters`,
    config = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(monster),
    };

  fetch(URL, config);
}

function clearForm() {
  document.querySelector("#monster-form").reset();
}





// OBJECTIVE 3: Control page using the buttons
function addNavListeners() {
  let backBtn = document.querySelector("#back"),
    forwardBtn = document.querySelector("#forward");

  backBtn.addEventListener("click", () => {
    prevPage();
  });

  forwardBtn.addEventListener("click", () => {
    nextPage();
  });
}

function nextPage() {
  curPage++;
  getMonsters(curPage).then(showMonsters);
}

function prevPage() {
  if (curPage < 1) {
    alert("You're already on the first page");
  } else {
    curPage--;
    getMonsters(curPage).then(showMonsters);
  }
}