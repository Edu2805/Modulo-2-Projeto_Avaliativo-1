const productInput = document.querySelector("#product-input");
const insertButton = document.querySelector(".product-button");
const productList = document.querySelector(".products-list");
const priceInput = document.querySelector("#price-input");
const priceButton = document.querySelector(".price-button");
const optionsList = document.querySelector(".options-list");
const darkModeButton = document.querySelector(".dark-mode-button");
const body = document.querySelector("body");
const totalList = document.querySelector(".total-list");
var totalValue = document.querySelector("p");

//####################################################################################

var initialValue = parseFloat(0);
totalValue.innerText = "R$ " + initialValue.toFixed(2);
var totalValueList = 0;
var totalFinalValueList = 0;

//####################################################################################

document.addEventListener("DOMContentLoaded", getProducts);
insertButton.addEventListener("click", addProduct);
productList.addEventListener("click", productInteration);
priceButton.addEventListener("click", sendPrice);
priceInput.addEventListener("click", hidenModalAdvice);
darkModeButton.addEventListener("click", darkMode);

//####################################################################################

function addProduct(event) {
  event.preventDefault();

  const productDiv = document.createElement("div");

  const checkBoxProduct = document.createElement("button");
  productDiv.classList.add("product");
  checkBoxProduct.innerHTML = '<i class="fa-solid fa-check"></i>';
  checkBoxProduct.classList.add("checked-product");
  productDiv.appendChild(checkBoxProduct);

  const removeProduct = document.createElement("button");
  removeProduct.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  removeProduct.classList.add("remove-product");
  productDiv.appendChild(removeProduct);

  const productName = productInput.value.trim();

  if (!productName) {
    var emptyMessage = "O campo produto não pode estar vazio";
    var element = document.querySelector(".modal-empty-text");
    var message = document.querySelector(".modal-empty-text-message");
    element.classList.add("show-modal-empty-text");
    message.innerText = emptyMessage;
  } else {
    const newProduct = document.createElement("li");
    newProduct.innerText = productInput.value;
    newProduct.classList.add("product-unit");

    productDiv.appendChild(newProduct);
    productList.appendChild(productDiv);
    addLocalProducts(productName, priceInput);

    productInput.value = "";
  }
}

function filterProducts() {}

//####################################################################################

function productInteration(event) {
  const productItem = event.target;

  if (productItem.classList[0] === "remove-product") {
    const productParent = productItem.parentElement;
    removeProductLocal(productParent);
    removeProductLocalPrice(productParent);
    productParent.remove();
    const subtractionButton = document.querySelector(".remove-product");
    subtractionButton.addEventListener("click", subtractTotal);
    subtractTotal();
  }
  if (productItem.classList[0] === "checked-product") {
    document.querySelector(".insert-price-container").classList.add("show-price-area");
    const productParent = productItem.parentElement;
    productParent.classList.toggle("completed");
  }
}

//####################################################################################

function sendPrice(event) {
  event.preventDefault();
  const productPrice = priceInput.value.trim();

  if (!productPrice) {
    var emptyMessage = "O campo preço não pode estar vazio";
    var element = document.querySelector(".modal-empty-text");
    var message = document.querySelector(".modal-empty-text-message");
    element.classList.add("show-modal-empty-text");
    message.innerText = emptyMessage;
  } else {
    document
      .querySelector(".insert-price-container")
      .classList.remove("show-price-area");
    var subResult = parseFloat(totalValueList) + parseFloat(productPrice);
    totalFinalValueList += subResult;
    document.querySelector("p").innerText =
      "R$ " + totalFinalValueList.toFixed(2);
  }
}

//####################################################################################

//Criar array de objetos de produtos
function subtractTotal() {
  const productPrice = priceInput.value.trim();

  var subResult = parseFloat(totalFinalValueList) - parseFloat(productPrice);

  document.querySelector("p").innerText = "R$ " + subResult.toFixed(2);
  totalFinalValueList = 0;
}

//####################################################################################

function addLocalProductsPrice(addProductPriceLocal) {
  let addProductsPrice;

  if (localStorage.getItem("addProductsPrice") === null) {
    addProductsPrice = [];
  } else {
    addProductsPrice = JSON.parse(localStorage.getItem("addProductsPrice"));
  }

  addProductsPrice.push(addProductPriceLocal);
  localStorage.setItem("addProductsPrice", JSON.stringify(addProductsPrice));
}

//####################################################################################

function addLocalProducts(addProductLocal, addProductLocalPrice) {
  let addProducts;
  addProductLocalPrice = 0.00;

  if (localStorage.getItem("addProducts") === null) {
    addProducts = [];
  } else {
    addProducts = JSON.parse(localStorage.getItem("addProducts"));
  }

  addProducts.push(addProductLocal, addProductLocalPrice);
  localStorage.setItem("addProducts", JSON.stringify(addProducts));
}

//####################################################################################

function getProducts() {
  let addProducts;

  if (localStorage.getItem("addProducts") === null) {
    addProducts = [];
  } else {
    addProducts = JSON.parse(localStorage.getItem("addProducts"));
  }
}

//####################################################################################

function removeProductLocalPrice(product) {
  let addProductsPrice;

  if (localStorage.getItem("addProductsPrice") === null) {
    addProductsPrice = [];
  } else {
    addProductsPrice = JSON.parse(localStorage.getItem("addProductsPrice"));
  }

  const productIndex = product.children[0].innerText;

  addProductsPrice.splice(addProductsPrice.indexOf(productIndex), 1);

  localStorage.setItem("addProductsPrice", JSON.stringify(addProductsPrice));
}

function removeProductLocal(product) {
  let addProducts;

  if (localStorage.getItem("addProducts") === null) {
    addProducts = [];
  } else {
    addProducts = JSON.parse(localStorage.getItem("addProducts"));
  }

  const productIndex = product.children[0].innerText;

  addProducts.splice(addProducts.indexOf(productIndex), 1);

  localStorage.setItem("addProducts", JSON.stringify(addProducts));
}

//####################################################################################

function hidenModalAdvice() {
  var element = document.querySelector(".modal-empty-text");
  element.classList.remove("show-modal-empty-text");
}

function darkMode(){
  body.classList.toggle("dark-mode-body");
  totalList.classList.toggle("total-list-dark");
  productList.classList.toggle("products-list-dark");
  darkModeButton.classList.toggle("dark-mode-button-white");
}