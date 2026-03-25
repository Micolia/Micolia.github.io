const precio = 500;
let cantidad = 0;

const precioInicialSpan = document.querySelector(".precio-inicial");
const cantidadSpan = document.querySelector(".cantidad");
const valorTotalSpan = document.querySelector(".valor-total");
const buttonPlus = document.querySelector("p button:first-of-type");
const buttonMinus = document.querySelector("p button:last-of-type");

precioInicialSpan.innerHTML = precio;

buttonPlus.addEventListener("click", () => {
  cantidad = cantidad + 1;
  cantidadSpan.innerHTML = cantidad;
  valorTotalSpan.innerHTML = cantidad * precio;
}
);

buttonMinus.addEventListener("click", () => {
  if (cantidad > 0) {
    cantidad = cantidad - 1;
    cantidadSpan.innerHTML = cantidad;
    valorTotalSpan.innerHTML = cantidad * precio;
  }
}
);
