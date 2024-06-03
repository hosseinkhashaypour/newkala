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

const initSwiper = async (searchText = '') => {
    const products = await myApis(searchText);
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = ''; // پاک کردن اسلایدهای قبلی
    products.forEach(product => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `
            <div class="all-products">
                <img class="product-image" src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price + "$"}</p>
                <button class="viewBtn">مشاهده کامل محصول</button>
                <br>
            </div>
        `;
        swiperWrapper.appendChild(slide);
    });
    new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
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
                <p>${product.price + "$"}</p>
            </div>
        `;
        offProductsDiv.insertAdjacentHTML("beforeend", productContent);
    });
};

// serach input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.trim();
    initSwiper(searchText);
});

// nav icons
const homeIcon = document.querySelector(".home-icon");
const userIcon = document.querySelector(".user-icon");
const cartIcon = document.querySelector(".cart-icon");
const categoryIcon = document.querySelector(".category-icon");
homeIcon.addEventListener('click', () => {
    window.location.href = "index.html";
});
window.addEventListener("DOMContentLoaded", (event) => {
    if (window.location.href.includes("index.html")) {
        homeIcon.src = "home2.png";
    }
});
userIcon.addEventListener('click', () => {
    if (!localStorage.getItem("newkalaEmail")) {
        window.location.href = "form.html";
    }
});

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
if(!localStorage.getItem("prokalaEmail")){
    allproducts.textContent = "ابتدا لاگین کنید"
}


initSwiper();
addOffproducts();
myApis()