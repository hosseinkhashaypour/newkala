const loader = document.querySelector("#loader")
setTimeout(() => {
    loader.style.display = "none"
}, 2000);

const forms = document.querySelector('form');
forms.addEventListener('submit', (a) => {
    a.preventDefault();
});

// catch products
const myApis = async (searchText = '') => {
    try {
        let res = await fetch('https://fakestoreapi.com/products');
        let data = await res.json();
        data = data.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
        console.log(data);
        return data;
    } catch (error) {
        console.log("error found:", error);
    }
};

const initProducts = async (searchText = '') => {
    const products = await myApis(searchText);
    const productsWrapper = document.querySelector('.products-wrapper');
    productsWrapper.innerHTML = ''; // پاک کردن محصولات قبلی
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <div class="all-products">
                <img class="product-image" src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price + "$"}</p>
                <br>
            </div>
        `;
        productsWrapper.appendChild(productDiv);
    });
    const images = document.querySelectorAll('.product-image');
    images.forEach(image => {
        image.addEventListener('click', () => {
            if (!localStorage.getItem("newkalaEmail")) {
                Swal.fire({
                    icon: "error",
                    title: "به حساب خود وارد شوید",
                });
            }
        });
    });
    const Btns = document.querySelectorAll("button");
    Btns.forEach(Btn => {
        Btn.addEventListener('click', () => {
            if (!localStorage.getItem("newkalaEmail")) {
                Swal.fire({
                    icon: "error",
                    title: "به حساب خود وارد شوید",
                });
            }
        });
    });
};

// گرفتن 3 محصول از api
const addOffproducts = async () => {
    const products = await myApis();
    const offProductsDiv = document.querySelector("#off-products .off-products");
    offProductsDiv.innerHTML = ""; // پاک کردن محصولات قبلی
    const productsToAdd = products.slice(0, 3);
    productsToAdd.forEach(product => {
        const productContent = `
            <div class="off-product">
                <img class="off-images" src="${product.image}" alt="${product.title}">
            </div>
        `;
        offProductsDiv.insertAdjacentHTML("beforeend", productContent);
    });
};

// serach input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.trim();
    myApis(searchText)
});

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
const startMins = 10;
let time = startMins * 60; // اصلاح مقدار زمان
const countdownEle = document.querySelector("#off-products > h2");

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const mins = Math.floor(time / 60);
    let second = time % 60;

    second = second < 10 ? "0" + second : second;

    countdownEle.innerHTML = `${mins} : ${second}`;
    time--;
}

// show all products if logged in
const allproducts = document.querySelector("#all-products")
if (!localStorage.getItem("newkalaEmail") || localStorage.getItem("newkalaEmail")) {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            allproducts.innerHTML = ""; // پاک کردن محتوای قبلی
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'all-products-logged';

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.title;
                productImage.className = "all-images-logged"
                const productTitle = document.createElement('h3');
                productTitle.textContent = product.title;
                productTitle.className = "product-title"

                const productPrice = document.createElement('p');
                productPrice.textContent = `قیمت: ${product.price} تومان`;

                const addTocartBtn = document.createElement("button")
                addTocartBtn.textContent = "افزودن به سبد خرید"
                addTocartBtn.className = "addTocartBtn"
                // productInfo
                addTocartBtn.addEventListener('click', () => {
                    const productInfo = {
                        title: product.title,
                        price: product.price,
                        image: product.image
                    };
                    
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    cart.push(productInfo);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`${product.title} به سبد خرید افزوده شد.`);
                    if(!localStorage.getItem('newkalaEmail')){
                        Swal.fire({
                            icon: "error",
                            title: "خطا",
                            text: "شما وارد حساب کاربری نشده اید",
                            // footer: '<a href="#">Why do I have this issue?</a>'
                          });
                          localStorage.removeItem("cart")
                    }
                });

                productDiv.appendChild(productImage);
                productDiv.appendChild(productTitle);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(addTocartBtn);
                allproducts.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('خطا در دریافت محصولات:', error);
            allproducts.textContent = 'خطا در دریافت محصولات. لطفا دوباره تلاش کنید.';
        });
}

// responsive nav
const homeNav = document.querySelector("#homeNav")
const formNav = document.querySelector("#formNav")
const cateNav = document.querySelector("#cateNav")
const cartNav = document.querySelector("#cartNav")
// شرط نویسی اگر در صفحه هوم بود
if (window.location.href.includes("index.html")) {
    homeNav.style.borderBottom = "3px solid white"
}

initProducts();
addOffproducts();
