window.onload = updateHeader();

window.addEventListener('scroll', function() {
    if(pageYOffset){
        document.querySelector('header').classList.add('header__fixed');
        document.querySelector('.pseudo-header').classList.add('header__fixed');
    }
    
    if(!pageYOffset){
        document.querySelector('header').classList.remove('header__fixed');
        document.querySelector('.pseudo-header').classList.remove('header__fixed');
    }
});

window.addEventListener('resize',updateHeader);

function updateHeader(){
    document.querySelector('header').style.width = document.querySelector('body').offsetWidth + 'px'
}
