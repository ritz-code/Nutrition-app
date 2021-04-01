const mainNav = document.getElementById('main-nav');
const hamburgerMenu = document.getElementById('hamburger-menu');
const queryFood = document.getElementById('sentence');
const goBtn = document.getElementById('goBtn');
const nutriDataElem = document.getElementById('nutri-data');

const calories = document.getElementById('calories');
const divElem1 = document.getElementById('container1');
const divElem2 = document.getElementById('container2');
const divElem3 = document.getElementById('container3');
const divElem4 = document.getElementById('container4');
const divElem5 = document.getElementById('container5');
const divElem6 = document.getElementById('container6');

//event listener for button click
goBtn.addEventListener('click', getInfo);

//hamburger menu toggle
hamburgerMenu.addEventListener('click', function() {
    mainNav.classList.toggle('open');
});

//Fetch API data
async function getInfo() {
    const response = await fetch(`https://api.nutritionix.com/v1_1/search/${queryFood.value}?results=0:20&fields=item_name,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_sugars,nf_cholesterol,nf_sodium,nf_protein,,nf_iron_dv,nf_calcium_dv,nf_dietary_fiber,&appId=1507c08c&appKey=6b02d54a8c422b9013d0ef83c0064ad3`);
    const data = await response.json();
    const nutriData = data.hits[0].fields;
    setHTMLData(nutriData);
}


function setHTMLData(data){
    //clean the browser before display
    deleteDivFromStorage();

    //setting the calorie data in browser
    calories.innerHTML = data.nf_calories +" Calories" + " - " +data.item_name;

    //making nutri-data div visible
    nutriDataElem.classList.remove('hide');

    //adding div dynamically
    const div1 = document.createElement('div');
    div1.innerHTML = Math.round(data.nf_total_fat/.65) + "%";
    div1.className = "pink";
    div1.style.width = Math.round(data.nf_total_fat/.65) + "%";
    divElem1.appendChild(div1);

    const div2 = document.createElement('div');
    div2.innerHTML = Math.round(data.nf_total_carbohydrate/1.3) + "%";
    div2.className = "pink";
    div2.style.width = Math.round(data.nf_total_carbohydrate/1.3) + "%";
    divElem2.appendChild(div2);

    const div3 = document.createElement('div');
    div3.innerHTML = Math.round(data.nf_cholesterol/3) + "%";
    div3.className = "pink";
    div3.style.width = Math.round(data.nf_cholesterol/3) + "%";
    div3.style.marginBottom = 1 + "rem";
    divElem3.appendChild(div3);

    const div4 = document.createElement('div');
    if(!data.nv_iron_dv === null) {
        div4.innerHTML = data.nf_iron_dv + "%";
        div4.style.width = data.nf_iron_dv + "%";
    }
    else {
        div4.innerHTML = 0 + "%";
        div4.style.width = 0 + "%";
    }
    div4.className = "green";
    divElem4.appendChild(div4);

    const div5 = document.createElement('div');
    div5.innerHTML = Math.round(data.nf_protein/.5) + "%";
    div5.className = "green";
    div5.style.width = Math.round(data.nf_protein/.5) + "%";
    divElem5.appendChild(div5);

    const div6 = document.createElement('div');
    div6.innerHTML = Math.round(data.nf_dietary_fiber/.3) + "%";
    div6.className = "green";
    div6.style.width = Math.round(data.nf_dietary_fiber/.3) + "%";
    divElem6.appendChild(div6);
}

//clear the browser of old divs
function deleteDivFromStorage(){

    //if the old dynamically added div is still present, removeChild
    while(divElem1.firstChild){
        divElem1.removeChild(divElem1.firstChild);
    };
    while(divElem2.firstChild){
        divElem2.removeChild(divElem2.firstChild);
    };
    while(divElem3.firstChild){
        divElem3.removeChild(divElem3.firstChild);
    };
    while(divElem4.firstChild){
        divElem4.removeChild(divElem4.firstChild);
    };
    while(divElem5.firstChild){
        divElem5.removeChild(divElem5.firstChild);
    };
    while(divElem6.firstChild){
        divElem6.removeChild(divElem6.firstChild);
    };
}
