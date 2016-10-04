/**
 * 
 * @param {Date} fecha
 * @param {Fondo} fondo
 * @param {Number} sueldo_imponible
 * @returns {Hito}
 */
function Hito(fecha, fondo, sueldo_imponible) {
    this.fecha = fecha;
    this.fondo = fondo;
    this.sueldo_imponible = sueldo_imponible;
    
    /**
     * Retorna la fecha en la que sucede el hito.
     * @returns {Date}
     */
    this.getFecha = function () {
        return this.fecha;
    };
    
    /**
     * Retorna el fondo que corresponde al hito.
     * @returns {Fondo}
     */
    this.getFondo = function () {
        return this.fondo;
    };
    
    /**
     * Retorna el sueldo imponible que corresponde al hito.
     * @returns {Number}
     */
    this.getSueldoImponible = function () {
        return this.sueldo_imponible;
    };
}
/**
 * 
 * @param {[Int]} ingresos Ingresos durante la vida laboral, para lagunas
 * simplemente llenar con 0. Debe tener size == n. Debe ser el ingreso
 * imponible, pues es sobre este que se cotiza el 10%.
 * @param {[float]} comisiones Comisiones durante la vida laboral, porcentaje
 * sobre el ingreso del mes correspondiente. Debe tener size == n.
 * @param {[float]} rentabilidades Rentabilidades durante periodo.
 * @returns {Calculadora}
 */
function Calculadora(ingresos, comisiones, rentabilidades) {
    var cotizacion = 0.1;
    this.ingresos = ingresos;
    this.comisiones = comisiones;
    this.rentabilidades = rentabilidades;

    if(this.ingresos.length !== this.comisiones.length
       || this.ingresos.length !== this.rentabilidades.length) {
        throw "Tamano de los arreglos debe coincidir.";
    }
    
    this.meses = this.ingresos.length;
    // Evolucion del fondo durante el tiempo
    this.fondo = new Array(this.meses + 1);
    // Acumulado de comisiones pagadas para cada mes.
    this.comisiones_pagadas = new Array(this.meses + 1);
    // Plata destinada desde el sueldo a pension (ahorro + comision).
    this.inversion_pension = new Array(this.meses + 1);
    this.fondo[0] = 0;
    
    for(var i = 1; i <= this.meses; i++) {
        this.fondo[i] = (
                this.fondo[i - 1]
                + this.fondo[i - 1] * this.rentabilidades[i - 1]
                + this.ingresos[i - 1] * cotizacion);
        this.comisiones_pagadas[i] = (
                this.comisiones_pagadas[i - 1]
                + this.ingresos[i - 1] * this.comisiones[i - 1]);
        this.inversion_pension[i] = (
                this.inversion_pension[i - 1]
                + this.ingresos[i - 1] * (this.comisiones[i - 1] + cotizacion));
    }
    
    
    /**
     * Calcula el total de las comisiones pagadas por el cotizante durante toda
     * su vida.
     * @returns {Number}
     */
    this.getComisiones = function () {
        return this.comisiones_pagadas[this.meses];
    };

    /**
     * Suma todo lo que el cotizante destinó al ahorro durante su vida.
     * @returns {Number}
     */
    this.getAhorro = function () {
        return this.inversion_pension[this.meses] - this.getComisiones();
    };
    
    /**
     * Cantidad de dinero en el fondo en el mes especificado
     * @param {Int} mes Mes donde se obtiene el tamano del fondo.
     * @returns {Number} Cantidad de dinero en el fondo.
     */
    this.getFondo = function(mes) {
        return this.fondo[mes];
    };

    /**
     * Calcula el monto generado por la AFP.
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

/**
 * Simulador de fondo de pension a lo largo del tiempo.
 * @param {[Hito]} hitos Hitos en la vida laboral del trabajador.
 * @param {Date} simular_hasta Fecha hasta la que se debe efectuar la
 * simulacion.
 * @returns {Simulador}
 */
function Simulador(hitos, simular_hasta) {
    this.hitos = hitos;
    this.simular_hasta = simular_hasta;
    
    // No pueden haber hitos antes de esta fecha.
    var prev_date = new Date("December 31, 1979 23:59:59");
    for(var i = 0; i < this.hitos.length; i++) {
        if(this.hitos[i].getFecha() < prev_date)
            throw "Fecha debe ser posterior a diciembre 1979 y estar ordenadas";
        prev_date = this.hitos[i].getFecha();
    
    function calcular_ingresos() {
        var ingresos = [];
        var last_ingreso = 0;
        var idx = 0;
        var date = this.hitos[idx].getFecha();
        while(date <= simular_hasta) {
            if(idx < this.hitos.length && date === this.hitos[idx].getFecha()) {
                last_ingreso = this.hitos[idx].sueldo_imponible();
                idx++;
            }
            ingresos.push(last_ingreso);
            
        }
    }
    this.ingresos = [];
    }
    
}