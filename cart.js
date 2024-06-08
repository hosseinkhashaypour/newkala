"use strict";

const homeNav = document.querySelector("#homeNav")
const formNav = document.querySelector("#formNav")
const cateNav = document.querySelector("#cateNav")
const cartNav = document.querySelector("#cartNav")
// شرط نویسی اگر در صفحه هوم بود
if (window.location.href.includes("cart.html")) {
    cartNav.style.borderBottom = "3px solid white"
}

// nav icons
const homeIcon = document.querySelector(".home-icon");
const userIcon = document.querySelector(".user-icon");
const cartIcon = document.querySelector(".cart-icon");
const categoryIcon = document.querySelector(".category-icon");
homeIcon.addEventListener('click', () => {
    window.location.href = "index.html";
});
window.addEventListener("DOMContentLoaded", (event) => {
    if (window.location.href.includes("cart.html")) {
        cartIcon.src = "cart2.png";
    }
});
userIcon.addEventListener('click', () => {

    window.location.href = "form.html";
});


// produtcs that they are saved in localstorage
const produtcsSavedDiv = document.querySelector("#cartProducts")
let produtcs = localStorage.getItem("cart")
console.log(produtcs);
if (produtcs) {
    produtcs = JSON.parse(produtcs)
}

produtcs.forEach(product => {
    const produtsDiv = document.createElement("div")
    produtsDiv.className = "savedProducts"

    produtsDiv.innerHTML = `
    <img src = "${product.image}" class = "saved-image">
    <br>
    <h2 class = "title">${product.title}</h2>
    <p2 class = "price">${product.price}</p2>
    `
    produtcsSavedDiv.appendChild(produtsDiv)

})

if (localStorage.getItem("cart")) {
    const saveBtnHtml = document.getElementById("buyBtn")
    const buyBtn = document.createElement("button")
    buyBtn.className = "buyButton"
    buyBtn.textContent = "نهایی کردن خرید"
    buyBtn.addEventListener('click', () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "خرید شما نهایی شد",
            showConfirmButton: false,
            timer: 1500
        });
        localStorage.removeItem("cart")
        location.reload()
    })
    saveBtnHtml.appendChild(buyBtn)
}