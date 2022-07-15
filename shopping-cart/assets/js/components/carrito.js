import productos from "../database/index.js";

/* Creamos un nuevo arreglo vacio */
let articulos = [];

/* Buscar el elemento en el DOM */
const articulosContenedor = document.getElementById("articulosContenedor");

const precioTotal = document.getElementById("precioTotal");

const amountTotal = document.getElementById(`amountTotal`);

/* Pintamos los articulos en el Carrito */
function pintarArticulos() {
  /* creamos una variable para almacenar después los articulos */
  let html = "";
  /* Recorremos el array de articulos */
  for (const articulo of articulos) {
    const productoFiltrado = productos.find(
      (producto) => producto.id === articulo.id
    );

    const { id, nombre, imagen, precio, cantidad } = productoFiltrado;

    html += `
    <div>
    <img src="${imagen}" alt="${nombre}">
    <div>
      <h2>${nombre} - $ ${articulo.cantidad * precio} x${articulo.cantidad}</h2>
      <button class="remover btn-1" type="button" data-id="${id}">-</button>
      <span>${articulo.cantidad}</span>
      <button class="agregar btn-1" type="button" data-id="${id}">+</button>
      <div>
        <button class="removerTodo btn-2" type="eliminar" data-id="${id}">delete</button>
      </div>
    </div>
  </div>  
    `;
  }

  console.log(articulos);
  articulosContenedor.innerHTML = html;

  /* Pintar el total en el Carrito */
  precioTotal.innerHTML = mostrarTotal();
  amountTotal.innerHTML = cantidadTotal();
}

function agregarArticulo(id, cantidad) {
  const productoFiltrado = productos.find((producto) => producto.id === id);

  /* cehcar que tengamos stock del producto */
  if (productoFiltrado && productoFiltrado.cantidad > 0) {
    /* Si el articulo no está, lo agregamos, pero si ya está, aumentamos la cantidad */

    const articuloFiltrado = articulos.find((articulo) => articulo.id === id);

    if (articuloFiltrado) {
      /* Si la cantidad no supera el stock, aumentamos la catidad, si no, mostramos un mensaje */
      if (checarInventario(id, cantidad + articuloFiltrado.cantidad)) {
        articuloFiltrado.cantidad += cantidad;
      } else {
        Swal.fire("Sorry not enough in stock");
      }
    } else {
      articulos.push({ id, cantidad });
    }
  } else {
    Swal.fire("Sorry, out of stock");
  }
}

function removerArticulo(id, cantidad) {
  const articuloFiltrado = articulos.find((articulo) => articulo.id === id);

  if (articuloFiltrado.cantidad - cantidad > 0) {
    articuloFiltrado.cantidad -= cantidad;
  } else {
    const confirmar = Swal.fire("Are you sure you want to remove the item?");

    if (confirmar) {
      articulos = articulos.filter((articulo) => articulo.id !== id);
    }
  }
}

function removerTodo(id) {
  articulos = articulos.filter((articulo) => articulo.id !== id);
}

function checarInventario(id, cantidad) {
  const productoFiltrado = productos.find((producto) => producto.id === id);

  return productoFiltrado.cantidad - cantidad >= 0;
}

function mostrarTotal() {
  let total = 0;
  for (const articulo of articulos) {
    const productoFiltrado = productos.find(
      (producto) => producto.id === articulo.id
    );
    total += articulo.cantidad * productoFiltrado.precio;
  }
  return `$${total}`;
}
function cantidadTotal() {
  let total = [];
  for (const articulo of articulos) {
    total.push(articulo.cantidad) + 1;
  }
  const suma = total.reduce((num1, num2) => num1 + num2, 0);
  return suma;
}

function vaciarCarrito() {
  articulos = [];
}

function comprar() {
  for (const articulo of articulos) {
    const productoFiltrado = productos.find(
      (producto) => producto.id === articulo.id
    );

    productoFiltrado.cantidad -= articulo.cantidad;
  }

  vaciarCarrito();
  Swal.fire("Thanks for your purchase!");
}

export {
  pintarArticulos,
  agregarArticulo,
  removerArticulo,
  removerTodo,
  vaciarCarrito,
  comprar,
  articulos,
};
