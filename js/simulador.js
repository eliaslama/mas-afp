function Simulador(ingresos, afp, fondo) {
    this.ingresos = ingresos;
    this.afp = afp;
    this.fondo = fondo;

    /**
     * 
     * @returns {Number}
     */
    this.getComisiones = function () {
        return 10;
    };

    this.getAhorro = function () {
        return 100;
    };

    this.getRentabilidad = function () {
        return 120;
    };

    this.getPensionRentaVitalicia = function () {
        return 100000;
    };

    this.getPensionRetiroProgramado = function () {
        return 90000;
    };

    this.getTrabajadoresReparto = function () {
        return 10;
    };

}