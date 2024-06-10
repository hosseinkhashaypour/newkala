// nav icons
const homeIcon = document.querySelector(".home-icon");
const userIcon = document.querySelector(".user-icon");
const cartIcon = document.querySelector(".cart-icon");
const categoryIcon = document.querySelector(".categories-icon");
categoryIcon.addEventListener('click' , ()=>{
    window.location.href = "category.html"
})
window.addEventListener('DOMContentLoaded', (event) => {
    if (window.location.href.includes("form.html")) {
        userIcon.src = "user2.png"
    }
})
homeIcon.addEventListener('click', () => {
    window.location.href = "index.html"
})



cartIcon.addEventListener('click', () => {
    window.location.href = "cart.html"
})


const emailInput = document.querySelector("#emailInput")
const passwordInput = document.querySelector("#passwordInput")

// save email to localstorage
const submitBtn = document.querySelector("button")
submitBtn.addEventListener('click', () => {
    localStorage.setItem("newkalaEmail", emailInput.value)
    localStorage.setItem("newkalaPwd", passwordInput.value)
    showNotification()
    window.location.href = "index.html"
})


function showNotification() {
    if (Notification.permission === "granted") {
        const options = {
            body: "ورود موفقیت آمیز بود"
        };
        const notification = new Notification("پیغام جدید از نیوکالا", options);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                const options = {
                    body: "ورود موفقیت آمیز بود"
                };
                const notification = new Notification("پیغام جدید از نیوکالا", options);
            }
        });
    }
}

// responsive nav
const homeNav = document.querySelector("#homeNav")
const formNav = document.querySelector("#formNav")
const cateNav = document.querySelector("#cateNav")
const cartNav = document.querySelector("#cartNav")
// شرط نویسی اگر در صفحه هوم بود
if (window.location.href.includes("form.html")) {
    formNav.style.borderBottom = "3px solid white"
}

if (localStorage.getItem("newkalaEmail") && localStorage.getItem("newkalaPwd")) {
    const formContainer = document.querySelector("#form-container")
    const userInfo = document.getElementById("userInfo")
    formContainer.style.display = "none"
    const userEmail = document.createElement("span")
    const goHome = document.createElement("button")
    goHome.textContent = "برگشت به صفحه اصلی"
    goHome.className = "goHomebtn"
    goHome.addEventListener('click', () => {
        window.location.href = "index.html"
    })
    userEmail.className = "emailSpan"
    userEmail.textContent = localStorage.getItem("newkalaEmail")
    userInfo.appendChild(userEmail)
    userInfo.appendChild(goHome)
    document.title = "نیوکالا"
} else if (!localStorage.getItem("newkalaEmail") && !localStorage.getItem("newkalaPwd")) {
    const formContainer = document.querySelector("#form-container")
    const userInfo = document.getElementById("userInfo")
    formContainer.style.display = "flex"
    const userEmail = document.createElement("span")
    const goHome = document.createElement("button")
    userEmail.style.display = "none"
    goHome.style.display = "none"
    userInfo.style.display = "none"
    document.title = "نیوکالا | ورود"
}