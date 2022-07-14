import productos from "../database/index.js";
/* Buscar el elemento en el DOM */
const productosContenedor = document.getElementById("productosContenedor");

/* Pintamos los productos en el DOM */
function pintarProductos() {
  /* Creamos una variable para almacenar después los productos */
  let html = "";
  /* Recorremos el array de productos */
  for (const { id, nombre, imagen, precio, cantidad, categoria } of productos) {
    html += `
    <div class="col-lg-4 col-md-6 col-sm-6 ${categoria}">
      <div class="single-work text-center mt-30 ">
        <div class="work-image img-gallery ">
          <img src="${imagen}" alt="${nombre}">
        </div>
        <div class="work-overlay">
          <div class="work-content">
            <h3 class="work-title">${nombre}</h3>
            <ul>
              <li class="btn-buy"><button type="button" class="agregar" data-id="${id}">+</button>Buy</li>
              <li class="btn-price"><a><i class="fa">${precio}</i></a>Price</li>
              <li class="btn-stock"><a><i class="fa">${cantidad}</i></a>Stock</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`;
  }
  productosContenedor.innerHTML = html;
}

export default pintarProductos;
