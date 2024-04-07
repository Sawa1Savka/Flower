const finalcart = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");
const payButton = document.querySelector(".pay-button");

let cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");

// Преобразование строковых значений price и quantity в числа
cartStorage.forEach((item) => {
  item.price = parseFloat(item.price);
  item.quantity = parseInt(item.quantity);
});

function updateCart() {
  finalcart.innerHTML = ""; // Очищаем содержимое корзины перед обновлением

  cartStorage.forEach((el, index) => {
    const { title, price, quantity } = el;
    const newCart = document.createElement("tr");
    const total = price * quantity; // Рассчитываем общую стоимость товара

    newCart.innerHTML = `
      <td class="product-title">${title}</td>
      <td class="product-price">${price}</td>
      <td class="product-quantity">
        <input type="number" min="1" value="${quantity}" data-index="${index}" onchange="updateQuantity(event)">
      </td>
      <td class="product-total">${total}</td>
      <td><button class="delete-to-cart" onclick="removeItem(${index})">Удалить элемент</button></td>
    `;

    finalcart.appendChild(newCart);
  });

  // Обновляем общую сумму
  totalAmount.innerText = calculateTotalSum();
}

function updateQuantity(event) {
  const index = event.target.dataset.index;
  const newQuantity = parseInt(event.target.value);

  if (!isNaN(newQuantity) && newQuantity > 0) {
    cartStorage[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cartStorage));
    updateCart();
  }
}

function removeItem(index) {
  cartStorage.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartStorage));
  updateCart();
}

// Установка количества по умолчанию равным 1
cartStorage.forEach((item) => {
  if (item.quantity === undefined) {
    item.quantity = 1;
  }
});

// Функция для расчета общей суммы цветов
function calculateTotalSum() {
  let totalSum = 0;

  cartStorage.forEach((item) => {
    const quantity = item.quantity;
    const price = item.price;
    const sum = quantity * price;
    totalSum += sum;
  });

  return totalSum;
}

// Обработчик кнопки оплаты
payButton.addEventListener("click", () => {
  const totalSum = calculateTotalSum();
  alert(`Общая сумма к оплате: ${totalSum} рублей`);
});

updateCart();