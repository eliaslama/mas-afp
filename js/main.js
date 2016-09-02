$(function () {
    google.charts.load('current', {'packages': ['corechart']});
    $("#btn-simular").click(function () {
        $("#resultados").hide();
        var simulador = prepararSimulador();
        dibujarGrafico(simulador);
        poblarTabla(simulador);
        $("#resultados").show();
    });
});

/**
 * Según los datos ingresados en el formulario, crea el simulador que nos dará
 * la información de las pensiones.
 * @returns {Simulador}
 */
function prepararSimulador() {
    var ingresos = obtenerIngresos();
    var afp = $("#afp").val();
    var fondo = $("#fondo").val();
    return new Simulador(ingresos, afp, fondo);
}

/**
 * Si funciona en modo avanzado, obtiene el del formulario el listado de
 * ingresos por periodos. Si funciona en modo simple, genera periodos de
 * ingresos con lagunas de un año distribuidas uniformemente.
 * @returns {Array}
 */
function obtenerIngresos() {
    return [];
}

/**
 * Génera el gráfico según los datos obtenidos del simulador.
 * @param {Simulador} simulador
 */
function dibujarGrafico(simulador) {
    var data = google.visualization.arrayToDataTable([
        ['Item', 'Monto'],
        ['Commisiones', simulador.getComisiones()],
        ['Ahorro', simulador.getAhorro()],
        ['Rentabilidad', simulador.getRentabilidad()]
    ]);

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data);
}

/**
 * 
 * @param {Simulador} simulador
 */
function poblarTabla(simulador) {
    $("#pension-renta-vitalicia").text("$" + simulador.getPensionRentaVitalicia().formatMoney());
    $("#pension-retiro-programado").text("$" + simulador.getPensionRetiroProgramado().formatMoney());
    $("#trabajadores-reparto").text(simulador.getTrabajadoresReparto());
}
