// Seletores
const productInput = document.querySelector("#product-input");
const insertButton = document.querySelector(".product-button");
const productList = document.querySelector(".products-list");
const priceInput = document.querySelector("#price-input");
const priceButton = document.querySelector(".price-button");

var totalValue = 0;

//Eventos
document.addEventListener("DOMContentLoaded", getProducts);
insertButton.addEventListener("click", addProduct);
productList.addEventListener("click", deleteProduct);
//priceButton.addEventListener("click", deleteProduct);

//Funções
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

    addLocalProducts(productInput.value);

    productList.appendChild(productDiv);

    productInput.value = "";
  }
}

function deleteProduct(event) {
  const productItem = event.target;

  if (productItem.classList[0] === "remove-product") {
    const productParent = productItem.parentElement;
    removeProductLocal(productParent);
    productParent.remove();
  }

  if (productItem.classList[0] === "checked-product") {
    //mostra popup digita preço
    document
      .querySelector(".insert-price-container")
      .classList.add("show-price-area");
    const productParent = productItem.parentElement;
    productParent.classList.toggle("completed");
 
    //primeiro digita, depois verifica...
    const productPrice = priceInput.value.trim();
    if(productPrice){
      //lógica de digitar o preço
      

      //após apertar o botão, se estiver vazio
      if (!productPrice) {
        //document.querySelector(".show-price-area").classList.add("insert-price-container");
        var emptyMessage = "O campo preço não pode estar vazio";
        var element = document.querySelector(".modal-empty-text");
        var message = document.querySelector(".modal-empty-text-message");
        element.classList.add("show-modal-empty-text");
        message.innerText = emptyMessage;
      } else {
        //lógica para atribuir preço ao produto e somar ao total...
      }
    }
    
    
  }
}

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

function hidenModalAdvice() {
  var element = document.querySelector(".modal-empty-text");
  element.classList.remove("show-modal-empty-text");
}

// function showPriceArea(){

//     var element = document.querySelector('.insert-price-container');
//     element.classList.add('.title-price');
//     element.classList.add('show-price-area');
//     // element.innerText =
// }

// function writeItAdviceEmptyText(text){
//     var element = "O nome do produto não pode estar vazio."
//     document.write(element);
// }
