////Burguer menu 
const navSlide = () => {
    ///Selectors
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    ///Burger menu
    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");

        //Animation links nav-bar
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLink 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        })
        burger.classList.toggle("toggle");
    })
}
//// Slider top
const topSlider = () => {

    //Selector
    const imgSection = document.querySelector('.section-image');
    const next = document.querySelector('.next');
    const previous = document.querySelector('.previous');
    ///Slider variables
    let img = ["url('Img/header.jpg')", "url('Img/sushizoom.jpg')"]
    let indexImg = 0;

    //Event listener
    next.addEventListener("click", move);
    previous.addEventListener("click", move);

    setInterval(() => {
        indexImg++;
        if (indexImg >= (img.length)) {
            indexImg = 0;
        }
        imgSection.style.animation = `sliderImg 1.4s ease-in-out none`;
        imgSection.addEventListener("animationend", () => {
            imgSection.style.animation = '';
            nextImg();

        })
    }, 7000);

    function nextImg() {
        imgSection.style.backgroundImage = img[indexImg];

    }

    function move(e) {
        let event = e.target;
        if (event.classList.contains("next")) {
            indexImg++;
            (indexImg >= img.length) ? indexImg = 0 : indexImg;
        } else {
            indexImg--;
            (indexImg < 0) ? indexImg = img.length - 1 : indexImg;

        }
        nextImg();

    }
}


////Menu options

const menuOptions = () => {
    //Selectors
    const mains = document.querySelector('.mains');
    const drinks = document.querySelector('.drinks');
    const desserts = document.querySelector('.desserts');
    const option = document.querySelector('.options');
    //Listeners

    option.addEventListener("click", (e) => {
        let selectedOption = e.target;
        if (selectedOption.classList.contains("option")) {
            if (selectedOption.textContent === 'Mains') {
                mains.classList.remove('hide');
                drinks.classList.add('hide');
                desserts.classList.add('hide');
            } else if (selectedOption.textContent === 'Drinks') {
                drinks.classList.remove('hide');
                mains.classList.add('hide');
                desserts.classList.add('hide');

            } else {
                desserts.classList.remove('hide');
                mains.classList.add('hide');
                drinks.classList.add('hide');

            }
        }
    })
}

///Counting numbers
const countingNumbers = () => {
    const fifthSection = document.querySelector('.fifth-section');
    const counters = document.querySelectorAll('.counter');
    const speed = 100;
    let time;
    const options = {
        threshold: 0

    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((each) => {
            if (each.isIntersecting) {
                counters.forEach((entry) => {
                    const counterNumber = entry.getAttribute('countto');
                    (counterNumber < 50) ? time = 50 : time = 30;
                    const update = setInterval(() => {
                        let actualNumber = +entry.innerText;
                        let increaseBy = counterNumber / speed;
                        (actualNumber < counterNumber) ?
                            entry.innerText = Math.ceil(actualNumber + increaseBy) :
                            clearInterval(update);
                    }, time);
                });
            }
        })
    }, options);


    observer.observe(fifthSection);

}








//// Main function


const main = () => {
    navSlide();
    if(screen.width >= 768) {
        topSlider();
    }
    
    menuOptions();
    countingNumbers();


}


main();