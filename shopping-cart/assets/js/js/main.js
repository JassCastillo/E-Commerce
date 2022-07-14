$(document).ready(function()
{
    // navbar shrink
    $(window).on("scroll",function()
    {
        if($(this).scrollTop() > 90)
        {
            $(".navbar").addClass("navbar-shrink");
        }
        else
        {
            $(".navbar").removeClass("navbar-shrink");
        }
    })
    
    // filter
    let $btns = $('.img-gallery .sortBtn .filter-btn');
    $btns.click(function(e) {
        $('.img-gallery .sortBtn .filter-btn').removeClass('active');
        e.target.classList.add('active');
        let selector = $(e.target).attr('data-filter');
        $('.img-gallery .grid').isotope
        ({
            filter:selector
        })
        return false;
    })
    $('.image-popup').magnificPopup
    ({
        type: 'image',
        gallery: { enabled: true}
    })
    // navbar collapse 
    $(".nav-link").on("click",function()
    {
        $(".navbar-collapse").collapse("hide");
    })
})
import pintarProductos from '../components/productos.js'
import { pintarArticulos, agregarArticulo, removerArticulo, removerTodo, vaciarCarrito, comprar, articulos } from '../components/carrito.js'

const productosContenedor = document.getElementById('productosContenedor')
const articulosContenedor = document.getElementById('articulosContenedor')

const btnsAcciones = document.getElementById('btnsAcciones')

document.addEventListener('DOMContentLoaded', () => {
  /* Pintar los productos */
  pintarProductos()

  /* Pintar los articulos */
  pintarArticulos()

  productosContenedor.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('agregar')) {
      const id = target.dataset.id
      agregarArticulo(+id, 1)
    }

    pintarArticulos()
  })

  articulosContenedor.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('agregar')) {
      const id = target.dataset.id
      agregarArticulo(+id, 1)
    }

    if (target.classList.contains('remover')) {
      const id = target.dataset.id
      removerArticulo(+id, 1)
    }

    if (target.classList.contains('removerTodo')) {
      const id = target.dataset.id
      removerTodo(+id)
    }

    pintarArticulos()
  })

  btnsAcciones.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('limpiar')) {
      vaciarCarrito()
    }

    if (target.classList.contains('comprar')) {
      if (articulos.length > 0) {
        comprar()
        pintarProductos()
      } else {
        window.alert('There are no items in the cart, please add a few')
      }
    }

    pintarArticulos()
  })
})

