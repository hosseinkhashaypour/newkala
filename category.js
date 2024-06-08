"use strict"
// nav icons
const homeIcon = document.querySelector(".home-icon");
const userIcon = document.querySelector(".user-icon");
const cartIcon = document.querySelector(".cart-icon");
const categoryIcon = document.querySelector(".categories-icon");
homeIcon.addEventListener('click', () => {
    window.location.href = "index.html";
});
window.addEventListener("DOMContentLoaded", (event) => {
    if (window.location.href.includes("index.html")) {
        homeIcon.src = "home2.png";
    }
});
userIcon.addEventListener('click', () => {
    window.location.href = "form.html";
});
cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html"
})
categoryIcon.addEventListener('click' , ()=>{
    window.location.href = "category.html"
})

window.addEventListener("DOMContentLoaded" , (event)=>{
    if(window.location.href.includes("category.html")){
        categoryIcon.src = "categories2.png"
    }
})

// responsive nav
const homeNav = document.querySelector("#homeNav")
const formNav = document.querySelector("#formNav")
const cateNav = document.querySelector("#cateNav")
const cartNav = document.querySelector("#cartNav")
// شرط نویسی اگر در صفحه هوم بود
if (window.location.href.includes("category.html")) {
    cateNav.style.borderBottom = "3px solid white"
}