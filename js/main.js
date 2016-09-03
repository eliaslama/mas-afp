$(function () {
    google.charts.load('current', {'packages': ['corechart']});
    $("#btn-simular").click(function () {
        $("#resultados").show();
        var simulador = prepararSimulador();
        dibujarGraficoTorta(simulador);
        poblarTabla(simulador);
        dibujarGraficoHistorico(simulador);
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
    var edadJubilacion = $("#edad-jubilacion").val();
    return new Simulador(ingresos, afp, fondo, edadJubilacion);
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
function dibujarGraficoTorta(simulador) {
    var data = google.visualization.arrayToDataTable([
        ['Item', 'Monto'],
        ['Commisiones', simulador.getComisiones()],
        ['Ahorro', simulador.getAhorro()],
        ['Rentabilidad', simulador.getRentabilidad()]
    ]);

    var options = {colors: ['#dc3912', '#3366cc', '#109618', '#ff9900']};

    var chart = new google.visualization.PieChart(document.getElementById('grafico-torta'));
    chart.draw(data, options);
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

/**
 * Génera el gráfico según los datos obtenidos del simulador.
 * @param {Simulador} simulador
 */
function dibujarGraficoHistorico(simulador) {
    var data = google.visualization.arrayToDataTable(simulador.getEvolucionAhorro());

    var options = {
        isStacked: true,
        seriesType: 'bars',
        series: {
            3: {
                type: 'line',
                targetAxisIndex: 1
            }
        },
        colors: ['#3366cc', '#109618', '#dc3912', '#ff9900'],
        vAxes: {
            0: {title: 'Inversión Mensual'},
            1: {title: 'Total acumulado'}
        }
    };

    var chart = new google.visualization.ComboChart(document.getElementById('grafico-historico'));

    chart.draw(data, options);
}
