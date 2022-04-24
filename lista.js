// Seletores
const productInput = document.querySelector("#product-input");
const insertButton = document.querySelector(".product-button");
const productList = document.querySelector(".products-list");

//Eventos
document.addEventListener("DOMContentLoaded", getProducts);
insertButton.addEventListener("click", addProduct);
productList.addEventListener("click", deleteProduct);

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

  if (productInput.value === "") {
      const adviseEmptyProduct = document.createElement("div");
      const adviseEmptyProductSpan = document.createElement("span");
      adviseEmptyProductSpan.innerHTML = '<i > TESTE</i>';
      adviseEmptyProductSpan.classList.add("adviseProduct");
      adviseEmptyProduct.appendChild(adviseEmptyProductSpan);

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
    const productParent = productItem.parentElement;
    productParent.classList.toggle("completed");
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
