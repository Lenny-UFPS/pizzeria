async function leerJSON(url) {
    try{
        let response = await fetch(url);
        let user = await response.json();
        return user;
    }catch(err){
        alert(err);
    }
  }

  function createTitle(){
      var url = "https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
      leerJSON(url).then(datos => {
        document.getElementById("title").innerHTML = "<p class='ml-2 font-semibold text-2xl tracking-tighter' id='title'>" + datos.nombrePizzeria + "</p>";
      })
  }

function crearComponentes(){ // No se requiere aún leer datos del JSON --> Pizzería QQTA
    var cantidad = document.getElementById("cantidad").value;
    var result = "";
    var component = document.getElementById("show_components");

    for(var i = 1; i <= cantidad; i++) {
        result += "<div class='flex items-center inter py-4 px-6 mt-12 w-10/12 border border-gray-300 rounded-lg mx-auto'>"
        + "<p>Tamaño de la pizza " + i + " :</p>"
        + "<div class='relative ml-4'>"
        + "<select name='pizza' class='py-2 border border-gray-300 rounded-md appearance-none pr-8 pl-3'>"
        + "<option value='Pequeña'selected>Pequeña</option>"
        + "<option value='Mediana'>Mediana</option>"
        + "<option value='Grande'>Grande</option>"
        + "</select>"
        + "<div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>"
        + "<svg class='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/></svg>"
        + "</div></div></div>";
    }
    component.innerHTML = result;
    replaceClass('load_options', 'flex py-12 justify-end py-4 w-10/12 mx-auto'); // Mostrar botón
}

function clean(attr1, attr2){
    document.getElementById(attr1).value = '';
    document.getElementById(attr2).innerHTML = '';
    replaceClass('load_options', 'py-12 justify-end py-4 w-10/12 mx-auto hidden'); // Esconder botón
}

function replaceClass(id, attr){
    document.getElementById(id).className = attr;
}

function setData(){
    var url = "https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
    let params = new URLSearchParams(location.search);
    let tamaños = params.getAll("pizza");
    let cantidad = params.get("cantidad");
    var msg = "";
    var component = document.getElementById("pizza_data");

    leerJSON(url).then(datos => {
        for(let i = 1; i <= cantidad ; i++){
            msg += "<div class='flex flex-col inter py-4 px-6 w-10/12 mx-auto border border-gray-300 rounded-lg mt-12 justify-start'>";
            msg += "<div class='flex items-center'>"
                + "<p>Escoja sabores para la pizza " + i + " (puede escoger uno o dos):</p>"
                + "<div class='relative ml-4'>"
                + "<select name='pizza1' class='py-2 border border-gray-300 rounded-md appearance-none pr-8 pl-3' onclick='setName(" + i + ", this.value), changeImageURL(" + i + ", this.value)' onchange='listener(" + i + ", this.selectedIndex)'>"; // Primer select para los sabores
                msg += crearOptionsSabores(datos.pizzas);
                msg += "</select>"
                + "<div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>"
                + "<svg class='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/></svg>"
                + "</div></div>";

                msg += "<div class='relative ml-4'>" // Segundo select
                + "<select name='pizza2' id='" + i + "' onclick='optionsValue(this.id), setSecondName(" + i + ", this.value), changeSecondURL(" + i + ", this.value)' class='py-2 border border-gray-300 rounded-md appearance-none pr-8 pl-3'>";
                msg += crearOptionsSabores2(datos.pizzas);
                msg += "</select>"
                + "<div class='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>"
                + "<svg class='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/></svg>"
                + "</div></div></div><div class='flex items-center'><p>Tamaño de la pizza: </p>" + "<input class='ml-2 focus:outline-none' type='text' readonly='readonly' value='" + tamaños[i-1] + "' name='tamaño" + i + "'/></div>"
                + "<p class='mt-2' id='p-" + i + "'>Ingredientes adicionales</p>"
                + "<div class='flex items-center w-1/2'>"
                + "<div class='flex items-center w-1/4'>"
                + "<input type='checkbox' name='check-" + i + "' value='Tocineta'>"
                + "<label for='tocineta' class='ml-2'>Tocineta</label><br>"
                + "</div>"
                + "<div class='flex items-center w-1/4'>"
                + "<input type='checkbox' name='check-" + i + "' value='Salami'>"
                + "<label for='salami' class='ml-2'>Salami</label><br>"
                + "</div>"
                + "<div class='flex items-center w-1/4'>"
                + "<input type='checkbox' name='check-" + i + "' value='Oregano'>"
                + "<label for='oregano' class='ml-2'>Oregano</label><br>"
                + "</div>"
                + "<div class='flex items-center w-1/4'>"
                + "<input type='checkbox' name='check-" + i + "' value='Salchicha'>"
                + "<label for='salchicha' class='ml-2'>Salchicha</label><br>"
                + "</div>"
                + "</div>"
                + "<p class='mt-2' id='p_" + i + "'>Ingredientes adicionales</p>"
                + "<div class='flex items-center w-1/2'>"
                + "<div class='flex items-center w-1/4'>"
                + "<input type='checkbox' name='check_" + i + "' value='" + datos.adicional[0].nombre_ingrediente + "' disabled>"
                + "<label for='tocineta' class='ml-2'>" + datos.adicional[0].nombre_ingrediente + "</label><br>"
                + "</div>"
                + "<div class='flex items-center w-1/4'>"
                + "<input type='checkbox' name='check_" + i + "' value='" + datos.adicional[1].nombre_ingrediente + "' disabled>"
                + "<label for='salami' class='ml-2'>" + datos.adicional[1].nombre_ingrediente + "</label><br>"
                + "</div>"
                + "<div class='flex items-center w-1/4'>"
                + "<input type='checkbox' name='check_" + i + "' value='" + datos.adicional[2].nombre_ingrediente + "' disabled>"
                + "<label for='oregano' class='ml-2'>" + datos.adicional[2].nombre_ingrediente + "</label><br>"
                + "</div>"
                + "<div class='flex items-center w-1/4'>"
                + "<input type='checkbox' name='check_" + i + "' value='" + datos.adicional[3].nombre_ingrediente + "' disabled>"
                + "<label for='salchicha' class='ml-2'>" + datos.adicional[3].nombre_ingrediente + "</label><br>"
                + "</div>"
                + "</div>"
                + "<input type='hidden' name='cantidad' value='" + cantidad + "'>"
                + "<div class='flex items-center mt-4'><div class='w-1/3'><img class='object-cover object-center rounded-md h-64 hidden' src='' id='img-" + i + "'></div>"
                + "<div class='w-1/3 ml-8'><img class='object-cover object-center rounded-md h-64 hidden' src='' id='img_" + i + "'></div></div>"
                + "</div>";
        }
        component.innerHTML = msg;
    })
}

function changeImageURL(i, value){
    let id = "img-" + i;
    document.getElementById(id).classList.remove("hidden");
    var url = "https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
    leerJSON(url).then(datos => {
        for(let j = 0; j < datos.pizzas.length; j++){
            if(datos.pizzas[j].sabor === value){
                document.getElementById(id).setAttribute("src", datos.pizzas[j].url_Imagen);
                break;
            }
        }
    })
}

function changeSecondURL(i, value){
    let id = "img_" + i;
    if(value === "Ninguno") document.getElementById(id).classList.add("hidden");
    else document.getElementById(id).classList.remove("hidden");
    var url = "https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
    leerJSON(url).then(datos => {
        for(let j = 0; j < datos.pizzas.length; j++){
            if(datos.pizzas[j].sabor === value){
                document.getElementById(id).setAttribute("src", datos.pizzas[j].url_Imagen);
                break;
            }
        }
    })
}

function listener(i, value){
    //let change = document.getElementsByName("pizza1")[i - 1].options[value].value;
    let select = document.getElementsByName("pizza1")[i - 1];
    let select2 = document.getElementsByName("pizza2")[i - 1];
    var img = "img" + i;
    var bool = false;
    console.log(value);

    for(let j = 0; j < select.length - 1; j++){
        if(select.options[j].value !== select2.options[j + 1].value){
            bool = true;
            let option = document.createElement("option");
            option.text = select.options[j].value;
            option.value = select.options[j].value;
            select2.add(option, (j + 1));
            break;
        }
    }

    if(select.options[select.length - 1].value !== select2.options[select2.length - 1].value && !bool){
        let option = document.createElement("option");
        option.text = select.options[select.length - 1].value;
        option.value = select.options[select.length - 1].value;
        select2.add(option, select2.length);
    }
    
    document.getElementsByName("pizza2")[i - 1].remove(value + 1);
}

function comentarios(){
    // Los check, para extraer la data en la factura con un ciclo de i = 1 hasta <= cantidad
    // Los tamaños de la pizza se sacan con un getAll("tamaño") --> Se maneja más fácil siendo un array
    // Los sabores se sacan con un getAll --> "pizza1 || pizza2"
    // Los adicionales falta acomodarlos para sacarlos del JSON, para ver bien el proceso lo hice fast por defecto
    // Falta revisar qué valores llegan a "factura.html" para acomodar precios al final
}

function setName(i, value){ // Acomodar el nombre de la pizza en el primer componente 
    var id = "p-" + i;
    var msg = "<p class='mt-2' id='" + id + "'>Ingredientes adicionales ";
    if(value === "Ninguno") msg += "(Escogió ninguno):";
    else msg += "(Pizza " + value + "):";
    msg += "</p>";
    document.getElementById(id).innerHTML = msg;
}

function setSecondName(i, value){ // acomodar el nombre de la pizza en el segundo componente
    var id = "p_" + i;
    var msg = "<p class='mt-2' id='" + id + "'>Ingredientes adicionales ";
    if(value === "Ninguno") msg += "(Escogió ninguno):";
    else msg += "(Pizza " + value + "):";
    msg += "</p>";
    document.getElementById(id).innerHTML = msg;
}

function crearOptionsSabores(pizzas){
    var msg = "";
    for(let i = 0; i < pizzas.length; i++){
        msg += "<option value='" + pizzas[i].sabor + "'>" + pizzas[i].sabor + "</option>";
    }
    return msg;
}

function crearOptionsSabores2(pizzas){
    var msg = "<option value='Ninguno' selected>Ninguno</option>";
    for(let i = 1; i < pizzas.length; i++){
        msg += "<option value='" + pizzas[i].sabor + "'>" + pizzas[i].sabor + "</option>";
    }
    return msg;
}

function optionsValue(id){ // Deshabilitar los checkbox de los adicionales, segunda opción si elige ninguno
    var name = "check" + "_" + id;
    if(document.getElementById(id).value === "Ninguno") document.getElementsByName(name).forEach(element => element.setAttribute("disabled", ""));
    else document.getElementsByName(name).forEach(element => element.removeAttribute("disabled"));
}

function createBill(){ // Armar la facturación del pedido --> Recordar que se omite "Ninguno" en la facturación
    var finalMessage = "<div class='flex flex-col inter mt-12'>"
    + "<table class='min-w-full divide-y divide-gray-200'>"
    + "<thead>"
    + "<tr class='bg-gray-100'>"
    + "<th class='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>descripción</th>"
    + "<th class='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>valor</th>"
    + "</tr>"
    + "</thead>"
    + "<tbody class='bg-white divide-y divide-gray-200'>";
    var url = "https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json";
    var total = 0;
    var params = new URLSearchParams(location.search);
    var cantidad = params.get("cantidad"); // cantidad de pizzas
    var pizza1 = params.getAll("pizza1"); // Sabores de la primera mitad
    var pizza2 = params.getAll("pizza2"); // Sabores de la segunda mitad

    leerJSON(url).then(datos => {
        for(let i = 1; i <= cantidad; i++){
            let param1 = "tamaño" + i;
            let tamaño = params.get(param1); // Tamaño de la n pizza
            var msg = "Pizza " + tamaño;
            var adicional1 = "Adicional-";
            var adicional2 = "Adicional-";
            let ch1 = "check-" + i; 
            let ch2 = "check_" + i;
            let pizzas = datos.pizzas;
            let tmp1 = 0, tmp2 = 0;
            var mayor = 0;

            var sabor1 = pizza1[i-1];
            var sabor2 = pizza2[i-1];

            if(sabor2 === "Ninguno"){
                switch (sabor1) {
                    case 'Napolitana': {
                        msg += " Napolitana";
                        adicional1 += "Napolitana";
                        if(tamaño === 'Pequeña') tmp1 = pizzas[0].precio[2].precio;
                        if(tamaño === 'Mediana') tmp1 = pizzas[0].precio[1].precio;
                        if(tamaño === 'Grande') tmp1 = pizzas[0].precio[0].precio;
                        break;
                    }
    
                    case 'Mexicana': {
                        msg += " Mexicana";
                        adicional1 += "Mexicana";
                        if(tamaño === 'Pequeña') tmp1 = pizzas[1].precio[2].precio;
                        if(tamaño === 'Mediana') tmp1 = pizzas[1].precio[1].precio;
                        if(tamaño === 'Grande') tmp1 = pizzas[1].precio[0].precio;
                        break;
                    }
    
                    case 'Hawayana': {
                        msg += " Hawayana";
                        adicional1 += "Hawayana";
                        if(tamaño === 'Pequeña') tmp1 = pizzas[2].precio[2].precio;
                        if(tamaño === 'Mediana') tmp1 = pizzas[2].precio[1].precio;
                        if(tamaño === 'Grande') tmp1 = pizzas[2].precio[0].precio;
                        break;
                    }
    
                    case 'Vegetariana': {
                        msg += " Vegetariana";
                        adicional1 += "Vegetariana";
                        if(tamaño === 'Pequeña') tmp1 = pizzas[3].precio[2].precio;
                        if(tamaño === 'Mediana') tmp1 = pizzas[3].precio[1].precio;
                        if(tamaño === 'Grande') tmp1 = pizzas[3].precio[0].precio;
                        break;
                    }
                
                    default:
                        break;
                }
            }else{
                msg += " Mitad";
                switch (sabor1) {   
                    case 'Napolitana': {
                        msg += " Napolitana ";
                        adicional1 += "Napolitana";
                        if(tamaño === 'Pequeña') tmp1 = pizzas[0].precio[2].precio;
                        if(tamaño === 'Mediana') tmp1 = pizzas[0].precio[1].precio;
                        if(tamaño === 'Grande') tmp1 = pizzas[0].precio[0].precio;
                        break;
                    }
    
                    case 'Mexicana': {
                        msg += " Mexicana ";
                        adicional1 += "Mexicana";
                        if(tamaño === 'Pequeña') tmp1 = pizzas[1].precio[2].precio;
                        if(tamaño === 'Mediana') tmp1 = pizzas[1].precio[1].precio;
                        if(tamaño === 'Grande') tmp1 = pizzas[1].precio[0].precio;
                        break;
                    }
    
                    case 'Hawayana': {
                        msg += " Hawayana ";
                        adicional1 += "Hawayana";
                        if(tamaño === 'Pequeña') tmp1 = pizzas[2].precio[2].precio;
                        if(tamaño === 'Mediana') tmp1 = pizzas[2].precio[1].precio;
                        if(tamaño === 'Grande') tmp1 = pizzas[2].precio[0].precio;
                        break;
                    }
    
                    case 'Vegetariana': {
                        msg += " Vegetariana ";
                        adicional1 += "Vegetariana";
                        if(tamaño === 'Pequeña') tmp1 = pizzas[3].precio[2].precio;
                        if(tamaño === 'Mediana') tmp1 = pizzas[3].precio[1].precio;
                        if(tamaño === 'Grande') tmp1 = pizzas[3].precio[0].precio;
                        break;
                    }
                
                    default:
                        break;
                }

                msg += "y Mitad ";

                switch (sabor2) {
                    case 'Napolitana': {
                        msg += "Napolitana ";
                        adicional2 += "Napolitana";
                        if(tamaño === 'Pequeña') tmp2 = pizzas[0].precio[2].precio;
                        if(tamaño === 'Mediana') tmp2 = pizzas[0].precio[1].precio;
                        if(tamaño === 'Grande') tmp2 = pizzas[0].precio[0].precio;
                        break;
                    }
    
                    case 'Mexicana': {
                        msg += "Mexicana ";
                        adicional2 += "Mexicana";
                        if(tamaño === 'Pequeña') tmp2 = pizzas[1].precio[2].precio;
                        if(tamaño === 'Mediana') tmp2 = pizzas[1].precio[1].precio;
                        if(tamaño === 'Grande') tmp2 = pizzas[1].precio[0].precio;
                        break;
                    }
    
                    case 'Hawayana': {
                        msg += "Hawayana ";
                        adicional2 += "Hawayana";
                        if(tamaño === 'Pequeña') tmp2 = pizzas[2].precio[2].precio;
                        if(tamaño === 'Mediana') tmp2 = pizzas[2].precio[1].precio;
                        if(tamaño === 'Grande') tmp2 = pizzas[2].precio[0].precio;
                        break;
                    }
    
                    case 'Vegetariana': {
                        msg += "Vegetariana ";
                        adicional2 += "Vegetariana";
                        if(tamaño === 'Pequeña') tmp2 = pizzas[3].precio[2].precio;
                        if(tamaño === 'Mediana') tmp2 = pizzas[3].precio[1].precio;
                        if(tamaño === 'Grande') tmp2 = pizzas[3].precio[0].precio;
                        break;
                    }
                
                    default:
                        break;
                }
            }

            finalMessage += "<tr><td class='px-6 py-4 whitespace-no-wrap'>" + msg + "</td>";

            if(tmp1 >= tmp2){
                total += tmp1;
                mayor = tmp1;
            } 
            else{
                total += tmp2;
                mayor = tmp2;
            }

            finalMessage += "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(mayor) + "</td></tr>";
    
            let check1 = params.getAll(ch1); // Obtener valores de los primeros checkbox
            let check2 = params.getAll(ch2); // Obtener valores de los segundos checkbox

            if(check1.length > 0){
                for(let j = 0; j < check1.length; j++){
                    finalMessage += "<tr><td class='px-6 py-4 whitespace-no-wrap'>" + adicional1 + "-" + check1[j] + "</td>";
                    if(datos.adicional[0].nombre_ingrediente === check1[j]){
                        tmp1 = datos.adicional[0].valor;
                        finalMessage += "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tmp1) + "</td></tr>";
                        total += tmp1;
                    }
                    else if(datos.adicional[1].nombre_ingrediente === check1[j]){
                        tmp1 = datos.adicional[1].valor;
                        finalMessage += "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tmp1) + "</td></tr>";
                        total += tmp1;
                    }
                    else if(datos.adicional[2].nombre_ingrediente === check1[j]){
                        tmp1 = datos.adicional[2].valor;
                        finalMessage += "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tmp1) + "</td></tr>";
                        total += tmp1;
                    }else{
                        tmp1 = datos.adicional[3].valor;
                        finalMessage += "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tmp1) + "</td></tr>";
                        total += tmp1;
                    }
                }
            }else{
                console.log("En la fila " + i + " No hay adicional para la opción 1");
            }

            if(check2.length > 0){
                for(let j = 0; j < check2.length; j++){
                    console.log(check2[j]);
                    finalMessage += "<tr><td class='px-6 py-4 whitespace-no-wrap'>" + adicional2 + "-" + check2[j] + "</td>";
                    if(datos.adicional[0].nombre_ingrediente === check2[j]){
                        tmp2 = datos.adicional[0].valor;
                        finalMessage += "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tmp2) + "</td></tr>";
                        total += tmp2;
                    }
                    else if(datos.adicional[1].nombre_ingrediente === check2[j]){
                        tmp2 = datos.adicional[1].valor;
                        finalMessage += "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tmp2) + "</td></tr>";
                        total += tmp2;
                    }
                    else if(datos.adicional[2].nombre_ingrediente === check2[j]){
                        tmp2 = datos.adicional[2].valor;
                        finalMessage += "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tmp2) + "</td></tr>";
                        total += tmp2;
                    }else{
                        tmp2 = datos.adicional[3].valor;
                        finalMessage += "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(tmp2) + "</td></tr>";
                        total += tmp2;
                    }
                }
            }else{
                console.log("En la fila " + i + " No hay adicional para la opción 2");
            }
        }
        finalMessage += "<tr class='bg-gray-100'><td class='px-6 py-4 whitespace-no-wrap'>Total:</td>"
        + "<td class='px-6 py-4 whitespace-no-wrap'>" + new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(total) + "</td></tr>";
        finalMessage += "</tbody></table>";
        document.getElementById("showBill").innerHTML = finalMessage;
        console.log(total);
    })
}