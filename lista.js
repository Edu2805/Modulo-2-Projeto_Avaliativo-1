const productInput = document.querySelector("#product-input");
const insertButton = document.querySelector(".product-button");
const productList = document.querySelector(".products-list");
const priceInput = document.querySelector("#price-input");
const priceButton = document.querySelector(".price-button");
var totalValue = document.querySelector("p");

var productArray = [];
productObj = {
  productName: "",
  value: "",
};
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

//####################################################################################

function addProduct(event) {
  event.preventDefault();

  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  const checkBoxProduct = document.createElement("button");
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

    //productObj.productName = productName;
    // productArray.forEach(element => {
    //   element.productName = productName;
      
    // });
    // productArray.push(productObj);
    // addLocalProducts(productObj.productName);
    
    // console.log(productArray);

    productInput.value = "";
  }
}

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
    document
      .querySelector(".insert-price-container")
      .classList.add("show-price-area");
    const productParent = productItem.parentElement;
    productParent.classList.toggle("completed");

    //@@@@@@@@@@@@@@ TESTE @@@@@@@@@@@@@@@@
    const productNameOnclick = document.querySelector(".checked-product");
    productNameOnclick.addEventListener("click", teste);
    function teste() {
      var productDis = document.querySelector(".product-unit").value;
      console.log(productDis);
    }
    teste();
  }
}

//####################################################################################

function sendPrice() {
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

    //jogar dentro de um for? Usar Storeage?
    //testar dentro do remove, pensar em como deletar o item(index) certo na lista
    //verificar a soma...
    productObj.value = productPrice;
    productArray.push(productObj);
    addLocalProductsPrice(productObj.value);

    console.log(productArray);
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

// fazer um storeage para precos, verificar se é pra fazer em um método separado
//verificar, está dando null
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

function addLocalProducts(addProductLocal) {
  let addProducts;

  if (localStorage.getItem("addProducts") === null) {
    addProducts = [];
  } else {
    addProducts = JSON.parse(localStorage.getItem("addProducts"));
  }

  addProducts.push(addProductLocal);
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

  addProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const checkBoxProduct = document.createElement("button");
    checkBoxProduct.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkBoxProduct.classList.add("checked-product");
    productDiv.appendChild(checkBoxProduct);

    const removeProduct = document.createElement("button");
    removeProduct.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    removeProduct.classList.add("remove-product");
    productDiv.appendChild(removeProduct);

    const newProduct = document.createElement("li");
    newProduct.innerText = product;
    newProduct.classList.add("product-unit");

    productDiv.appendChild(newProduct);

    productList.appendChild(productDiv);
  });
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
