let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyCollection = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", getAllToys)

function renderOneToy(toy){
  let card = document.createElement('div')
  card.className = 'card'
  const h2 = document.createElement('h2')
  h2.innerText = `${toy.name}`
  const img = document.createElement('img')
  img.src = `${toy.image}`
  img.className = 'toy-avatar'
  const p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  const button = document.createElement('button')
  button.className = 'like-btn'
  button.id = `${toy.id}`
  button.innerText ='Like ❤️'
  button.addEventListener('click', addLikes)
  
  toyCollection.append(card)
  card.append(h2, img, p, button)
 
}

//e.target.button.previousSibling

function addLikes(e){
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'likes': e.target.previousSibling.innerText = `${toys.likes+= 1} Likes`
    })
  })
  .then(resp => resp.json())
  .then(toy => console.log(toy.likes))
  .catch(error => console.log(error))
}

// function newNumberOfLikes(toy) {
//   console.log(toy)
//   return toy.likes+= 1
//   // p.innerText = `${toy.likes} Likes`
//   // return p.innerText
//   //this needs to return a number for the JSON object
// }

document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  }
  renderOneToy(toyObj)
  postNewToy(toyObj);
}

//FETCHES

function getAllToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => data.forEach(toy => renderOneToy(toy)))
}

function postNewToy(toyObj) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
    // {
    //   'name': `${toyObj.name}`,
    //   'image': `${toyObj.image}`,
    // })
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
  .catch(error => console.log(error))
}


