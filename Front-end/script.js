let thumbnails = document.getElementsByClassName('thumbnail');
let slider = document.getElementById('slider');
let sliders = document.getElementById('sliders');

let buttonRight = document.getElementById('slide-right');
let buttonLeft = document.getElementById('slide-left');
let OtherButtonRight = document.getElementById('slider-right');
let OtherButtonLeft = document.getElementById('slider-left');
let recommendedURL = 'http://localhost:3007/api/recommendations'
let maxProducts = 30;
var mostPopular = [];
var priceReduced = []
let i = 1;


async function getRecommendedProducts(){
    try{
        const response = await fetch(`${recommendedURL}?maxProducts=${maxProducts}`)

        const data = await response.json();

        Promise.all(data.mostPopular.map((popular)=>{
            mostPopular.push(popular)
        }))

        Promise.all(data.priceReduced.map((reduced)=>{
            priceReduced.push(reduced)
        }))

      


        document.getElementById('slider').innerHTML = mostPopular.map(populares => 
            `
                <div class="thumbnail">
                    <div class="number">${i++}°</div>
                    <img src=${populares.images.default} alt=""></img>
                    <div class="product-details">
                        <h2>${populares.name}</h2>
                        <h3>${populares.oldPrice}</h3>
                        <h4>Por:<span class="price"> R$ ${populares.price}</span></h4>
                        <p> <span>${populares.installment.count}x </span> R$ ${populares.installment.price}</p>
                    </div>
                </div>
            
            `
        ).join('')

        document.getElementById('sliders').innerHTML = priceReduced.map(populares => 
            
            `
                <div class="thumbnail">
                    <div class="number">- ${((populares.oldPrice - populares.price)*100/(populares.oldPrice)).toFixed()}%</div>
                    <img src=${populares.images.default} alt=""></img>
                    <div class="product-details">
                        <h2>${populares.name}</h2>
                        <h3>${populares.oldPrice}</h3>
                        <h4>Por:<span class="price"> R$ ${populares.price}</span></h4>
                        <p> <span>${populares.installment.count}x </span> R$ ${populares.installment.price}</p>
                    </div>
                </div>
            
            `
        ).join('')

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

OtherButtonLeft.addEventListener('click', function(){
    sliders.scrollLeft -= 125;
})

OtherButtonRight.addEventListener('click', function(){
    sliders.scrollLeft += 125;
})

const maxScrollLeft = slider.scrollWidth - slider.clientWidth;


var Usrdata = document.querySelector('.box');




