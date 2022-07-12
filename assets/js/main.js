/* 
    Acostumbro a declarar las variables con inicial de la siguiente manera (y luego empleo camelCase):
        i = int
        f = float
        s = string
        a = arrays
*/

// Arrays en las cuales almacenamos los productos y precios del sitio
const aProducts = [ 
    {
        id: 1,
        title: "azucaradas",
        price: 110,
        img: "./assets/img/azucaradas.jpg",
        alt: "paquete de 8 de oro azucaradas"
    },
    {
        id: 2,
        title: "clasicas",
        price: 80,
        img: "./assets/img/clasicas.jpg",
        alt: "paquete de 8 de oro clásicas"
    },
    {
        id: 3,
        title: "agridulces",
        price: 90,
        img: "./assets/img/agridulces.jpg",
        alt: "paquete de 8 de oro agridulces"
    }
];

// Empezamos a interactuar con HTML
let htmlCode = ``;

aProducts.forEach((product, idProduct) => {
    htmlCode += `<article>
    <img src="${product.img}" alt="${product.alt}">
    <h3>8 de Oro ${product.title}</h3>
    <p>Precio: $${product.price}</p>
    <button onClick="addToCart(${idProduct})">COMPRAR</button>
  </article>`;
});

const sCards = document.querySelector("#cards");

sCards.innerHTML = htmlCode;

// Comenzamos a crear el carrito
let modalCart = document.getElementById("cart");
let iTotal = 0;

const drawCart = () => {
    modalCart.className = "cart";
    modalCart.innerHTML = "";

    if(aCart.length > 0) {
        aCart.forEach((product, idProduct) => {
            const cartContainer = document.createElement("div");
            cartContainer.className = "productCart";
            cartContainer.innerHTML = `
            <img src="${product.img}"/>
            <p>8 de oro ${product.title}</p>
            <p>Cantidad: ${product.cant}</p>
            <p>Precio: $${product.price}</p>
            <p>Subtotal: $${product.price * product.cant}</p>
            <button onClick="removeProduct(${idProduct})">Restar</button>
            `;

            modalCart.appendChild(cartContainer);
        });

        const totalContainer = document.createElement("div");
        totalContainer.className = "total-cart";
        totalContainer.innerHTML = `<div class="total"> TOTAL: $ ${iTotal}</div>
        <button onClick="buyCart()">FINALIZAR COMPRA</button>`;
        modalCart.appendChild(totalContainer);
    } else {
        modalCart.classList.remove("cart");
    }
};

// Array donde almacenamos todo el carrito de compras
let aCart = [];

// Función en la que agregamos productos al carrito
const addToCart = (idProduct) => {
    const idCart = aCart.findIndex((element) => {
        return element.id === aProducts[idProduct].id;
    });

    if(idCart === -1) {
        const addProduct = aProducts[idProduct];
        addProduct.cant = 1;
        aCart.push(addProduct);
        iTotal += aCart[idProduct].price;
        actStorage(aCart);
        drawCart();
    } else {
        aCart[idCart].cant += 1;
        iTotal += aCart[idProduct].price;
        actStorage(aCart);
        drawCart();
    }
};

// Función en la que restamos productos del carrito
const removeProduct = (idProduct) => {
    iTotal -= aCart[idProduct].price;

    if(aCart[idProduct].cant <= 1) {
        aCart.splice(idProduct, 1);
    } else {
        aCart[idProduct].cant -= 1;
    }

    actStorage(aCart);
    drawCart();
};

// Función en la que finalizamos la compra y eliminamos el carrito
const buyCart = () => {
    alert("¡Gracias por tu compra! El total es: $" + iTotal);
    iTotal = 0;

    aCart.forEach((product) => {
        aCart.splice(product);
    });

    actStorage(aCart);
    drawCart();
};

// Actualizamos el almacenamiento
const actStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const delStorage = (cart) => {
    localStorage.removeItem("cart");
}