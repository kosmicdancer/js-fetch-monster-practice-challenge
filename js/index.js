// Objective 1
// When the page loads, show the first 50 monsters. 
// Each monster's name, age, and description should be shown.

//const monsterList = ul ['name': 'name', 'age': 'age', 'description': 'description'];

// Above your list of monsters, you should have a form to create a new monster. 

// Have fields for name, age, and description, and a 'Create Monster Button'. 
//const form = document.getElementById('create-monstter');

// When you click the button, the monster should be added to the list and saved in the API.
//form.addEventListener('click', (e) => preventDefault);

// At the end of the list of monsters, show a button. 

// When clicked, the button should load the next 50 monsters and show them.


// 1. GET http://localhost:3000/monsters

// optional parameters:

// _limit=[number] - limit the number of monsters returned
// _page=[number] - offset your request for monsters to some page (must specify a limit)

// example:

// GET http://localhost:3000/monsters/?_limit=20&_page=3

// 2. Create a monster

// POST http://localhost:3000/monsters
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// data:
// { name: string, age: number, description: string }
const BASE_URL = "http://localhost:3000/";
let curPage = 1;

getMonsters(curPage).then(showMonsters);
createMonsterForm();
addNavListeners();

function getMonsters(page) {
    const url = `${BASE_URL}monsters/?_limit=50&_page=${page}`;
    return fetch(url)
      .then(res => res.json())
}

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
