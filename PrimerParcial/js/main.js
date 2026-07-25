
//Mock Array de objetos Producto
let productos = [
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

/¨Variables¨/
const productList = document.getElementById("product-list"); //Section Productos
const filterInput = document.getElementById("filter-input"); // input filtro productos
const cartList = document.getElementById("cart-items"); // section mostrar productos del carrito
let cartCounter = document.getElementById("cart-counter"); // contador de productos del carrito
let totalCartPrice = document.getElementById("cart-total_price"); // precio total de los productos del carrito.

let elements = "";
let cart = []; //Array del carrito
let card = ""; //Card Producto
let totalProducts = 0;

const alumno = { nombre: "Adriano", apellido: "Vazquez"} ;
const user = document.getElementById("user-name");

init();

/¨ Exercise 1 - Mostrar Datos Del Usuario¨/

function init(){
    viewUser();
    loadCart();
    viewProducts(productos);
}

function viewUser(){
    user.textContent = `${alumno.nombre} ${alumno.apellido}`;
}

/¨Exercise 2 - Renderizar Tarjetas Producto¨/

function viewProducts(array){
    card = "";
    array.forEach(p => {
        card += `
        <div class="card-product">
            <img src="${p.path_img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button class="card-btn" onclick="addToCart(${p.id})">Add To Cart</button>
        </div>
        `
    });

    productList.innerHTML = card;
}

/¨Excersice 3 - Filtrar productos por nombre¨/

filterInput.addEventListener("keyup", filterProducts); // Evento al terminar de presionar una tecla.

function filterProducts(){
    if(!(filterInput.value.length === 0)){
     let productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(filterInput.value));
     productosFiltrados.length ? viewProducts(productosFiltrados) : productList.innerHTML = `<p>PRODUCT NOT FOUND</p>`;
    }else
        viewProducts(productos);
}

/¨Excersice 4 - Carrito Functions¨/

/*Carga carrito desde local storage al entrar en la web
    si hay productos, incrementa el contador del carrito.
    muestra el carrito llamando a la funcion, donde ya maneja la validacion del length.
*/ 
function loadCart(){
    cart = JSON.parse(localStorage.getItem("cart-products")) || []; //si retorna algo de localStorage o array vacio.
if(cart.length === 0){
    cleanCart();
    console.log("load cart nada en el carrito");
  }
  updateStatus();
}

function addToCart(id){
    if(!(cart.find(p => p.id === id))){ // si no esta en el array, se lo agrega
        cart.push({...productos.find(p => p.id === id)});
    }

    cart[cart.findIndex(p => p.id === id)].cantidad+=1; //sin importar si ya existia, se le suma uno en cantidad.
    saveCartToLocalStorage(); 
    updateStatus();
}


function viewCart(){
    elements = "";
    if(cart.length === 0){
        elements+= `
            <li>No Hay Productos En El Carrito</p>
        `
    }else{
        cart.forEach((p, i) =>{
            elements += `
                <li class="cart-item">${p.nombre} - $${p.precio} - Cantidad ${p.cantidad}
                    <button class="cart-btn" onclick="deleteProduct(${i})">Delete</button>
                </li>
            `
        });
    }


    cartList.innerHTML = elements;
}

function cleanCart(){
    cart = [];
  localStorage.clear("cart-products") 
  updateStatus()
}
/*Elimina un producto si es el ultimo, si hay mas de uno solo resta la cantidad.
Decrementa en uno al contador y, cambia su inner.
llama la funcion Guarda el carrito actualizado en localStorage
llama la funcion muestra el carrito actualizado en el innerHTML.
*/
function deleteProduct(index){

        if(cart[index].cantidad == 1)
            cart.splice(index, 1); //eliminar producto del carrito si solo hay uno agreado.
        else if(cart[index].cantidad >= 1)
            cart[index].cantidad--; //si hay mas de uno, solo restar la cantidad.
        
            cartCounter.innerHTML = --totalProducts;
            changeTotalPrice();
            saveCartToLocalStorage();
            viewCart(cart);
}

/¨Excersice 5 - Guardar en LocalStorage¨/
function saveCartToLocalStorage(){
    localStorage.setItem("cart-products", JSON.stringify(cart));
    console.log(`SAVE CART Guardando carrito en local storage ${cart.length}`);
}

/¨Excersice 6 - Order By¨/

//Logica ordenar por precio o volver al orden normal.

function orderByPrice(){ //mayor a menor
    productos.sort((a, b) => b.precio - a.precio);
    viewProducts(productos);
}
function orderNormal(){
    productos.sort((a, b) => a.id - b.id);
    viewProducts(productos);
}

/¨Excersice 7 - Change Status¨/

function updateStatus(){
    //Actualiza el contador del carrito, el precio del total y, el renderizado del carrito.
    changeCartCounter();
    changeTotalPrice();
    viewCart(cart);
}

function changeTotalPrice(){
 totalCartPrice.textContent = `$${cart.reduce((total, p) => total + (p.precio * p.cantidad), 0) }`;
}

/*
Valida length del carrito, cambia valor al contador de productos del carrito.
*/
function changeCartCounter(){
    if(cart.length > 0)
      totalProducts = cart.reduce((total, value) => total + value.cantidad, 0); // total empieza en 0, va acumulando los productos.
    else 
        totalProducts = 0;

      cartCounter.innerHTML = totalProducts;
}
