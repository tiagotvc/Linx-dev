let thumbnails = document.getElementsByClassName('thumbnail');
let slider = document.getElementById('slider');

let buttonRight = document.getElementById('slide-right');
let buttonLeft = document.getElementById('slide-left');
let recommendedURL = 'http://localhost:3007/api/recommendations'
let maxProducts = 22;
let mostPopular ;
let priceReduced ;




async function getRecommendedProducts(){
    try{
        const response = await fetch(`${recommendedURL}?maxProducts=${maxProducts}`)

        const data = await response.json();

        mostPopular = data.mostPopular;
        priceReduced = data.priceReduced;

        console.log(mostPopular);

    } catch (error){
        console.log(error)
    }
}

getRecommendedProducts();





buttonLeft.addEventListener('click', function(){
    slider.scrollLeft -= 125;
})

buttonRight.addEventListener('click', function(){
    slider.scrollLeft += 125;
})

const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
// alert(maxScrollLeft);
// alert("Left Scroll:" + slider.scrollLeft);

//AUTO PLAY THE SLIDER 
function autoPlay() {
    if (slider.scrollLeft > (maxScrollLeft - 1)) {
        slider.scrollLeft -= maxScrollLeft;
    } else {
        slider.scrollLeft += 1;
    }
}
let play = setInterval(autoPlay, 50);

// PAUSE THE SLIDE ON HOVER
for (var i=0; i < thumbnails.length; i++){

thumbnails[i].addEventListener('mouseover', function() {
    clearInterval(play);
});

thumbnails[i].addEventListener('mouseout', function() {
    return play = setInterval(autoPlay, 50);
});
}

var Usrdata = document.querySelector('.box');



document.getElementById('slider').innerHTML = mostPopular.map(popular => 
    `
        <div class="thumbnail">
            <img src=${popular.url} alt=""></img>
            <div class="product-details">
                <h2>${user.name}</h2>
                <div>Country: ${user.country}</div>
                <p> <span>${user.age}</span> ${user.place}</p>
            </div>
        </div>
    
    `
).join('')