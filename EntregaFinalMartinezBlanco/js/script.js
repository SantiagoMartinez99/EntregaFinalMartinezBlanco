// let items = [
//   {
//     id: 0,
//     name: "Yeezy Gap Hoodie",
//     price: 170,
//     image: "yeezygaphoodie.webp",
//     quantity: 1,
//   },
//   {
//     id: 1,
//     name: "Yeezy Gap Cap",
//     price: 75,
//     image: "yeezycap.jpeg",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: "Calabassas Pants",
//     price: 153,
//     image: "calabassaspants.webp",
//     quantity: 1,
//   },
// ];

let json; // Variable para almacenar el JSON obtenido del API

fetch("https://fakestoreapi.com/products?limit=5")
  .then((res) => res.json())
  .then((data) => {
    json = data; // Guarda el JSON en la variable json

    json.forEach((item, index) => {
      let card = document.createElement("div");
      card.classList.add("card");
      let html = `
        <img src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">Price: ${item.price}</p>
          <a class="btn btn-primary" onClick="addToCart(${index})">Add to Cart</a>
        </div>
      `;
      card.innerHTML = html;
      itemList.appendChild(card);
    });
  });

let shoppingCart = [];

const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);

function addToCart(index) {
  const itemToAdd = json[index]; // Obtén el elemento correspondiente al índice del JSON
  const updatedItem = { ...itemToAdd, quantity: 1 }; // Agrega la propiedad 'quantity' al elemento con valor inicial de 1
  shoppingCart.push(updatedItem);
  console.log(shoppingCart);
  showShoppingCart();
}

const itemList = document.querySelector(".container-items");

// json.forEach((item, index) => {
//   console.log("paso");
//   let card = document.createElement("div");
//   card.classList.add("card");
//   let html = `
//     <img src="${item.image}" class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">${item.title}</h5>
//       <p class="card-text">Price: ${item.price}</p>
//       <p class="card-text">Quantity: ${item.quantity}</p>
//       <a class="btn btn-primary" onClick="addToCart(${index})">Add to Cart</a>
//     </div>
//   `;
//   card.innerHTML = html;
//   itemList.appendChild(card);
// });

function removeItem(id) {
  const index = shoppingCart.findIndex((item) => item.id === id);
  if (index !== -1) {
    shoppingCart.splice(index, 1);
    showShoppingCart();
  }
}

function showShoppingCart(json) {
  let totalPrice = 0;
  if (shoppingCart.length == 0) {
    document.getElementById("count-cart-products").innerText = "";
    document.getElementById("total-cart-shop").innerHTML =
      "No tiene items en el carrito";
    document.getElementById("buyItems").hidden;
    document.getElementById("buyItems").hidden = true;
  } else {
    document.getElementById("buyItems").hidden = false;
  }
  const cartContainer = document.getElementById("cart-total hidden");

  cartContainer.innerHTML = "";

  shoppingCart.forEach((item) => {
    let itemToBuy = document.createElement("div");
    itemToBuy.classList.add("cart-shop-card");
    let html = `
      <img src="${item.image}" class="cart-img-top" alt="...">
      <div class="cart-card-body">
        <h5 class="cart-card-title">${item.title}</h5>
        <p class="cart-card-text">Price: ${item.price}</p>
        <button type="button" class="btn cart-btn-danger" onClick=removeItem(${item.id})>Remove</button>
        
      </div>
    `;
    itemToBuy.innerHTML = html;
    cartContainer.appendChild(itemToBuy);
  });
  for (let i = 0; i < shoppingCart.length; i++) {
    totalPrice += shoppingCart[i].price;
    document.getElementById("total-cart-shop").innerHTML =
      "Your total is:" + totalPrice;
    document.getElementById("count-cart-products").innerText = i + 1;
  }
}

btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

function buyItems() {
  Swal.fire("Congratulations!", "Succesfull Purchase!", "success");
  const cartContainer = document.getElementById("cart-total hidden");
  cartContainer.innerHTML = "Successfull Purchase";
  document.getElementById("buyItems").hidden = true;
}
