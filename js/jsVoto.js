$(document).ready(function () {

    google.charts.load('current', {packages: ['corechart']});
    var img = localStorage.getItem("imagen");
    var desc = localStorage.getItem("descripcion");
    var nombre = localStorage.getItem("nombre");
    nodo = `<div class="item">
            <h3>${nombre}</h3>
            <div class="info">
            <img src=${img}></img>
            <br>
            <span>Description: <br>${desc}</span><br></div>
        </div>`;
    $('#results').append(nodo);

    $("#votar").on("click", function () {
     
        if ($("#telefono").val()==""||$("#localidad").val()==""||$("#voto").val()==""||$("#email").val()==""||$("#apellidos").val()==""||$("#nombre").val()=="") {
            alert("No dejes ningun campo vacio")
        } else
        {
            $("#votacion").css("display", "none");
            if (localStorage.getItem(nombre)) {
                var voto = parseInt(localStorage.getItem(nombre)) + parseInt($("#voto").val());
                localStorage.setItem(nombre, voto);
            } else {
                var numero = $("#voto").val();
                if (numero == 0 || numero == null || numero == undefined) {
                    numero = 0;
                }
                var voto = localStorage.setItem(nombre, numero);
            }
        }



    });

    $("#tarta").on("click", function () {

        google.charts.setOnLoadCallback(drawStuff);

        var focalizar = $('#gra').position().top;
        $('html,body').animate({
            scrollTop: focalizar
        }, 500);

    });

    function drawStuff() {
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Películas');
        data.addColumn('number', 'Puntuación');

        var opciones = {
            'title': 'Puntuaciones:',
            'width': '600',
            'height': '300'
        };


        for (var i = 0; i < localStorage.length; i++) {

            var valor = localStorage.getItem(localStorage.key(i))

            //la magia
            if (!isNaN(valor)) {
                data.addRows([[localStorage.key(i), parseInt(valor)]]);
            }
        }









        var chart;

        chart = new google.visualization.AreaChart(document.getElementById('graficos1'));
        chart.draw(data, opciones);
    }

});