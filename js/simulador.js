function Simulador(ingresos, afp, fondo, edadJubilacion) {
    this.ingresos = ingresos;
    this.afp = afp;
    this.fondo = fondo;
    this.edadJubilacion = edadJubilacion;

    /**
     * Calcula el total de las comisiones pagadas por el cotizante durante toda
     * su vida.
     * @returns {Number}
     */
    this.getComisiones = function () {
        return 10;
    };

    /**
     * Suma todo lo que el cotizante destinó al ahorro durante su vida.
     * @returns {Number}
     */
    this.getAhorro = function () {
        return 100;
    };

    /**
     * Calcula el monto que la AFP pudo generar durante 
     * @returns {Number}
     */
    this.getRentabilidad = function () {
        return 120;
    };

    /**
     * Monto de la pensión que recibiría un jubilado si se suscribe al programa
     * de Renta Vitalicia.
     * @returns {Number}
     */
    this.getPensionRentaVitalicia = function () {
        return 100000;
    };

    /**
     * Monto de la pensión que recibiría un jubilado si se suscribe al programa
     * de Retiro Programado.
     * @returns {Number}
     */
    this.getPensionRetiroProgramado = function () {
        return 90000;
    };

    /**
     * Calcula en número de trabajadores activos que se tendrían que necesitar
     * para entregar esta misma pensión en un sistema de reparto.
     * @returns {Number}
     */
    this.getTrabajadoresReparto = function () {
        return 10;
    };

    /**
     * Genera una matriz en la que se ve el progreso de los ahorros del
     * cotizante.
     * @returns {Array}
     */
    this.getEvolucionAhorro = function () {
        return [
            ['Año', 'Ahorro', 'Rentabilidad', 'Comisión', 'Acumulado'],
            ['2014', 10000, 0, -1000, 10000],
            ['2015', 10000, 3000, -1000, 23000],
            ['2016', 10000, 5000, -1000, 38000]
        ];
    };

}