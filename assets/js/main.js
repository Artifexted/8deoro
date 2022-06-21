let iProductSelected = NaN;

/* Creamos un while para ejecutar un prompt hasta que elija una de las opciones que queremos. 
Lo hacemos con DO para que se ejecute por lo menos una vez.*/
do {
    iProductSelected = parseInt(prompt("Elige las 8 de oro que quisieras comprar: \n1. Azucaradas \n2. Clásicas \n3. Agridulces \n\n0. Salir del menú \nDEBES INGRESAR UN NUMERO."));

    switch(iProductSelected) {
        case 1: case 2: case 3:
            product(iProductSelected);
            break;
        case 0:
            alert("Saliste exitosamente.");
            break;
        default:
            alert("Ingresa una opción valida.");
            continue;
    }
} while (iProductSelected > 3 || isNaN(iProductSelected) || iProductSelected < 0);
// WHILE: En caso de que el numero ingresado sea mayor a 3, no sea un numero o sea menor a 0 (negativo) continua el bucle.

// Creamos una función en la cual ejecutamos acciones en caso de que haya elegido algún producto.
function product(id) {
    let fProductPrice;
    let sProductOption;

    // Damos nombre a la opción seleccionada en una variable.
    if(id == 1) { sProductOption = "azucaradas"; }
    else if (id == 2) { sProductOption = "clasicas"; }
    else if(id == 3) { sProductOption = "agridulces"; }
    else { alert("ERROR: Ocurrió un error inesperado con tu selección."); }
    // El último else es solamente por si ocurre algún bug y el id da otro valor fuera de los que debería.

    // Pedimos al usuario que ingrese un precio al producto mediante prompt...
    fProductPrice = parseFloat(prompt("Ingresa el costo de las 8 de oro " + sProductOption));

    // Hacemos una verificación de lo ingresado por el usuario
    if(isNaN(fProductPrice) || fProductPrice <= 0) {
        alert("ERROR: Ingresa un número. Debe ser mayor a 0")
        product(id);
    } else {
        alert("Elegiste 8 de oro azucaradas a un valor de: $" + fProductPrice);
    }
}
