$.noConflict();
var dnies = ["45751880G", "16087431N"];
var nombres = new Array();
nombres['45751880G'] = "Imanol";
nombres['16087431N'] = "Marta";
var apellidos = new Array();
apellidos["45751880G"] = "Jimenez Lopez";
apellidos["16087431N"] = "Rivera del Amo";
var nUF1841 = new Array();
nUF1841['45751880G'] = 6;
nUF1841['16087431N'] = 7;
var nUF1842 = new Array();
nUF1842['45751880G'] = 4;
nUF1842['16087431N'] = 9;
var nUF1843 = new Array();
nUF1843['45751880G'] = 8;
nUF1843['16087431N'] = 10;
var nUF1844 = new Array();
nUF1844['45751880G'] = 6;
nUF1844['16087431N'] = 9;
var nUF1845 = new Array();
nUF1845['45751880G'] = 5;
nUF1845['16087431N'] = 5;
var nUF1846 = new Array();
nUF1846['45751880G'] = 4;
nUF1846['16087431N'] = 4;


jQuery(document).ready(function($) {
    function cargarAlumnos() {
        var cantidad = dnies.length;
        for (var i = 0; i < cantidad; i++) {
            var dni = dnies[i];
            var nombre = nombres[dni];
            var apellido = apellidos[dni];
           // var notaMedia = parseFloat((nUF1841[dni] + nUF1842[dni] + nUF1843[dni] + nUF1844[dni] + nUF1845[dni] + nUF1846[dni]) / 6).toFixed(2);
            var html_text =
                "<tr>" +
                    "<td align='center'><input type='checkbox' value='" + dni + "'/></td>" +
                    "<td>" + nombre + "</td>" +
                    "<td>" + apellido + "</td>" +
                    "<td>" + nUF1841[dni] + "</td>" +
                    "<td>" + nUF1842[dni] + "</td>" +
                    "<td>" + nUF1843[dni] + "</td>" +
                    "<td>" + nUF1844[dni] + "</td>" +
                    "<td>" + nUF1845[dni] + "</td>" +
                    "<td>" + nUF1846[dni] + "</td>" +
                    "<td id='media'>" + calcularMedia([nUF1841[dni], nUF1842[dni], nUF1843[dni], nUF1844[dni], nUF1845[dni], nUF1846[dni]]) + "</td>" +
                /*      "<td>" + notaMedia + "</td>" +*/
                    "<td align='center'><button>Editar</button></td>" +
                "</tr>";
            $('#listado-alumnos tbody').append(html_text);
        }
        mostrarNAlumnos();
    }

    $("#listado-alumnos tbody button").click(function (e) {
        alert("Has pulsado en editar click");
    });
    $("#listado-alumnos tbody").on("click", "button", function (e) {
        alert("Has pulsado en editar con ON");
    });
    $("#listado-alumnos thead input").click(function (e) {
        // $("#listado-alumnos tbody input[type='checkbox']").checked(true);
        //attr vs (prop e is) ---> tiempo de carga
        // prop vs is ---> prop identifica elementos cargados dinamicamente mientras is no

        if ($(this).prop("checked")) {
            $("#listado-alumnos tbody input").prop("checked", true);
        } else {
            $("#listado-alumnos tbody input").prop("checked", false);
        }


    });
    cargarAlumnos();
    $("a[href='s1'],a[href='#s2']").click(function (e) {
        e.preventDefault();

    });
    $('#productos').find("a.btn").click(function (e) {
        var dni = $('#dni').val();
        var letra =calcularLetra(parseInt(dni,10));
        $('#productos').find("span.resultado").text(letra);
        e.preventDefault();
        return false;
    });
    $("#alumnos div button.btn-info").on("click", function (e) {
        //alert("Has pulsado añadir");
        $("#myModal").css("display", "block");

        $("#aceptar").click(function (e) {
            dnies.push($("#dni").val());
            nombres[$("#dni").val()].push($("#nombre").val());
            apellidos[$("#dni").val()].push($("#apellidos").val());
            nUF1841[$("#dni").val()].push($("#nUF1841").val());
            nUF1842[$("#dni").val()].push($("#nUF1842").val());
            nUF1843[$("#dni").val()].push($("#nUF1843").val());
            nUF1844[$("#dni").val()].push($("#nUF1844").val());
            nUF1845[$("#dni").val()].push($("#nUF1845").val());
            nUF1846[$("#dni").val()].push($("#nUF1846").val());
            $("#myModal").css("display", "none");
        })

    });


    $("#alumnos div button.btn-danger").on("click", function (e) {
        //0 Recoger el dni de la vista
        var codigo =  $("#listado-alumnos tbody tr input:checked").each(function() {
            alert($(this).val());
        });
        //1 Borrado de la vista
        borradoVista();
        //2 Borrado de la BBDD
        borradoBBDD(codigo);
        mostrarNAlumnos();

    });
    /*
    $("#myModal").click(function (e) {
        $("#myModal").css("display", "none");
    });
    */
    function mostrarNAlumnos() {
        $("#alumnos div span:eq(0)").text("Número de Alumnos: " + dnies.length)
    }
    function borradoVista() {
        $("#listado-alumnos tbody tr input:checked").parents("tr").remove();
    }


});
function calcularLetra(numero){
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    var letraCalculada;
    letraCalculada = letras[numero % 23];
    return letraCalculada;
}
function borradoBBDD(codigo) {
    var i = 0;
    var len = dnies.length;
    var found = false;
    var pos = -1;
    while (i < len && found == false) {
        if (codigo == dnies[i]) {
            found = true;
            pos = i;
        }
        i++;
    }
    if (pos != -1) {
        dnies.splice(pos, 1);
        delete nombres[codigo];
        delete apellidos[codigo];
        //....
    }
}
function calcularMedia(numeros) {
    var media = 0;
    for(i = 0 ; i < numeros.length ; i++){
        media = media + numeros[i];
    }
    media = parseFloat(media / numeros.length).toFixed(2);

    return media;
}
