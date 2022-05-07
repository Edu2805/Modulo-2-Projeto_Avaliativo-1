class Product {
  constructor() {
    this.id = 1;
    this.price = 0;
    this.arrayProducts = [];
    this.editProductPrice = null;
  }

  save() {
    let product = this.getItens();

    if (this.validationArea(product)) {
      this.addProduct(product);
      this.addProductLocalStoreage(product);
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
      checkBoxProduct.addEventListener("click", this.checkedProduc);
      checkBoxProduct.setAttribute("onclick", "product.editPrice(" + JSON.stringify(this.arrayProducts[i]) + ")");
      insertTdProductName.appendChild(checkBoxProduct);

      let removeProductLine = document.createElement("button");
      removeProductLine.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      removeProductLine.classList.add("remove-product");
      removeProductLine.setAttribute("onclick","product.removeProduct(" + this.arrayProducts[i].id + ")");
      insertTdProductName.appendChild(removeProductLine);
    }
  }

  getItens() {
    let productItem = {};

    productItem.id = this.id;

    productItem.price = this.price
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

  validationPriceArea(event) { }

  hidenModalAdvice() {
    var element = document.querySelector(".modal-empty-text");
    element.classList.remove("show-modal-empty-text");
  }

  removeProduct(index) {
    let tbody = document.getElementById("tbody");

    for (let i = 0; i < this.arrayProducts.length; i++) {
      if (this.arrayProducts[i].id === index) {
        this.arrayProducts.splice(i, 1);
        tbody.deleteRow(i);
      }
    }
  }

  editPrice(setPrice) {
    const inputPrice = document.querySelector(".price-button");
    document.querySelector(".insert-price-container").classList.add("show-price-area");

    for (let i = 0; i < document.querySelectorAll(".product-id").length; i++) {

      if (document.querySelectorAll(".product-id")[i].innerHTML === setPrice.id.toString()) {

        inputPrice.addEventListener("click", function () {

          //if (document.querySelectorAll(".product-id")[i].innerHTML == setPrice.id) {
            
            document.querySelectorAll(".product-price")[i].innerText = document.getElementById("price-input").value;

            setPrice.price = document.getElementById("price-input").value;
          //}

          document.querySelector(".insert-price-container").classList.remove("show-price-area");
          console.log(setPrice);
          
        })
      }
       
    }  
    
  }

  checkedProduc(event) {
    const productItem = event.target;

    if (productItem.classList[0] === "checked-product") {
      const productParent = productItem.parentElement;
      productParent.classList.toggle("completed");
    }
  }

  hidePriceArea(event) {
    // event.preventDefault();

    // console.log(event);
    // var productPrice = document.getElementById("price-input").value;
    // console.log(productPrice);
    //document.querySelector(".product-price").innerText = productPrice;
  }

  addProductLocalStoreage(addProductLocal){
    let addProducts;

    if (localStorage.getItem("addProducts") === null) {
      addProducts = [];
    } else {
      addProducts = JSON.parse(localStorage.getItem("addProducts"));
    }

    addProducts.push(addProductLocal);
    localStorage.setItem("addProducts", JSON.stringify(addProducts));
    }
}

var product = new Product();
