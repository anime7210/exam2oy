import { movies } from "./movies.js";

const splicedMovies = movies.splice(0, 50)

const form = document.querySelector("form")
const input = document.querySelector('input')
const select = document.querySelector('select')
const cardsList = document.querySelector('#cards-list')

let inputValue = ''
let selectValue = ''

const cardsDraw = (arr) =>{
    cardsList.innerHTML = ''
    arr.forEach((el)=>{
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
            <h2>${el.Title}</h2>
            <p>${el.movie_year}</p>
            <p>${el.Categories}</p>
            <button>More info</button>
        `
        cardsList.appendChild(card)
    })
}

cardsDraw(splicedMovies)

input.addEventListener('input', (e) =>{
    if(e.target.value){
        inputValue = e.target.value.toLowerCase()
    } else {
        cardsDraw(splicedMovies)
    }
    
})


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    cardsList.innerHTML = ''
    let filteredMovies = []
    if(inputValue){
        filteredMovies = splicedMovies.filter(el => {
            if(typeof el.Title === 'string'){
                return el.Title.toLowerCase().includes(inputValue.toLowerCase())
            }
            return el.Title === inputValue
        })
    }
    if(filteredMovies.length){
        if(selectValue === 'A-Z'){
            cardsDraw(filteredMovies.sort((a, b) => a.Title.localeCompare(b.Title)))
        } else {
            cardsDraw(filteredMovies.sort((a, b) => a.Title.localeCompare(b.Title)).reverse())
        }
    } else {
        if(selectValue === 'A-Z'){
            cardsDraw(splicedMovies.sort((a, b) => a.Title.localeCompare(b.Title)))
        } else {
            cardsDraw(splicedMovies.sort((a, b) => a.Title.localeCompare(b.Title)).reverse())
        }
    }
})


select.addEventListener('change' , (e)=>{
    selectValue = e.target.value
})