
<div align="center">
    <img src="/preview-1.jpg" alt="Vista Principal" />
    <img src="/preview-2.jpg" alt="Carrito de compras"/>
    <h1>PRIMER PARCIAL PROGRAMACION III - UTN FRA</h1>
    <p><strong>Adriano Vazquez</strong></p>
</div>

---

## Descripcion del proyexto

Aplicacion web de e-commerce que simula una **tienda de productos**  con carrito de compras, filtrado, ordenamiento y, persistencia de datos en `localStorage`.

---

## funcionalidades 

- Catalogo de Productos con imagen, nombre y, precio.
- Busqueda en tiempo real por nombre.
- Ordenamiento de productos por precio.
- Carrito de compras con persistencia de datos en localStorage.
- Agregar y, eliminar productos del carrito.
- Calculo automatico del total acumulado.
- Contador de productos agregados al carrito.

---

## 📌 Como Usar

1. Filtrar por nombre desde el buscador.
2. Ordenar Productos por precio.
3. Agregar productos al carrito.
4. Eliminar productos o vaciar el Carrito.
5. Persistencia de datos en localStorage al refrescar.

---

## Funciones Implementadas

**`init()`**
Inicializa la aplicacion, carga los datos del alumno, renderiza los productos y, carrito.

**`viewUser()`**
Muestra los datos del alumno en la interfaz.

**`loadCart()`**
Renderiza el carrito en el DOM, obteniendo los datos desde localStorage, si no hay resultados muestra mensaje.

**`viewProducts()`**
Renderiza los productos en el DOM. 

**`filterProducts()`**
Filtra los productos por nombre segun el texto ingresado en el buscador.

**`viewCart()`**
Renderiza los productos del carrito en el DOM. muestra mensaje si no hay productos cargados.

**`cleanCart()`**
Vacia el carrito, elimina el item de localStorage y, actualiza el contador junto al precio total.

**`updateStatus()`**
Actualiza el carrito, el contador y, el total del carrito.

**`changeTotalPrice()`**
Actualiza el total del carrito.

**`changeCartCounter()`**
Actualiza el contador de productos del carrito.



---

## Estructura de Datos

**Array `productos`**: Productos con id, nombre, precio e imagen.

**Array `cart`**: Productos agregados al carrito, persistencia en localStorage.

---

## ✅ Ejercicios Completados

- Ejercicio 1: Datos del alumno
- Ejercicio 2: Renderizado de productos
- Ejercicio 3: Filtro de busqueda
- Ejercicio 4: Carrito de compras
- Ejercicio 5: Persistencia de datos
- Ejercicio 6: Ordenamiento
- Ejercicio 7: Actualizar Estado
- Ejercicio 8: estilos

---

## Sample Image

- Imagen propuesta por el profesor.

<img src="/sample.jpegg" alt="Imagen de muestra"/>