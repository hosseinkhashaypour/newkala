// nav icons
const homeIcon = document.querySelector(".home-icon");
const userIcon = document.querySelector(".user-icon");
const cartIcon = document.querySelector(".cart-icon");
const categoryIcon = document.querySelector(".category-icon");
window.addEventListener('DOMContentLoaded' , (event)=>{
    if(window.location.href.includes("form.html")){
        userIcon.src = "user2.png"
    }
})
homeIcon.addEventListener('click' , ()=>{
    window.location.href = "index.html"
})

categoryIcon.addEventListener('click' , ()=>{
    window.location.href = "category.html"
})

cartIcon.addEventListener('click' , ()=>{
    window.location.href = "cart.html"
})