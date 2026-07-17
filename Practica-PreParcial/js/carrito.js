//array mock de productos
const productos = [
  {
    id: 1,
    nombre: "Teclado Etheos ScoreBreaker",
    precio: 55000,
    cantidad: 0,
    path_img: "https://dcdn-us.mitiendanube.com/stores/379/142/products/tclmcg1-21-8975b6e7830d91a53d16516632658815-1024-1024.webp"
  },
  {
    id: 2,
    nombre: "Auriculares Razer kraken",
    precio: 32500,
    cantidad: 0,
    path_img: "https://insumaxinformatica.com.ar/img/Public/producto-126751-5.jpg"
  },
  {
    id: 3,
    nombre: "Mouse Hyper X Pulsefire",
    precio: 26000,
    cantidad: 0,
    path_img: "https://hp.widen.net/content/ndods5irsy/png/ndods5irsy.png?w=800&h=600&dpi=72&color=ffffff00"
  },
  {
    id: 4,
    nombre: "Mousepad Gladius Dragon ",
    precio: 5500,
    cantidad: 0,
    path_img: "https://http2.mlstatic.com/D_NQ_NP_912087-MLA100107798919_122025-O.webp"
  },
  {
    id: 5,
    nombre: "Monitor Hp",
    precio: 120000,
    cantidad: 0,
    path_img: "https://co-media.hptiendaenlinea.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/5/65P62AA-1_T1709231078.png"
  }
];

//Select the section to add html code.
const listadoProductos = document.getElementById("listado-productos");

// se modifica el html de la section, se agregan los divs que forman cada card producto.
let card = "";
let cart= [];
let cartElements = document.getElementById("cart-elements");

mostrarProductos(productos);

function mostrarProductos(array){
  card = "";
array.forEach(p => { // cargo dinamicamente los objetos del array en cards.
    card += `
        <div class="card-producto">
            <img src="${p.path_img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button onclick="addToCart(${p.id})">Agregar al carrito</button>
        </div>
    `;
  });
  listadoProductos.innerHTML = card; 
}

function addToCart(id){
  if(!(cart.find(p => p.id === id)))// si no existe en el carrito, se agrega.
    cart.push(productos.find(p => p.id === id));

    cart[cart.findIndex(p=>p.id===id)].cantidad+=1;
    viewCart(cart);
}

//seleccionar lista productos(nav)
let barraBusqueda = document.getElementById("barra-busqueda");
barraBusqueda.addEventListener("keyup",filtrarProductos); //Asignar evento al terminar de presionar una tecla.

function filtrarProductos(){ 
  if(!(barraBusqueda.value.length === 0)){
    let productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(barraBusqueda.value));
    productosFiltrados.length === 0 ? listadoProductos.innerHTML = "<p>PRODUCT NOT FOUND</p>"
    : mostrarProductos(productosFiltrados);
  }else
     mostrarProductos(productos);
}

let elements;
function viewCart(array){
  elements = "";
  cart.forEach((p, i) => {
    elements += `
      <li>
        <p>${p.nombre} - $${p.precio}</p>
        <p>Cantidad: ${p.cantidad}</p>
        <button onclick="deleteProduct(${i})">Delete</button>
      </li>
    `
  });
  cartElements.innerHTML = elements;
}

function deleteProduct(index){

    if(cart[index].cantidad === 1)
      cart.splice(index, 1);
    else
      cart[index].cantidad--;

    viewCart(cart);
   // si existe, entonces eliminar desde cart[index], 1 elemento.
}