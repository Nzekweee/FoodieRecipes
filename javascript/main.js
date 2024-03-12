const openNavIcon =  document.querySelector(".open__nav-btn"),
closeNavIcon =  document.querySelector(".close__nav-btn"),
navItems = document.querySelectorAll(".nav__details"),
recipeLike = document.querySelectorAll(".recipe_like"),
recipeHeart = document.querySelectorAll(".recipe_like i"),
recipeSeekerRole =  document.querySelector(".form-role-seeker"),
chefRole =  document.querySelector(".form-role-chef"),
adminRole =  document.querySelector(".form-role-admin"),
viewPasswordIcon = document.querySelectorAll('.view-password'),
hidePasswordIcon = document.querySelectorAll('.hide-password'),
passwordInput = document.querySelectorAll('.password'),
searchInput = document.getElementById("searchInput"),
searchDropdown = document.getElementById("searchDropdown"),
viewFilters = document.querySelector(".view-filters"),
searchContainerBottom = document.querySelector(".search__container-bottom"),
customDropdowns = document.querySelectorAll(".custom-dropdown");




openNavIcon ? openNavIcon.addEventListener("click", () => {
     navItems.forEach((navItem)=>{
       navItem.style.display = "flex";
     })
     openNavIcon.classList.add("hidden")
     closeNavIcon.classList.remove("hidden")
}) : null;

closeNavIcon ? closeNavIcon.addEventListener("click", () =>{
    navItems.forEach((navItem)=>{
        navItem.style.display = "none";
      })
      openNavIcon.classList.remove("hidden")
      closeNavIcon.classList.add("hidden")
}): null;

//liking recipes
let likeBool = false
const likeRecipeFunc = ( recipeHeartIdx) =>{
  if (!recipeHeart) return
  likeBool = !likeBool; 
  let likeRecipe = likeBool; 
  let countLike = 0
 if (likeRecipe) {
  recipeHeart[recipeHeartIdx].style.color = '#FF6363'
  countLike =1
 } else {
  recipeHeart[recipeHeartIdx].style.color = '#DBE2E5'
  countLike = 0
 } 
}
if (recipeLike){
  recipeLike.forEach((icon, idx)=>{
      icon.addEventListener("click", () => likeRecipeFunc(idx))
    })
}


//password
// Toggle password visibility when view icon is clicked
if (viewPasswordIcon) {
  viewPasswordIcon.forEach((viewIcon, idx) => {
    viewIcon.addEventListener("click", () => {
      viewIcon.style.display = 'none';
      hidePasswordIcon[idx].style.display = 'block'
      passwordInput[idx].type = 'text';
    });
  });
}

// Toggle password visibility when hide icon is clicked
if (hidePasswordIcon) {
  hidePasswordIcon.forEach((hideIcon, idx) => {
    hideIcon.addEventListener("click", () => {
      hideIcon.style.display = 'none';
      viewPasswordIcon[idx].style.display = 'block'
      passwordInput[idx].type = 'password';
    });
  });
}



//Choosing Role on sign up
const selectRole = (num) =>{
   if (num === 0) {
     recipeSeekerRole.classList.add("role__cont__select")
     chefRole.classList.remove("role__cont__select")
     adminRole.classList.remove("role__cont__select")
   } 
   else if(num === 1){
      chefRole.classList.add("role__cont__select")
      recipeSeekerRole.classList.remove("role__cont__select")
      adminRole.classList.remove("role__cont__select")}
   else if (num === 2) {
      adminRole.classList.add("role__cont__select")
      recipeSeekerRole.classList.remove("role__cont__select")
      chefRole.classList.remove("role__cont__select")
    } else{
      null
    }
   }

recipeSeekerRole ? recipeSeekerRole.addEventListener("click",()=>selectRole(0) ) : null
chefRole ? chefRole.addEventListener("click",()=>selectRole(1) ) : null
adminRole ?adminRole.addEventListener("click",()=>selectRole(2) ) : null

// RECIPE PAGE
//search functionality
if(searchInput){
  searchInput.addEventListener("input", function() {
    // Simulate dropdown content dynamically based on search input
    const searchValue = this.value.toLowerCase();
    const dropdownItems = ["Result 1", "Result 2", "Result 3"]; // Example dropdown items
    const filteredItems = dropdownItems.filter(item => item.toLowerCase().includes(searchValue));
    
    // Clear previous dropdown content
    searchDropdown.innerHTML = "";
    
    // Populate dropdown with filtered items
    filteredItems.forEach(item => {
      const dropdownItem = document.createElement("a");
      dropdownItem.textContent = item;
      dropdownItem.href = "#"; // Add functionality if needed
      searchDropdown.appendChild(dropdownItem);
    });
    
    // Show dropdown
    searchDropdown.style.display = filteredItems.length > 0 ? "block" : "none";
  });
  
  // Hide dropdown when clicking outside of it
  document.addEventListener("click", (event) => {
    if (!event.target.matches("#searchInput")) {
      searchDropdown.style.display = "none";
    }
  });
}

// filter functionality
let viewFiltersBool = false
const viewFiltersFunc =(element)=>{
 
 viewFiltersBool = !viewFiltersBool
 let viewFiltersDiv = viewFiltersBool; 
 if(viewFiltersDiv){
   element.classList.add('view-filters-clicked') 
 } else {
   element.classList.remove('view-filters-clicked') 
 }
}
if(viewFilters){
  viewFilters.addEventListener("click", ()=> {
    viewFiltersFunc(viewFilters)
    searchContainerBottom.style.display = searchContainerBottom.style.display === "flex" ? "none" : "flex";
  })
 
}



//custom drop down
customDropdowns.forEach((customDropdown, index) => {
  const customDropdownBtn = customDropdown.querySelector(".custom-dropdown-toggle");
  const customDropdownContent = customDropdown.querySelector(".custom-dropdown-content");

  // Populate dropdown with dynamic values
  const dynamicValues = [`Option 1 - ${index + 1}`, `Option 2 - ${index + 1}`, `Option 3 - ${index + 1}`]; // Example dynamic values
  dynamicValues.forEach(value => {
    const dropdownItem = document.createElement("div");
    dropdownItem.textContent = value;
    dropdownItem.classList.add("dropdown-item");
    dropdownItem.addEventListener("click", () => {
      customDropdownBtn.textContent = value; // Update button text when option is clicked
      closeDropdown(customDropdownContent); // Close dropdown after selecting an option
    });
    customDropdownContent.appendChild(dropdownItem);
  });

  // Show/hide dropdown when the button is clicked
  customDropdownBtn.addEventListener("click", () => {
    customDropdownContent.style.display = customDropdownContent.style.display === "block" ? "none" : "block";
    viewFiltersFunc(customDropdownBtn)
  });

  // Close dropdown when clicking outside of it
  document.addEventListener("click", event => {
    if (!event.target.matches(".custom-dropdown-toggle") && !event.target.matches(".dropdown-item")) {
      closeDropdown(customDropdownContent);
    }
  });
});

function closeDropdown(customDropdownContent) {
  customDropdownContent.style.display = "none";
}


//RECIPE CATEGORIES AND RECIPE DISPLAY
import { recipeCategories } from "./constants.js";
const generalCategoriesDisplay = document.querySelector('.recipe-categories-display');

let categoryDivs = '';

recipeCategories.forEach((category) => {
  // Generate HTML for the category
  let categoryDiv = `
    <section class="recipe-category-display">
      <div class="flex-row cat-item">
        <div>
          <img src="${category.categoryImage}" alt="${category.categoryName}">
        </div>
        <span>${category.categoryName}</span>
      </div>
      <section class="recipe-details-section category__recipes space-between"">
  `;

  category.recipeDetails.forEach((recipe, idx) => {
    // Generate HTML for each recipe
    let recipeDet = `
      <div class="trending__recipe flex-column">
        <div class="recipe_like  flex-row div-center recipe_like-clicked"><i class="fa-solid fa-heart recipe-heart" ></i></div>
        <div class="trending__recipe-imagecont">
          <img src="${recipe.recipeImg}" alt="recipe-img">
        </div>
        <span class="recipe-title">${recipe.recipetitle}</span>
        <div class="flex-row recipe-details">
          <div class="flex-row div-center">
            <img src="assets/Timer.svg" alt="timer">
            <span class="recipe-time">${recipe.recipeTime}</span>
          </div>
          <div class="flex-row div-center">
            <img src="assets/ForkKnife.svg" alt="timer">
            <span class="recipe-category">${recipe.category}</span>
          </div>
        </div>
        <a href="${recipe.recipeLink}" class="view-recipe">View Recipe</a>
      </div>
    `;
 
    categoryDiv += recipeDet;
  });
  categoryDiv += `</section>`;
  categoryDiv += `<div class="view-more-recipe-btn flex-row div-center"><a href="category-post.html">View More Recipes</a></div>`;
  categoryDiv += `</section>`;
  categoryDivs += categoryDiv;

});


if(generalCategoriesDisplay){
  generalCategoriesDisplay.innerHTML = categoryDivs;
}

document.addEventListener('click', function(event) {
  if (event.target.matches('.recipe_like')) {
    const likeHeart = event.target.children[0]; 
    let likeBool = likeHeart.style.color === 'rgb(255, 99, 99)'; 

    likeHeart.style.color = likeBool ? '#DBE2E5' : '#FF6363'; 
    // Perform additional actions based on like state
    // For example, update count or send a request to the server
  }
});



// rating system
const rateRecipeBtn = document.querySelector('.rate-recipe-btn');
const ratingContainer = document.querySelector('.rating-container');

// Show rating container on button click
rateRecipeBtn.addEventListener('click', () => {
  ratingContainer.style.display = 'block';
});

// Create stars
for (let i = 1; i <= 5; i++) {
  const star = document.createElement('span');
  star.classList.add('star', 'fa', 'fa-star', 'fa-2x');
  star.setAttribute('data-rating', i); // Set data attribute for rating value
  ratingContainer.appendChild(star);
}

// Rate recipe function using event delegation
ratingContainer.addEventListener('click', (event) => {
  const clickedStar = event.target;
  if (clickedStar.classList.contains('star')) {
    const rating = parseInt(clickedStar.getAttribute('data-rating'));
    
    // Fill stars up to the clicked star
    const stars = ratingContainer.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('fa-solid');
      } else {
        star.classList.remove('fa-solid');
      }
    });
    
    // You can also return the rating or perform further actions with it
    return rating;
  }
});

