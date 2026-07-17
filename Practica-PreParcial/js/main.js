//////////////////////////
// Ejercicios
/////////////////////////

//1- Mostrar Saludo
/* 
.Crear un input para ingresar un nombre
.Crear un input para ingresar una edad
.Un boton que al hacer click cree un objeto persona y muestre "Hola soy.. y, tengo.. años"

 */

const btn = document.getElementById("btn-message");


btn.addEventListener("click", function () {
    const nombre = document.querySelector(".name").value;
    const edad = document.querySelector(".edad").value;

    alert(`Hola soy ${nombre} y tengo ${edad} años`);
});


//2- Crear un objeto auto y mostrarlo

/*
.Crea un objeto auto con las siguientes propiedades:
color
marca
modelo
1. Ingresr los datos con inputs y, un boton.
2. Mostrar los datos en un <p><strong>.. al hacer click.
*/

const btnCar = document.getElementById("btn-create-car");
const mostrarAuto = document.getElementById("info-car");

btnCar.addEventListener("click", function(){
    let color = document.querySelector(".color-car").value;
    let marca = document.querySelector(".marca-car").value;
    let modelo = document.querySelector(".modelo-car").value;

    const newCar = 
    {
        color: color,
        marca: marca,
        modelo: modelo
    };

    mostrarAuto.innerHTML =`
    <p>Nuevo Auto : </p> 
    <p>Color: ${newCar.color}</p>
    <p>Marca: ${newCar.marca}</p>
    <p>Modelo: ${newCar.modelo}</p>
    `;

});


//3- Filtrar autos por color
/*
.Dado un array de autos:
crear un input para ingresar un color
filtrar un array de autos y, mostrar los que coinciden al presionar un boton
*/

let autos = [
    {marca: "toyota", modelo: "etios", color: "gris"},
    { marca: "Toyota", modelo: "Etios", color: "negro" },
    { marca: "Ford", modelo: "Fiesta", color: "negro" },
    { marca: "Volkswagen", modelo: "Gol", color: "negro" },
    { marca: "Chevrolet", modelo: "Onix", color: "negro" },
    { marca: "Renault", modelo: "Clio", color: "negro" },
    { marca: "Honda", modelo: "Civic", color: "rojo" },
    { marca: "Peugeot", modelo: "208", color: "blanco" },
    { marca: "fiat", modelo: "Cronos", color: "azul" },
    { marca: "fiat", modelo: "1", color: "gris" },
    { marca: "Hyundai", modelo: "HB20", color: "verde" },
    { marca: "fiat", modelo: "duna", color: "rojo" }

];
const btnMostrar = document.getElementById("btn-view-car");
const inputColor = document.querySelector(".color-car-3");
const mostrarAutos3 = document.getElementById("view-cars-3");
btnMostrar.addEventListener("click", function () {
    let carEqualColor = autos.filter(auto => auto.color === inputColor.value);
    carEqualColor.forEach(car => {
        mostrarAutos3.innerHTML += `
        <p>Auto color: ${car.color}, Modelo: ${car.modelo}, Marca: ${car.marca} </p>`;
    });
});
//4- Mostrar una lista de autos marca FIAT
/*
*/
const btnMostrar4 = document.getElementById("btn-car-4");
const listaAutos = document.getElementById("view-cars-4");

btnMostrar4.addEventListener("click", mostrarFiat4);
    
    listaAutos.innerHTML += "</ul>"; //cerrar lista dinamica luego de agregar todos los li.

function mostrarFiat4(){

    const autosFiat = autos.filter(auto => auto.marca.toLowerCase() === "fiat"); // filtrar elementos
    listaAutos.innerHTML = "<ul>" // agregar lista dinamica
    
    autosFiat.forEach(auto => listaAutos.innerHTML +=  //sumar li a la lista dinamica con informacion adjunta
        `<li>Auto color: ${auto.color}, Modelo: ${auto.modelo}, Marca: ${auto.marca}</li>`);
};
    