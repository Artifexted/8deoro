/* 
    Acostumbro a declarar las variables con inicial de la siguiente manera (y luego empleo camelCase):
        i = int
        f = float
        s = string
        a = arrays
*/

// Array en la cual almacenamos los productos
let aProducts = [];

// Accedemos al JSON de los productos y lo pasamos como parametro de una función
fetch("./assets/js/products.json")
    .then((resp) => resp.json())
    .then((product) => {
        loadProducts(product);
    }
);

function loadProducts(products) {
    // Almacenamos lo obtenido del fetch en un array
    aProducts = products;

    // Cargamos la tienda
    Shop();
}

// Variable donde almacenamos el total gastado hasta el momento
let iTotal = 0;

const sCartID = document.getElementById("cart");
const sShopID = document.getElementById("shop");

// Colores variables para Toastify!
var bgColors = [
    "linear-gradient(to right, #011e6b, #20356b)",
    "linear-gradient(to right, #c82822, #bb120b)",
], i = 0;

const toggleNav = (func) => {
    if(func == 0) {
        sShopID.style.display = "block";
        sCartID.style.display = "none";
    } else if(func == 1) {
        if(aCart.length > 0) {
            sShopID.style.display = "none";
            sCartID.style.display = "block";
        } else {
            Toastify({
                text: "Tu carrito está vacio...",
                duration: 2000,
                position: 'center',
                gravity: 'bottom',
                style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();

            toggleNav(0);
        }
    }
}

// Mostrar la lista de productos
const Shop = () => {
    let sCode = ``;

    aProducts.forEach((product, idProduct) => {
        let idCart = aCart.findIndex((element) => { return element.id === aProducts[idProduct].id; });
        let iAmount = amountInCart(idCart);

        sCode += `<article>
        <img src="${product.img}" alt="${product.alt}">
        <h3>8 de Oro ${product.title}</h3>
        <p>Precio: $${product.price}</p>
        <button onClick="removeProduct(${idProduct})">-</button>
        <p class="amountInCart">${iAmount}</p>
        <button onClick="addToCart(${idProduct})">+</button>
    </article>`;
    });

    sShopID.innerHTML = sCode;
    toggleNav(0);
}

// Renderizamos el carrito
const drawCart = () => {
    sCartID.className = "cart";
    sCartID.innerHTML = "";

    iTotal = 0;

    if(aCart.length > 0) {
        aCart.forEach((product, idProduct) => {
            const cartContainer = document.createElement("article");
            cartContainer.innerHTML = `<img src="${product.img}"/>
            <h3>8 de oro ${product.title}</h3>
            <p>Cantidad: ${product.cant}</p>
            <p>Precio: $${product.price}</p>
            <p>Subtotal: $${product.price * product.cant}</p>`;

            iTotal += product.price * product.cant;
            sCartID.appendChild(cartContainer);
        });

        sCartID.innerHTML += `<div> TOTAL: $${iTotal}</div>
        <button onClick="buyCart()">FINALIZAR COMPRA</button>`;
    } else {  sCartID.classList.remove("cart"); }

    Shop();
}

// Función en la que agregamos productos al carrito
const addToCart = (idProduct) => {
    let idCart = aCart.findIndex((element) => { return element.id === aProducts[idProduct].id; });

    if(idCart === -1) {
        let addProduct = aProducts[idProduct];
        addProduct.cant = 1;
        aCart.push(addProduct);
    } else { aCart[idCart].cant++; }

    saveStorage(aCart);

    Toastify({
        text: "Producto agregado!",
        duration: 1500,
        close: true,
        position: 'center',
        gravity: 'bottom',
        style: {
          background: bgColors[i % 2],
          color: "#fade1b",
        }
      }).showToast();
      i++;
}

// Función en la que restamos productos del carrito
const removeProduct = (idProduct) => {
    let idCart = aCart.findIndex((element) => { return element.id === aProducts[idProduct].id; });

    if(!aCart[idCart]) { 
        Toastify({
            text: "No tenés este producto en tu carrito...",
            duration: 1500,
            close: true,
            position: 'center',
            gravity: 'bottom',
            style: {
              background: bgColors[i % 2],
              color: "#fade1b",
            }
          }).showToast();
          i++;

        return; 
    }
    
    iTotal -= aCart[idCart].price;

    (aCart[idCart].cant <= 1) ? aCart.splice(idCart, 1) : aCart[idCart].cant--;

    saveStorage(aCart);

    Toastify({
        text: "Producto eliminado!",
        duration: 1500,
        close: true,
        position: 'center',
        gravity: 'bottom',
        style: {
          background: bgColors[i % 2],
          color: "#fade1b",
        }
      }).showToast();
      i++;
}

// Función en la que finalizamos la compra y eliminamos el carrito
const buyCart = () => {
    Toastify({
        text: "¡Gracias por tu compra! El total es: $" + iTotal,
        duration: 3000,
        position: 'center',
        gravity: 'bottom',
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();

    iTotal = 0;

    aCart.forEach((product) => { aCart.splice(product); });

    delStorage();
    Shop();
}

// Función para guardar el carrito
const saveStorage = (cart) => { localStorage.setItem("cart", JSON.stringify(cart)); drawCart(); }

// Función para cargar el carrito
const loadStorage = () => { return JSON.parse(localStorage.getItem("cart")) || []; }

// Función para mostrar la cantidad en carrito de un producto.
const amountInCart = (idProduct) => { 
    let result = (aCart[idProduct]) ? (JSON.stringify(aCart[idProduct].cant)) : 0;
    return result; 
}

// Función para eliminar el carrito
const delStorage = () => { localStorage.removeItem("cart"); drawCart(); }

// Array donde almacenamos todo el carrito de compras
let aCart = loadStorage();

// Llamamos a la función para cargar el carrito
loadStorage();

// Llamamos a la función del renderizado del carrito
drawCart();
