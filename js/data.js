import mobile from './data.json' assert{type: 'json'};

var count = 0;
var filteredMobileData = [...mobile];
let arr = JSON.parse(localStorage.getItem('wishlist-heart')) || []; 

//rendering mobile data
function displayMobileData(mobile) {
    count = 0;
    document.getElementById("tiles").innerHTML = '';
    for (let i = 0; i < mobile.length; i++) {

        let currentPrice = Math.round((mobile[i].original) - ((mobile[i].original) * ((mobile[i].discount) / 100)));

        const box = `
        <div class="cards class-flex">
        <div class="label-class">
        <div>${mobile[i]['new_label'] ? `<span class="new" >NEW</span>` : ``}</div>
        <div>${mobile[i]['forsale'] ? `<span class="sale"> SALE</span>` : ``}</div>
        </div>
        <i class="fa-sharp fa-regular fa-heart wishlist-icon"></i>
        <div class="mobile-content class-flex">
        <div class="images class-flex"><img class="class-flex" src= ${mobile[i].image} alt="${mobile[i].name}">
        </div>
       
        <div class="cart-view class-flex">
        <button class="add-cart"><a href="#">ADD TO CART</a></button>
        <button class="view"><a href="#">VIEW GALLERY</a></button>
        </div>
        <div class="information">
    
        <div class="name">
        <span>${mobile[i].name}</span>
        <span>(${mobile[i].color},${mobile[i].storage})</span>
        </div>
        <div class="ratings">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <span class="total-rating">${mobile[i].rating}</span>
    </div>
        <span class="currentprice">$${currentPrice}</span>
        <span class="originalprice">$${mobile[i]['original']}</span>
        <span class="offer">${mobile[i].discount}% off</span>
        <div class="colors">
        <div class="round-grey"></div>
        <div class="round-black"></div>
        <div class="round-yellow"></div>
        </div>
        </div>
        
        `
        document.getElementById('tiles').innerHTML += box;
        count += 1;
        filtering();



        // calling increment wishlist function
        let heart = document.getElementsByClassName('wishlist-icon');
        document.querySelector('.wish-in').innerText = arr.length || 0
        wishList(heart);

        //function to increment the wishlist
        function wishList(heart) {
            for (let j = 0; j < heart.length; j++) {
                heart[j].addEventListener('click', function () {
                
                    if (!this.classList.contains('change-color')) {
                        this.classList.add('change-color');
                        arr.push(`${mobile[j].id}`);
                        document.querySelector('.wish-in').innerText++;
                    }
                    else {
                        this.classList.remove('change-color');
                        const index = arr.indexOf(`${mobile[j].id}`);
                        arr.splice(index,1);
                        document.querySelector('.wish-in').innerText--;
                    }
                    localStorage.setItem('wishlist-heart', JSON.stringify(arr));
                });
            }

        }

        for(let k = 0; k < arr.length ; k++)
        {
            if(arr[k] == mobile[i].id)
            {
                heart[i].classList.add('change-color');
            }
        }
    }


    //function to display stars
    function starRating(stars) {
        for (let i = 0; i < mobile.length; i++) {
            let newStar = stars[i].children;
            for (let j = 0; j < (mobile[i].star_rating); j++) {
                newStar[j].style.color = 'red';
            }
        }
    }



    //function to increment the cart count
    function addCart(addToCart) {
        for (let i = 0; i < addToCart.length; i++) {
            addToCart[i].addEventListener('click', function () {
                document.querySelector('.cart-in').innerText++;
                localStorage.setItem('cart-counter', document.querySelector('.cart-in').innerText);
            });


        }

    }





    
    

    // calling display stars function
    let stars = document.getElementsByClassName('ratings');
    starRating(stars);


    // calling increment  cart count function
    let addToCart = document.getElementsByClassName('add-cart');
    document.querySelector('.cart-in').innerText = localStorage.getItem('cart-counter') || 0
    addCart(addToCart);






}




// let cv = document.getElementById('search');
// cv.addEventListener('click',function(){
// function searchBar(){
// let filter,input,ul,li,a;
// filter = document.getElementById('search');
// input = filter.value.toUpperCase();
// // ul = document.getElementsByTagName('fieldset');
//  //li = ul.getElementsByTagName('div');
// let searchData = mobile;
// let arr1 = [];
// for(let i=0;i < mobile.length;i++){
// //a = li[i].getElementsByTagName('input')[0];
// if(searchData[i]['Brand'].indexOf(input) > -1){
//     arr1.push(searchData[i]);
//     filteredMobileData = [...arr1];

// }
// }
// displayMobileData(arr1)
// }
// });


let z = document.getElementById('search');
z.addEventListener("keyup",()=>{search_function(z)})
function search_function(z){
    let v=[]
    let g=z.value;
    let l =mobile.length
    for(let h=0;h<l;h++){
        let n = mobile[h].Brand;
        if(n.toLowerCase().startsWith(g.toLowerCase())){
            v.push(mobile[h])
        }
    }
    displayMobileData(v);
}



const mobiles = ['Apple','Asus','Honor','Xiaomi','Sony','LG','Lenovo','Meizu'];



//display mobile data of selected brands
let checkBox = document.getElementsByClassName('brand_name')
for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].addEventListener('click', function () {
        let checkBoxArray = [];
        for (let k of checkBox) {
            if (k.checked) {
                checkBoxArray.push(k.value);
            }
        }
        if (checkBoxArray.length == 0) {

            displayMobileData(mobile);
        }
        else {
            document.getElementById("filter-clear").classList.add("red");
            checkBrandName(checkBoxArray);
        }
    });
}

function checkBrandName(checkBoxArray) {
    let brandData = mobile;
    let arr = [];
    for (let i = 0; i < mobile.length; i++) {

        for (let j = 0; j < checkBoxArray.length; j++) {

            if (brandData[i]['Brand'].includes(checkBoxArray[j]))
                arr.push(brandData[i]);

        }
    }
    filteredMobileData = [...arr];
    displayMobileData(arr);
}



//function to sort newest first 
function sortNewFirst() {
    this.classList.add('change-text');
    this.previousElementSibling.classList.remove('change-text');
    let a = this.previousElementSibling;
    a.previousElementSibling.classList.remove('change-text');
    let sortNew = filteredMobileData;
    let newFirst = sortNew.sort(function (new1, new2) {
        let newFirst1 = new1.new_label;
        let newFirst2 = new2.new_label;
        return newFirst2 - newFirst1;
    });

    filteredMobileData = [...newFirst];
    displayMobileData(newFirst);
}


//function to sort mobile data based on ratings 
function sortRatings() {
    this.classList.add('change-text');
    this.nextElementSibling.classList.remove('change-text');
    let a = this.nextElementSibling;
    a.nextElementSibling.classList.remove('change-text');
    let newRating = filteredMobileData;
    let sortRating = newRating.sort(function (rating1, rating2) {
        let lowRating = rating1.star_rating;
        let highRating = rating2.star_rating;
        return highRating - lowRating;
    });

    filteredMobileData = [...sortRating];
    displayMobileData(sortRating);
}






//function to sort mobile data based on price
function sortLowHigh() {
    this.classList.add('change-text');
    this.nextElementSibling.classList.remove('change-text');
    this.previousElementSibling.classList.remove('change-text');
    let newData = filteredMobileData;

    let filterData = newData.sort(function (highPrice, lowPrice) {

        let currentPrice1 = Math.round((highPrice.original) - ((highPrice.original) * ((highPrice.discount) / 100)));

        let currentPrice2 = Math.round((lowPrice.original) - ((lowPrice.original) * ((lowPrice.discount) / 100)));

        return currentPrice1 - currentPrice2;

    });

    filteredMobileData = [...filterData];
    displayMobileData(filterData);

}


//function to display Accordion
function displayAccordion() {
    this.classList.toggle('active');
    let child = this.nextElementSibling;
    if (child.style.display === 'block') {
        child.style.display = 'none';
    } else {
        child.style.display = 'block';
    }
};



//price-slider
$(function () {
    $('#slider-range').slider({
        range: true,
        min: 0,
        max: 300,
        values: [75, 270],
        slide: function (event, ui) {
            $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
            filterMobileByRange(ui.values[0], ui.values[1]);
            document.getElementById("filter-clear").classList.add("red");
        }

    });
    $('#amount').val('$' + $('#slider-range').slider('values', 0) +
        ' - $' + $('#slider-range').slider('values', 1));
});



//display count of tiles
function filtering() {
    if (count > 0) {
        document.getElementById('mobile-count').innerHTML = `Showing 1 - ${count} of ${count} results for 'Phone'`;
    }
    else {
        document.getElementById('mobile-count').innerHTML = `No results found`;
    }
}

//to display mobiles based on the values in price slider
function filterMobileByRange(minimum, maximum) {
    filteredMobileData = [...mobile];

    let arr = [];
    for (let i = 0; i < filteredMobileData.length; i++) {
        let priceAfterDiscount = Math.round((filteredMobileData[i].original) - ((filteredMobileData[i].original) * ((filteredMobileData[i].discount) / 100)));
        if (priceAfterDiscount >= minimum && priceAfterDiscount <= maximum) {
            arr.push(filteredMobileData[i]);
        }
        else {
            document.getElementById('mobile-count').innerHTML = `No Record found`;
        }
    }
    filteredMobileData = [...arr];
    displayMobileData(arr);
}



//funtion to clear all the checkboxes
function clearall() {
    for (let i = 0; i < clearAll.length; i++) {
        if (clearAll[i].checked) {
            clearAll[i].checked = false;
            document.getElementById("filter-clear").classList.remove("red");
            displayMobileData(mobile);
        }

    }
};




//calling clear all CheckBoxes function
let clearAll = document.getElementsByClassName('brand_name');
let clear = document.getElementById("filter-clear");
clear.addEventListener('click', clearall);




// calling accordion function
displayMobileData(mobile);
let acc = document.getElementsByClassName('accordion');
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', displayAccordion);
}


//calling sort new first function
let n = document.getElementById('new-first');
n.addEventListener("click", sortNewFirst);




//calling sort low to high function
let t = document.getElementById('price');
t.addEventListener("click", sortLowHigh);


//calling sort ratings function
let r = document.getElementById('relevant');
r.addEventListener("click", sortRatings);

