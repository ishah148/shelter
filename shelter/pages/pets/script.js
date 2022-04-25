// import { pets } from './pets-list.js';
// import {* as x} from 'pages/pets/pets-list.js'
// window.onload
let numberOfPage = 1;
function getMaxPages(){
    return Math.ceil(pets.length / getMediaType());
}

const elems = {
    nav: document.querySelector("nav"),
    header: document.querySelector("header"),
    pseudoDiv: document.querySelector(".psevdo-nav"),
    hamburger: document.querySelector(".hamburger"),
    content: document.querySelector('.content-wrapper'),
    logo: document.querySelector('.logo'),
    buttonLeft: document.querySelector(".button-round.left"),
    buttonRewindLeft: document.querySelector("button.rewind-left"),
    buttonRight: document.querySelector(".button-round.right"),
    buttonRewindRight: document.querySelector("button.rewind-right"),
    buttonClose: document.querySelector('.modal-window button'),
    buttonCurrent: document.querySelector('.button-round.current'),
    modalWindow: document.querySelector('.modal-window'),
    isActive: false,
    getButtonsLearnMore: function () {
        return document.querySelectorAll(".card .button-primary")
    },
    contentAll: function () {
        return document.querySelectorAll('.pets .content-wrapper .card');
    },
    getCountCard: function () {
        return document.querySelectorAll('.card').length
    },
    getBurgerArr: function () {
        return [this.nav, this.header, this.pseudoDiv, this.hamburger, this.logo];
    }
}
showCards()
updateCardResize();
startEventWatch();
updateButtons(elems.getButtonsLearnMore());

function startEventWatch() {
    updateButtons(elems.getButtonsLearnMore())
    
    elems.buttonLeft.onclick = function minusPage() {
        let min = 1;
        removeCards();
        numberOfPage > min ? numberOfPage -= 1 : min;
        checkStyle();
        showCards();
        updateButtons(elems.getButtonsLearnMore());
    }

    elems.buttonRewindLeft.onclick = function firstPage(){
        numberOfPage = 1;
        removeCards();
        checkStyle();
        showCards();
        updateButtons(elems.getButtonsLearnMore());
    }
    elems.buttonRewindRight.onclick = function firstPage(){
        numberOfPage = getMaxPages();
        removeCards();
        checkStyle();
        showCards();
        updateButtons(elems.getButtonsLearnMore());
    }

    elems.buttonRight.onclick = function plusPage() {
        let max = Math.ceil(pets.length / getMediaType());
        maxPages = max;
        console.log('=>', max)
        removeCards()
        numberOfPage >= max ? max : numberOfPage += 1;
        checkStyle()
        showCards()
        updateButtons(elems.getButtonsLearnMore())
    }

    window.addEventListener('resize', () => {
        updateCardResize()
    })

    elems.hamburger.addEventListener('click', function () {
        elems.getBurgerArr().forEach(elem => elem.classList.toggle('active'))
    })

    document.querySelectorAll('nav p').forEach(block => {
        block.addEventListener('click', function () {
            if (window.innerWidth < 660) {
                // elems.nav.classList.remove('active')
                // elems.hamburger.classList.remove('active')
                elems.getBurgerArr().forEach(elem => elem.classList.remove('active'))
            }
        })
    })

    elems.pseudoDiv.addEventListener('click', () => {
        if (elems.header.classList.value.includes('active')) {
            elems.getBurgerArr().forEach(elem => elem.classList.remove('active'))
        }
        if(elems.modalWindow.classList.value.includes('open')){
            closeModalWindow();
        }
    })

}
// =============== Buttons and events ===============



// =============== ======= ===============

function showCards() {
    let min = (numberOfPage - 1) * getMediaType();
    let max = ((numberOfPage - 1) * getMediaType()) + getMediaType();
    pets
        .slice(min, max)
        .forEach(pet => elems.content.insertAdjacentHTML('beforeend', getCard(pet)))
}

function removeCards() {
    // debugger
    elems.contentAll().forEach(i => i.remove())

}

function removeModalInfo() {
    document.querySelectorAll("div.modal-window *").forEach(i => i.remove())
}

function checkStyle() {
    let max = Math.ceil(pets.length / getMediaType());
    if (numberOfPage === max) {
        elems.buttonRight.classList.add('invalid');
        elems.buttonRewindRight.classList.add('invalid');
        elems.buttonLeft.classList.remove('invalid');
        elems.buttonRewindLeft.classList.remove('invalid');
        return;
    }
    if (numberOfPage === 1) {
        elems.buttonLeft.classList.add('invalid');
        elems.buttonRewindLeft.classList.add('invalid');
        elems.buttonRight.classList.remove('invalid');
        elems.buttonRewindRight.classList.remove('invalid');
        return;
    }
    if (numberOfPage > 1 || numberOfPage < max) {
        elems.buttonLeft.classList.remove('invalid');
        elems.buttonRight.classList.remove('invalid');
        elems.buttonRewindLeft.classList.remove('invalid');
        elems.buttonRewindRight.classList.remove('invalid');
        return;
    }
}

function getCard(obj) {
    return `
    <div class="card">
        <div class="image"><img src="${obj.img}" alt=""></div>
        <p class="pets-card-title">${obj.name}</p>
        <button class="button-primary" id="${obj.name}">Learn more</button>
    </div>
 `
}

function getMediaType() {
    const width = window.innerWidth
    // console.log(width)
    if (width >= 970) { return 8 }
    if (width < 970 && width > 660) { return 6 }
    if (width <= 660) { return 3 }
}

function getInfoAbout(name) {
    for (pet of pets) {
        if (pet.name === name) {
            return `
            <div class="image">
                <img src="${pet.img}" alt="">
            </div>
            <div class="content">
                <div class="name-wrapper">
                    <h3>${pet.name}</h3>
                    <h4>${pet.type} - ${pet.breed}</h4>
                </div>
                <h5>${pet.description}</h5>
                <div class="list">
                    <ul>
                        <li><b>Age:</b> ${pet.age}</li>
                        <li><b>Inoculations:</b> ${pet.inoculations.join(',')}</li>
                        <li><b>Diseases:</b> ${pet.diseases.join(',')}</li>
                        <li><b>Parasites:</b>${pet.parasites.join(',')} </li>
                    </ul>
                </div>
            </div>
            <button class="button-round">
                <svg>
                    <use xlink:href="assets/icons/arrow.svg#cross"></use>
                </svg>
            </button>
        `}
    }
}

function updateCardResize() {    
    if (elems.getCountCard() !== getMediaType()) {
        // let amount = elems.getCountCard()*numberOfPage
        // console.log("amount",amount)
        numberOfPage = Math.floor(numberOfPage / getMediaType()) || 1;
        checkStyle()
        removeCards()
        showCards()
        updateButtons(elems.getButtonsLearnMore())
    }
}

function updateButtons(elem) {  //elems.getButtonsLearnMore()
    elem.forEach(bt => bt.onclick = function () {
        removeModalInfo()
        elems.modalWindow.insertAdjacentHTML('beforeend', getInfoAbout(bt.id))
        showModalWindow()
    })
    elems.buttonCurrent.innerHTML = numberOfPage;
}

function showModalWindow() {
    // debugger
    elems.modalWindow.classList.add('open')
    elems.pseudoDiv.classList.add('active')
    document.querySelector('body').classList.add('stop')

    document.querySelector('.modal-window button.button-round').onclick = function () {
        closeModalWindow();
    }
    elems.modalWindow.scrollIntoView({block: "center", behavior: "smooth"})
}
function closeModalWindow() {
    elems.modalWindow.classList.remove('open')
    elems.pseudoDiv.classList.remove('active')
    document.querySelector('body').classList.remove('stop')
}
