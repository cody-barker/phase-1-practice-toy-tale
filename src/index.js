let addToy = false;

const api = 'http://localhost:3000/toys'

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

const toyCollection = document.querySelector('#toy-collection')

fetch(api)
.then(resp => resp.json())
.then(toyList => renderCards(toyList))


function renderCards(toyList) {
  toyList.forEach(toy => createCards(toy))
}

/**
 * add click event listener to toy like buttons
 * cb makes a patch request to the db
 * capture toy id
 * calculate new number of likes
 * config obj sent to db/id has body key of likes with a value of newNumberOfLikes
 * resp updates the card for the toy by first removing it and then calling createCards(toy)
 */


function createCards(toy) {

    function handlePatch() {
      let newNumberOfLikes = ++ toy.likes
      let toyBody = {
        likes: newNumberOfLikes
      }
      let configObjPatch = {
        "method": "PATCH",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        "body": JSON.stringify(toyBody)
      }
      fetch(`http://localhost:3000/toys/${toy.id}`, configObjPatch)
      .then(resp => resp.json())
      .then(toy => {p.innerText = `${toy.likes} Likes`})
    }

    const card = document.createElement('div')
    card.className = 'card'

    const h2 = document.createElement('h2')
    h2.innerText = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    const p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`

    const button = document.createElement('button')
    button.className = 'like-btn'
    button.id = toy.id
    button.innerText = 'Like ❤️'
    button.addEventListener('click', handlePatch)

    card.append(h2, img, p, button)
    toyCollection.append(card)
}

const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit', handleSubmit)

function handleSubmit (e) {
  e.preventDefault()
  let configObj = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "body": JSON.stringify({
      name: e.target.children[1].value,
      image: e.target.children[3].value,
      likes: 0
    })
  }
  fetch(api, configObj)
  .then(resp => resp.json())
  .then(toy => createCards(toy))
}



