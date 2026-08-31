

const alumno = { nombre: "Adriano", apellido: "Vazquez"} ;


/¨Variables¨/
const productList = document.getElementById("product-list"); //Section Productos
const filterInput = document.getElementById("filter-input"); // input filtro productos
const cartList = document.getElementById("cart-items"); // section mostrar productos del carrito
let cartCounter = document.getElementById("cart-counter"); // contador de productos del carrito
let totalCartPrice = document.getElementById("cart-total_price"); // precio total de los productos del carrito.

let apiProducts = [];
let elements = "";
let cart = []; //Array del carrito
let dolarPrice = []; // Array fetch Dolar-Api
let card = ""; //Card Producto
let totalProducts = 0;

const user = document.getElementById("user-name");

//init();


async function obtenerDatosDolar(){
    try {
        
        const res = await fetch('https://dolarapi.com/v1/dolares');
    
        const dolarPrice = await res.json();
    
    console.table(dolarPrice);
       
    } catch (e) {
        console.log(`ERROR CAPTURADO, ${e}`, e.message);
    }
}


init()
obtenerDatos();

async function obtenerDatos(){
    try {
        
        const res = await fetch("https://fakestoreapi.com/products/");
    
        apiProducts = await res.json();
        viewProducts(apiProducts);
    } catch (e) {
        console.log(`ERROR CAPTURADO, ${e}`, e.message);
    }

}

 function init(){
    viewUser();
     loadCart();
    obtenerDatosDolar();
}

function viewProducts(array){
    card = "";
    array.forEach(p => {
        card += `
        <div class="card-product">
            <img src="${p.image}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>${p.category}</p>
            <p>$${p.price}</p>
            <button class="card-btn" onclick="addToCart(${p.id})">Add To Cart</button>
        </div>
        `
    });
    productList.innerHTML = card;
}

/¨ Exercise 1 - Mostrar Datos Del Usuario¨/


function viewUser(){
    user.textContent = `${alumno.nombre} ${alumno.apellido}`;
}

/¨Exercise 2 - Renderizar Tarjetas Producto¨/

function viewProducts(array){
    card = "";
    array.forEach(p => {
        card += `
        <div class="card-product">
            <img src="${p.image}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>${p.category}</p>
            <p>$${p.price}</p>
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
     let productosFiltrados = apiProducts.filter(p => p.title.toLowerCase().includes(filterInput.value));
     productosFiltrados.length ? viewProducts(productosFiltrados) : productList.innerHTML = `<p>PRODUCT NOT FOUND</p>`;
    }else
        viewProducts(apiProducts);
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
        cart.push({...apiProducts.find(p => p.id === id), quantity: 0});
    }

    cart[cart.findIndex(p => p.id === id)].quantity +=1; //sin importar si ya existia, se le suma uno en cantidad.
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
                <li class="cart-item">${p.title} - $${p.price} - Category ${p.category} - Count ${p.quantity}
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

        if(cart[index].quantity == 1)
            cart.splice(index, 1); //eliminar producto del carrito si solo hay uno agreado.
        else if(cart[index].quantity >= 1)
            cart[index].quantity--; //si hay mas de uno, solo restar la cantidad.
        
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
    apiProducts.sort((a, b) => b.price - a.price);
    viewProducts(apiProducts);
}
function orderNormal(){
    apiProducts.sort((a, b) => a.id - b.id);
    viewProducts(apiProducts);
}

/¨Excersice 7 - Change Status¨/

function updateStatus(){
    //Actualiza el contador del carrito, el precio del total y, el renderizado del carrito.
    changeCartCounter();
    changeTotalPrice();
    viewCart(cart);
}

function changeTotalPrice(){
 totalCartPrice.textContent = `$${cart.reduce((total, p) => total + (p.price * p.quantity), 0) }`;
}

/*
Valida length del carrito, cambia valor al contador de productos del carrito.
*/
function changeCartCounter(){
    if(cart.length > 0)
      totalProducts = cart.reduce((total, value) => total + value.quantity, 0); // total empieza en 0, va acumulando los productos.
    else 
        totalProducts = 0;

      cartCounter.innerHTML = totalProducts;
}
