const MIN_AMOUNT = 50000;
const input = document.getElementById("amountInput");
const text = document.getElementById("formattedText");
const errorMessage = document.getElementById("errorMessage");
const chargeBtn = document.getElementById("chargeBtn");

function checkMinimumAmount() {
  const numericValue = parseInt(input.value.replace(/[^0-9]/g, "")) || 0;

  if (numericValue === 0) {
    errorMessage.style.display = "none";
    chargeBtn.setAttribute("disabled", "true");
    return;
  }

  if (numericValue < MIN_AMOUNT) {
    errorMessage.textContent = `حداقل مبلغ افزایش موجودی 50,000 تومان است`;
    errorMessage.style.display = "block";
    chargeBtn.setAttribute("disabled", "true");
  } else {
    errorMessage.style.display = "none";
    chargeBtn.removeAttribute("disabled");
  }
}

input.addEventListener("input", () => {
  let value = input.value.replace(/[^0-9]/g, "");

  if (value === "") {
    input.value = "";
    text.textContent = "";
    checkMinimumAmount();
    return;
  }

  let formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  input.value = formatted;

  text.textContent = `${formatted} تومان`;

  checkMinimumAmount();
});

input.addEventListener("paste", (e) => {
  e.preventDefault();
  const pastedText = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
  input.value = pastedText;
  input.dispatchEvent(new Event("input"));
});

chargeBtn.addEventListener("click", (e) => {
  if (chargeBtn.hasAttribute("disabled")) {
    e.preventDefault();
  }
});
