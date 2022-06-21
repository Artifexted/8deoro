let iProductSelected = NaN;

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

function product(id) {
    let fProductPrice;

    switch(id) {
        case 1:
            fProductPrice = parseFloat(prompt("Ingresa el costo de las 8 de oro azucaradas"));

            if(isNaN(fProductPrice) || fProductPrice <= 0) {
                alert("ERROR: Ingresa un número. Debe ser mayor a 0")
                product(id);
                break;
            } else {
                alert("Elegiste 8 de oro azucaradas a un valor de: $" + fProductPrice);
                break;
            }
        case 2:
            fProductPrice = parseFloat(prompt("Ingresa el costo de las 8 de oro clásicas"));

            if(isNaN(fProductPrice) || fProductPrice <= 0) {
                alert("ERROR: Ingresa un número. Debe ser mayor a 0")
                product(id);
                break;
            } else {
                alert("Elegiste 8 de oro azucaradas a un valor de: $" + fProductPrice);
                break;
            }
        case 3:
            fProductPrice = parseFloat(prompt("Ingresa el costo de las 8 de oro agridulces"));

            if(isNaN(fProductPrice) || fProductPrice <= 0) {
                alert("ERROR: Ingresa un número. Debe ser mayor a 0")
                product(id);
                break;
            } else {
                alert("Elegiste 8 de oro azucaradas a un valor de: $" + fProductPrice);
                break;
            }
    }
}
