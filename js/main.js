let scrollingUp = document.querySelector(".scrolling-up");
window.onscroll = function () {
  if (window.scrollY >= 400) scrollingUp.classList.add("show");
  else scrollingUp.classList.remove("show");
};
scrollingUp.onclick = function () {
  window.scrollTo(0, 0);
};

let barIcon = document.querySelector(".bar-icon");
let closeIcon = document.querySelector(".close-icon");
let navBar = document.querySelector(".navbar");
barIcon.onclick = function () {
  navBar.classList.add("open");
  document.body.style.overflowY = "hidden";
  closeIcon.style.display = "block";
  closeIcon.classList.add("show");
};
closeIcon.onclick = function () {
  navBar.classList.remove("open");
  document.body.style.overflowY = "visible";
  closeIcon.classList.remove("show");
  closeIcon.style.display = "none";
};
document.querySelector(".nav-overlay").onclick = function () {
  if (navBar.classList.contains("open")) {
    navBar.classList.remove("open");
    document.body.style.overflowY = "visible";
    closeIcon.classList.remove("show");
    closeIcon.style.display = "none";
  }
};

let productsArray = JSON.parse(localStorage.getItem("products")) || [];
let carts = document.querySelectorAll("a[href='cart.html']");
let cartSpans = document.querySelectorAll("a[href='cart.html'] span");
let cartAdd = document.querySelectorAll(".cart-add");

if (localStorage.getItem("itemsLength")) {
  cartSpans.forEach((cartSpan) => {
    cartSpan.style.display = "grid";
    cartSpan.innerHTML = localStorage.getItem("itemsLength");
    productsArray.push;
  });
}

cartAdd.forEach((el) => {
  el.addEventListener("click", function () {
    this.innerHTML = `<span class="loading"></span>`;
    this.classList.add("clicked");
    setTimeout(() => {
      this.classList.remove("clicked");
      this.innerHTML = "";
      cartSpans.forEach((cartSpan) => {
        cartSpan.style.display = "grid";
        if (cartSpan.innerHTML === "") {
          cartSpan.innerHTML = 1;
        } else cartSpan.innerHTML = +cartSpan.innerHTML + 1;
        localStorage.setItem("itemsLength", cartSpan.innerHTML);
      });
      let productObj = storeProduct(el.parentNode.children[0].children);
      productsArray.push(productObj);
      localStorage.setItem("products", JSON.stringify(productsArray));
    }, 1200);
  });
});

let visitProduct = document.querySelector(".go-product");

document.addEventListener("click", (e) => {
  let obj = {};
  if (e.target.classList.contains("go-product")) {
    obj = storeProduct(e.target.parentNode.children[0].children);

    localStorage.setItem("product-details", JSON.stringify(obj));

    setTimeout(() => {
      location.href = `${location.protocol}//${location.host}/product.html`;
    }, 100);
  }
});

function storeProduct(productChildren) {
  let productObj = {};
  [...productChildren].forEach((child) => {
    if (child.getAttribute("src")) productObj["src"] = child.src;
    if (child.tagName === "H4") productObj["title"] = child.textContent.trim();
    if (child.className === "price" && child.firstElementChild)
      productObj["price"] = child.children[1].textContent.trim();
    if (child.className === "price" && !child.firstElementChild)
      productObj["price"] = child.textContent.trim();
  });
  productObj.size = "L";
  productObj.amount = 1;

  return productObj;
}

let currentSlide = 1;
let shownProducts = 8;
let products = document.querySelectorAll(".product-and-cart");
let range = products.length / shownProducts;
range = range === 1 ? parseInt(range - 1) : parseInt(range);
let slidesCon = document.querySelector(".shop-products .products-slider");

if (location.href === `${location.protocol}//${location.host}/shop.html`) {
  for (let i = 0; i < range + 1; i++) {
    slidesCon.innerHTML += `<span class="slide-btn">${i + 1}</span>`;
    document.querySelector(".slide-btn").classList.add("active");
    if (i === range) {
      slidesCon.innerHTML += `<span class="slide-right"><i class="fa-sharp fa-solid fa-right"></i></span>`;
    }
  }
}
let sliderSpans = document.querySelectorAll(".products-slider .slide-btn");
let rightSlide = document.querySelector(".slide-right");

if (location.href === `${location.protocol}//${location.host}/shop.html`) {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("slide-btn")) {
      sliderSpans.forEach((span, index) => {
        if (span === e.target && index !== sliderSpans.length - 1) {
          rightSlide.classList.remove("stop-clicking");
        } else if (span === e.target && index === sliderSpans.length - 1) {
          rightSlide.classList.add("stop-clicking");
        }
        span.classList.remove("active");
        if (span === e.target) {
          currentSlide = index + 1;
          changingProducts();
        }
      });
      e.target.classList.add("active");
    }
  });

  if (sliderSpans.length === 1) {
    rightSlide.classList.add("stop-clicking");
  }
  rightSlide.onclick = function () {
    let curr = -1;
    this.classList.add("clicked");
    setTimeout(() => {
      this.classList.remove("clicked");
    }, 400);
    sliderSpans.forEach((span, index) => {
      if (curr === sliderSpans.length - 1) {
        rightSlide.classList.add("stop-clicking");
      } else rightSlide.classList.remove("stop-clicking");

      if (span.classList.contains("active")) {
        span.classList.remove("active");
        curr = index + 1;
      }
      if (curr === index) {
        span.classList.add("active");
      }
    });
    currentSlide++;
    changingProducts();
  };

  changingProducts();
}

function changingProducts() {
  let products = document.querySelectorAll(".product-and-cart");
  for (let i = currentSlide; i <= sliderSpans.length; i++) {
    if (i === currentSlide) {
      products.forEach((product, index) => {
        if (
          index + 1 <= i * shownProducts &&
          index + 1 > (i - 1) * shownProducts
        ) {
          product.style.display = "initial";
          setTimeout(() => {
            product.classList.add("show");
            product.classList.remove("hide");
          }, 100);
        } else {
          product.style.display = "none";
          product.classList.add("hide");
          product.classList.remove("show");
        }
      });
    }
  }
  window.scrollTo({
    top: 235,
  });
}
