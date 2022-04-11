// import { pets } from './pets-list.js';
// import {* as x} from 'pages/pets/pets-list.js'
// window.onload
let numberOfPage = 1

const elems = {
    nav: document.querySelector("nav"),
    hamburger: document.querySelector(".hamburger"),
    content: document.querySelector('.pets .content-wrapper'),
    buttonLeft: document.querySelector("button.button-arrow.left"),
    buttonRight: document.querySelector("button.button-arrow.right"),
    buttonClose: document.querySelector('.modal-window button'),
    modalWindow: document.querySelector('.modal-window'),
    getButtonsLearnMore: function () {
        return document.querySelectorAll(".card .button-primary")
    },
    contentAll: function () {
        return document.querySelectorAll('.pets .content-wrapper .card');
    },
    getCountCard: function () {
        return document.querySelectorAll('.card').length
    },
}

showCards()
updateCardResize();
// =============== Buttons ===============
updateButtons(elems.getButtonsLearnMore())
elems.buttonLeft.onclick = function minusPage() {
    let min = 1
    removeCards()
    numberOfPage > min ? numberOfPage -= 1 : min;
    checkStyle()
    showCards()
    updateButtons(elems.getButtonsLearnMore())
}
elems.buttonRight.onclick = function plusPage() {
    let max = Math.ceil(pets.length / getMediaType());
    console.log('=>', max)
    removeCards()
    numberOfPage >= max ? max : numberOfPage += 1;
    checkStyle()
    showCards()
    updateButtons(elems.getButtonsLearnMore())
}
elems.buttonClose.onclick = function () {
    console.log('123')
    closeModalWindow();
}

// =============== ======= ===============

function showCards() {
    let min = (numberOfPage - 1) * getMediaType();
    let max = ((numberOfPage - 1) * getMediaType()) + getMediaType();
    pets
        .slice(min, max)
        .forEach(pet => elems.content.insertAdjacentHTML('afterbegin', getCard(pet)))
}

function removeCards() {
    // debugger
    elems.contentAll().forEach(i => i.remove())

}

function removeModalInfo() {
    document.querySelectorAll("div.modal-window *").forEach(i => i.remove())
}

window.addEventListener('resize', () => {
    updateCardResize()
})

elems.hamburger.addEventListener('click', function () {
    // console.log(this)
    this.classList.toggle('active')
    elems.nav.classList.toggle('active')
})

document.querySelectorAll('nav p').forEach(block => {
    block.addEventListener('click', function () {
        if (window.innerWidth < 660) {
            elems.nav.classList.toggle('active')
            elems.hamburger.classList.toggle('active')
        }
    })
})


function checkStyle() {
    let max = Math.ceil(pets.length / getMediaType());
    if (numberOfPage === max) {
        elems.buttonRight.classList.add('invalid');
        return;
    }
    if (numberOfPage === 1) {
        elems.buttonLeft.classList.add('invalid');
        return;
    }
    if (numberOfPage > 1 || numberOfPage < max) {
        elems.buttonLeft.classList.remove('invalid');
        elems.buttonRight.classList.remove('invalid');
        return;
    }
}

setInterval(() => {
    // console.log(numberOfPage)
}, 600);


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
    if (width > 1000) { return 3 }
    if (width < 1000 && width > 750) { return 2 }
    if (width < 750) { return 1 }
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
                    <use xlink:href="../../assets/icons/arrow.svg#cross"></use>
                </svg>
            </button>
        `}
    }
}

function getModalWindowInfo(id) {

}

function updateCardResize() {
    if (elems.getCountCard !== getMediaType()) {
        numberOfPage = Math.floor(numberOfPage / getMediaType()) || 1;
        removeCards()
        showCards()
        updateButtons(elems.getButtonsLearnMore())
    }
    document.querySelector('.button-wrapper').style.width = document.querySelector('body').offsetWidth - 20 + 'px'

    if (document.querySelector('body').offsetWidth > 570) {
        document.querySelector('.button-wrapper').style.width = document.querySelector('body').offsetWidth - 80 + 'px'
    }
    if (document.querySelector('body').offsetWidth <= 570) {
        document.querySelector('.button-wrapper').style.width = 190 + 'px'
    }
}

function updateButtons(elem) {  //elems.getButtonsLearnMore()
    elem.forEach(bt => bt.onclick = function () {
        removeModalInfo()
        elems.modalWindow.insertAdjacentHTML('afterbegin', getInfoAbout(bt.id))
        showModalWindow()
        console.log(getInfoAbout(bt.id))
    })
}

function showModalWindow() {
    elems.modalWindow.classList.add('open')
    console.log(elems.buttonClose)
    document.querySelector('.modal-window button.button-round').onclick = function () {
        closeModalWindow();
    }
    document.querySelectorAll('section *').forEach(i => i.style.opacity = 0.5)
    document.querySelector('.modal-window').style.opacity = 1;
    document.querySelector('.pets .content-wrapper').style.opacity = 1;
    document.querySelectorAll('.modal-window *').forEach(i => i.style.opacity = 1)
}
function closeModalWindow() {
    elems.modalWindow.classList.remove('open')
    document.querySelectorAll('section *').forEach(i => i.style.opacity = 1)
}
