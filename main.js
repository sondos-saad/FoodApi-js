
//vars
let searchInputEle = document.querySelector('.search-input');
let searchBtnEle = document.querySelector('.search-btn');
let productEle = document.querySelector('.product');
let detailsEle = document.querySelector('.details');

//event
searchBtnEle.addEventListener('click', getRecipes);
productEle.addEventListener('click', getDetails);
detailsEle.addEventListener('click', closeDetails);

//functions
function getRecipes(){
    let valueInput = searchInputEle.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valueInput}`;
    fetch(apiUrl)
    .then((res) =>{
        if(res.ok){
            return res.json();
        }
    })
    .then((data)=>{
        displayRecipes(data)
    })
}
function getDetails(e){
    if(e.target.classList.contains('details-btn')){
        let id = e.target.getAttribute('date-id');
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(apiUrl)
        .then((res) =>{
            if(res.ok){
                return res.json();
            }
        })
        .then((data)=>{
            detailsRecipes(data)
        })
    }
}
function detailsRecipes(recipeItem){
    let item = recipeItem.meals[0];
    detailsEle.classList.remove('show-details');
    detailsEle.innerHTML="";
    detailsEle.innerHTML=`
        <i class="fas fa-times"></i>
        <h2>${item.strMeal}</h2>
        <p>Instructions:</p>
        <p>${item.strInstructions}</p>
        <a href="${item.strYoutube}">Watch Video</a>
    `
}

 function displayRecipes(recipes){
    productEle.innerHTML = "";
    if(recipes.meals == null){
         productEle.innerHTML = "No Data";
        return;
    }
     recipes.meals.forEach( (recipe) => {
         productEle.innerHTML += `
        <div class="card">
             <div class="card-img">
                 <img src="${recipe.strMealThumb}" alt="">
             </div>
             <div class="card-text">
                 <h2>${recipe.strMeal}</h2>
                 <a href="#" class="details-btn" date-id=${recipe.idMeal}>description</a>
             </div>
         </div>
        `
    });
 }
 function closeDetails(e){
    if(e.target.classList.contains('fa-times')){
        detailsEle.classList.add('show-details');
    } 
 }