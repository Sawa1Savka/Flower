const cards = document.querySelectorAll(".product");

cards.forEach((card) => {
  const addToCartBtn = card.querySelector(".add-to-cart");
  const title = card.querySelector(".product-title").innerText;
  const price = card.querySelector(".product-price").innerText;

  addToCartBtn.addEventListener("click", () => {
    // Создание модального окна
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // Создание содержимого модального окна
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Дублирование элемента в модальное окно
    const duplicatedCard = card.cloneNode(true);
    duplicatedCard.querySelector(".add-to-cart").remove(); // Удаление кнопки "Добавить в корзину"
    modalContent.appendChild(duplicatedCard);

    // Создание поля для выбора количества
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.classList.add("quantity");
    quantityInput.value = 1;
    modalContent.appendChild(quantityInput);

    // Создание кнопок "+" и "-"
    const increaseBtn = document.createElement("button");
    increaseBtn.innerText = "+";
    increaseBtn.addEventListener("click", () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    const decreaseBtn = document.createElement("button");
    decreaseBtn.innerText = "-";
    decreaseBtn.addEventListener("click", () => {
      if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });

    // Добавление кнопок "+" и "-" в контейнер
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");
    inputContainer.innerText = "Количество: ";
    inputContainer.appendChild(decreaseBtn);
    inputContainer.appendChild(quantityInput);
    inputContainer.appendChild(increaseBtn);
    modalContent.appendChild(inputContainer);

    // Создание кнопки "Добавить в корзину" в модальном окне
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    const addToCartModalBtn = document.createElement("button");
    addToCartModalBtn.innerText = "Добавить в корзину";
    addToCartModalBtn.addEventListener("click", () => {
      // Действия при добавлении в корзину
      const cartStorage = localStorage.getItem("cart") || "[]";
      const cart = JSON.parse(cartStorage);
      const item = { title, price, quantity: +quantityInput.value };
      localStorage.setItem("cart", JSON.stringify([...cart, item]));

      // Закрытие модального окна
      modal.remove();

      // Показать модальное окно с сообщением об успешном добавлении в корзину
      showSuccessModal();
    });
    buttonContainer.appendChild(addToCartModalBtn);
    modalContent.appendChild(buttonContainer);

    // Добавление содержимого модального окна в модальное окно
    modal.appendChild(modalContent);

    // Добавление модального окна на страницу
    document.body.appendChild(modal);
  });
});

function showSuccessModal() {
  const successModal = document.createElement("div");
  successModal.classList.add("modal");

  const successContent = document.createElement("div");
  successContent.classList.add("modal-content-last");

  const successMessage = document.createElement("p");
  successMessage.innerText = "Ваш товар успешно добавлен в корзину";
  successContent.appendChild(successMessage);

  const successButton = document.createElement("div");
  successButton.classList.add("continue-Shopping");
  const continueShoppingBtn = document.createElement("button");
  continueShoppingBtn.innerText = "Продолжить покупки";
  continueShoppingBtn.addEventListener("click", () => {
    successModal.remove();
  });
  successButton.appendChild(continueShoppingBtn);

  const goToCartBtn = document.createElement("button");
  goToCartBtn.innerText = "Перейти в корзину";
  goToCartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
    successModal.remove();
  });
  successButton.appendChild(goToCartBtn);

  successModal.appendChild(successContent);
  successContent.appendChild(successButton);
  document.body.appendChild(successModal);
}


