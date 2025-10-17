let cart = [];

//load contents
document.addEventListener("DOMContentLoaded", () => {
  const dataContainer = document.getElementById("data-container");
  const userSelector = document.getElementById("selected-items");
  const apiUrl = "https://fakestoreapi.com/products";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          //creating basic div
          const mainElement = document.createElement("div");
          const itemElement = document.createElement("div");
          mainElement.classList.add("item-card");
          itemElement.classList.add("item-content");

          const originalContent = `<h3>${item?.title}</h3><span>Price: $${item?.price}</span>`;
          itemElement.innerHTML = originalContent;

          //creating image
          const imageShow = document.createElement("img");
          imageShow.setAttribute(`src`, `${item?.image}`);
          imageShow.setAttribute(`alt`, `No Image Found`);

          //creating button
          const itemAddCart = document.createElement("button");
          itemAddCart.setAttribute("type", "button");
          itemAddCart.addEventListener("click", () =>
            addItems(item, userSelector)
          );

          itemAddCart.textContent = "Add to Cart";

          itemElement.addEventListener("mouseover", () => {
            itemElement.innerHTML = `<p>${item.description}</p> <br><br> ${item.rating.rate}/5.0 ⭐ (${item.rating.count})`;
          });

          itemElement.addEventListener("mouseleave", () => {
            itemElement.innerHTML = originalContent;
            itemElement.appendChild(imageShow);
          });

          //Add to cart button will be inside of itemElement, else the button will go outside of the div tag
          itemElement.appendChild(imageShow);
          mainElement.appendChild(itemElement);
          mainElement.appendChild(itemAddCart);
          dataContainer.appendChild(mainElement);
        });
      } else {
        const itemElement = document.createElement("li");
        itemElement.textContent = `Title: ${data?.title}, Price: $ ${data?.price}`;
        dataContainer.appendChild(itemElement);
      }
    });
});

function addItems(item, userSelector) {
  //if any item exists in the cart, then a new header will be created
  const dataRetriever = document.getElementById("data-retriever");

  let displayItemBreak = document.querySelector(".selected-header");

  if (!displayItemBreak) {
    const displayItemBreak = document.createElement("h2");
    displayItemBreak.classList.add("selected-header");
    displayItemBreak.textContent = "Selected Items";
    dataRetriever.insertBefore(displayItemBreak, userSelector);
  }

  //finds whether the 'item' is in the list, returns boolean value
  const dataFind = cart.find((cartItem) => cartItem.id === item.id);

  if (dataFind) {
    //if found, it will increment by one
    dataFind.quantity += 1;
  } else {
    // else a new list item will be created
    cart.push({ ...item, quantity: 1 });
  }

  userSelector.innerHTML = ""; //emptying so that previous records wont come back

  cart.forEach((cartItem) => {
    const li = document.createElement("li");
    li.textContent = `Title: ${cartItem.title}, Quantity: ${cartItem.quantity}............`;

    const itemPrice = document.createElement("span");
    itemPrice.textContent = `$${(cartItem.price * cartItem.quantity).toFixed(
      2
    )}`;
    li.appendChild(itemPrice);

    userSelector.appendChild(li);
  });

  updatePrice();
}

function updatePrice() {
  let completeCalc = document.getElementById("summation");

  const { price, quantityCount } = cart.reduce(
    (acc, item) => {
      acc.price += item.price * item.quantity;
      acc.quantityCount += item.quantity;
      return acc;
    },
    { price: 0, quantityCount: 0 }
  );

  let quantityDiscountPrice = 0;
  if (quantityCount > 10) {
    quantityDiscountPrice = price * 0.1;
  }

  let priceDiscount = 0;
  if (price > 500) {
    priceDiscount = price * 0.05;
  }

  let finalPrice = price - quantityDiscountPrice - priceDiscount;

  completeCalc.innerHTML = "";
  const subTotal = document.createElement("h2");
  subTotal.innerHTML = `Subtotal: $${price.toFixed(2)}`;
  completeCalc.appendChild(subTotal);

  const quantityDiscount = document.createElement("h3");
  quantityDiscount.innerHTML = `Quantity Discount (applicable when items are greater than 10): $${quantityDiscountPrice.toFixed(
    2
  )}`;
  completeCalc.appendChild(quantityDiscount);

  const priceOverDiscount = document.createElement("h3");
  priceOverDiscount.innerHTML = `Price Discount when subtotal is over $500: $${priceDiscount.toFixed(
    2
  )}`;
  completeCalc.appendChild(priceOverDiscount);

  const finalPrintPrice = document.createElement("h1");
  finalPrintPrice.innerHTML = `Final Price: $${finalPrice.toFixed(2)}`;
  completeCalc.appendChild(finalPrintPrice);
}

function addToCart() {}
