class Product {
  constructor() {
    this.id = 1;
    this.price = 0;
    this.arrayProducts = [];
  }

  save() {
    let product = this.getItens();

    if (this.validationArea(product)) {
      this.addProduct(product);
    }

    this.listProducts();
  }

  addProduct(product) {
    this.arrayProducts.push(product);
    this.id++;
    this.price;
  }

  listProducts() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayProducts.length; i++) {
      let insertTr = tbody.insertRow();

      let insertTdProductId = insertTr.insertCell();
      let insertTdProductName = insertTr.insertCell();
      let insertTdProductPrice = insertTr.insertCell();

      insertTdProductId.innerText = this.arrayProducts[i].id;
      insertTdProductName.innerText = this.arrayProducts[i].name;
      insertTdProductPrice.innerText = this.arrayProducts[i].price;

      insertTdProductId.classList.add("product-id");
      insertTdProductPrice.classList.add("product-price");

      let checkBoxProduct = document.createElement("button");
      insertTdProductName.classList.add("product");
      checkBoxProduct.innerHTML = '<i class="fa-solid fa-check"></i>';
      checkBoxProduct.classList.add("checked-product");
      checkBoxProduct.setAttribute("onclick", "product.checkedProductLine("+ JSON.stringify(this.arrayProducts[i]) +")");
      insertTdProductName.appendChild(checkBoxProduct);

      let removeProductLine = document.createElement("button");
      removeProductLine.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      removeProductLine.classList.add("remove-product");
      removeProductLine.setAttribute("onclick", "product.removeProduct("+ this.arrayProducts[i].id +")");
      insertTdProductName.appendChild(removeProductLine);
    }
  }

  getItens() {
    let productItem = {};

    productItem.id = this.id;
    productItem.price = this.price;
    productItem.name = document.getElementById("product-name").value;
    return productItem;
  }

  validationArea(product) {
    const productInput = document.querySelector("#product-name");
    const productName = productInput.value.trim();

  if (!productName) {
    var emptyMessage = "O campo produto não pode estar vazio";
    var element = document.querySelector(".modal-empty-text");
    var message = document.querySelector(".modal-empty-text-message");
    element.classList.add("show-modal-empty-text");
    message.innerText = emptyMessage;

      return false;
    } else {
      return true;
    }
  }

  validationPriceArea(product) {

    const productInputPrice = document.querySelector("#product-name");
    const productPrice = productInputPrice.value.trim();

  if (!productPrice) {
    var emptyMessage = "O campo preço não pode estar vazio";
    var element = document.querySelector(".modal-empty-text");
    var message = document.querySelector(".modal-empty-text-message");
    element.classList.add("show-modal-empty-text");
    message.innerText = emptyMessage;

      return false;
    } else {
      return true;
    }
  }

  hidenModalAdvice() {
    var element = document.querySelector(".modal-empty-text");
    element.classList.remove("show-modal-empty-text");
  }

  showPriceArea(){

  }

  removeProduct(index) {
    
    let tbody = document.getElementById("tbody");

    for (let i = 0; i < this.arrayProducts.length; i++) {
      if(this.arrayProducts[i].id === index){
        this.arrayProducts.splice(i, 1);
        tbody.deleteRow(i);
      }
    }
  }

  checkedProductLine(index){
    var element = document.querySelector(".insert-price-container");
    const productDiv = document.createElement("div");
    element.classList.add("show-price-area");
    let product = this.getItens();
    
    for (let i = 0; i < this.arrayProducts.length; i++) {

      if(this.validationPriceArea(product.price)){
        
        var emptyMessage = "O campo preço não pode estar vazio";
        var element = document.querySelector(".modal-empty-text");
        var message = document.querySelector(".modal-empty-text-message");
        element.classList.add("show-modal-empty-text");
        message.innerText = emptyMessage;
        
      } else {
        if(this.arrayProducts[i].id === index){
        
          console.log(this.arrayProducts[i].name);
        }
      }
    }
  }
}

var product = new Product();
