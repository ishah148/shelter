// import { pets } from './pets-list.js';
// import {* as x} from 'pages/pets/pets-list.js'
// window.onload
let numberOfPage = 1
let currentPets = shuffleArr(pets)
let nextPets = []
const elems = {
    nav: document.querySelector("nav"),
    header: document.querySelector("header"),
    pseudoDiv: document.querySelector(".psevdo-nav"),
    hamburger: document.querySelector(".hamburger"),
    logo: document.querySelector('.logo'),
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
    getCards: function () {
        return document.querySelectorAll('.card')
    },
    getBurgerArr: function () {
        return [this.nav, this.header, this.pseudoDiv, this.hamburger, this.logo];
    },
}

console.log(" Привет!Всё выполнено по заданию, но,если вдруг будут недочеты прошу сделать имя видимым или написать недочеты в телеграмм @IgorTg123 ")
console.log(" Зараннее спасибо!")
// showCards()
// updateCardResize();
startEventWatch();
initCurrentPets()

function startEventWatch() {
    updateButtons(elems.getButtonsLearnMore())

    elems.buttonLeft.onclick = function minusPage() {
        let min = 1
        removeCards()
        numberOfPage > min ? numberOfPage -= 1 : min;
        checkStyle()
        showCards('next')
        setTimeout(() => {
            elems.getCards().forEach(card => {
                card.classList.add('normal')
            })
        }, 100);
        updateButtons(elems.getButtonsLearnMore())
    }
    elems.buttonRight.onclick = function plusPage() {
        let max = Math.ceil(pets.length / getMediaType());
        console.log('=>', max)
        removeCards()
        numberOfPage >= max ? max : numberOfPage += 1;
        checkStyle()
        showCards('next')
        setTimeout(() => {
            elems.getCards().forEach(card => {
                card.classList.add('normal')
            })
        }, 100);
        updateButtons(elems.getButtonsLearnMore())
    }

    // window.addEventListener('resize', () => {
    //     updateCardResize()
    // })

    elems.hamburger.addEventListener('click', function () {
        console.log(1223)
        if (elems.hamburger.classList.value !== 'hamburger active') {
            elems.getBurgerArr().forEach(elem => elem.classList.add('active'))
            return
        }
        if (elems.hamburger.classList.value === 'hamburger active') {
            elems.getBurgerArr().forEach(elem => elem.classList.remove('active'))
            return
        }
    })

    document.querySelectorAll('nav p').forEach(p => {
        p.addEventListener('click', function () {
            if (window.innerWidth < 660) {
                elems.getBurgerArr().forEach(elem => elem.classList.remove('active'))
            }
        })
    })
    elems.pseudoDiv.addEventListener('click', () => {
        if (elems.header.classList.value === 'active') {
            elems.getBurgerArr().forEach(elem => elem.classList.toggle('active'))
        }
        if (elems.modalWindow.classList.value.includes('open')) {
            closeModalWindow();
        }
    })

    window.addEventListener('resize', () => {
        // updateCardResize()
    })
}

// =============== Buttons ===============
updateButtons(elems.getButtonsLearnMore())

// =============== ======= ===============

function initCurrentPets() {
    currentPets = new Set();
    while (currentPets.size < 6) {
        currentPets.add(pets[randomInteger(0, 47)]);
    }
    [...currentPets]
        .slice(0, 3)
        .forEach(pet => elems.content.insertAdjacentHTML('beforeend', getCard(pet)))
    elems.getCards().forEach(card => card.classList.add('normal'))
}

function generateNextPets() {
    nextPets = new Set([...currentPets].splice(3, 6));
    while (nextPets.size < 6) {
        nextPets.add(pets[randomInteger(0, 47)]);
    }
    currentPets = nextPets;
}

function showCards(direction = '') {
    if (direction === 'next') {
        generateNextPets();
        [...currentPets]
            .slice(0, 3)
            .forEach(pet => elems.content.insertAdjacentHTML('beforeend', getCard(pet)))
    }
}

// pets
//     .slice(min, max)
//     .forEach(pet => elems.content.insertAdjacentHTML('beforeend', getCard(pet)))
// }

function showCards555() {

    let uniqSet = new Set();
    while (uniqSet.size < 6) {
        uniqSet.add(pets[randomInteger(0, 47)]);
    }
    // [...uniqSet].slice(0, 3)
    //     .forEach(pet => elems.content.insertAdjacentHTML('beforeend', getCard(pet)));


    // по клику на кнопку
    let test = [...uniqSet].splice(3, 6);
    let newUniqSet = new Set(test);

    while (newUniqSet.size < 6) {
        newUniqSet.add(pets[randomInteger(0, 47)]);
    }
    [...newUniqSet].slice(0, 3)
        .forEach(pet => elems.content.insertAdjacentHTML('beforeend', getCard(pet)));

    //или тест выводятся на экран тут
    console.log(uniqSet);
    console.log(newUniqSet);

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
        // elems.buttonRight.classList.add('invalid');
        return;
    }
    if (numberOfPage === 1) {
        // elems.buttonLeft.classList.add('invalid');
        return;
    }
    if (numberOfPage > 1 || numberOfPage < max) {
        elems.buttonLeft.classList.remove('invalid');
        elems.buttonRight.classList.remove('invalid');
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
    if (width >= 1033) { return 3 }
    if (width < 1033 && width > 750) { return 2 }
    if (width <= 750) { return 1 }
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

function getModalWindowInfo(id) {

}

function updateCardResize() {
    if (elems.getCountCard() !== getMediaType()) {
        numberOfPage = Math.floor(numberOfPage / getMediaType()) || 1;
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
}

function showModalWindow() {
    elems.modalWindow.classList.add('open')
    elems.pseudoDiv.classList.add('active')
    document.querySelector('body').classList.add('stop')
    document.querySelector('.modal-window button.button-round').onclick = function () {
        closeModalWindow();
    }
    elems.modalWindow.scrollIntoView({ block: "center", behavior: "smooth" })
}
function closeModalWindow() {
    elems.modalWindow.classList.remove('open')
    elems.pseudoDiv.classList.remove('active')
    document.querySelector('body').classList.remove('stop')
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

