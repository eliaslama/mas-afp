/**
 * Combierte un número a un String formateado.
 * 
 * @param {Number} c número de decimales
 * @param {String} d separador de decimales
 * @param {String} t separador de miles
 * @link http://stackoverflow.com/a/149099/6014359
 * @author Patrick Desjardins (stackoverflow)
 * @returns {String} Número formateado
 */
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
            c = isNaN(c = Math.abs(c)) ? 0 : c,
            d = d === undefined ? "," : d,
            t = t === undefined ? "." : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

Date.prototype.myEqual = function(d2) {
    return this.getTime() === d2.getTime();
};

/**
 * Parse a date string in the yyyy-mm-dd format.
 * 
 * @param {string} input
 * @returns {Date}
 */
function parseDate(input) {
  var parts = input.split('-');
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

Date.prototype.YearMonthEqual = function(d2) {
    return this.getFullYear() === d2.getFullYear()
        && this.getMonth() === d2.getMonth();
};

function DataGetter() {    
//    this._base_url = "http://localhost:8000";
    this._base_url = "http://54.153.17.120:3492";
    $.ajaxSetup({
        timeout: 3000, 
        retryAfter:7000
    });
    
    this._rentabilidad = $.ajax(
            {url: this._base_url + "/api/indicador/realmensual/"}
    ).then(function(result){
            ret_val = [];
            if (result.status !== 'ok')
                throw "Error getting data:" + result.status;
            var data = result.data;
            for (var i = 0; i < data.length; i++) {
                date = parseDate(data[i].fecha);
                var year = date.getFullYear();
                var month = date.getMonth();
                if (ret_val[year] === undefined)
                    ret_val[year] = [];
                if (ret_val[year][month] === undefined)
                    ret_val[year][month] = [];
                ret_val[year][month][data[i].fondo] = data[i].variacion;
        }
        return ret_val;
    });
    
    this._monthly_uf = function(year_from, year_to) {
        return $.ajax({
            url: this._base_url + "/api/indicador/uf_mensual",
            data:{year_from:year_from, year_to:year_to}
        }).then(function(result){
            /**
             * Returns an array containing the array of dates gathered and
             * the array of values corresponding to each date. The date has as
             * valid fields only year and month: [[dates], [values]].
             */
            ret_val = [];
            ret_dates = [];
            if(result.status !== 'ok')
                throw "Error getting data:" + result.status;
            var data = result.data;
            for(var i = 0; i < data.length; i++) {
                ret_dates.push(parseDate(data[i].fecha));
                ret_val.push(data[i].valor);
            }
            return [ret_dates, ret_val];
        });
    };
    
    /**
     * Obtener rentabilidad para una fecha en especifico.
     * 
     * @param {Date} date Fecha de la cual se desea obtener rentabilidad.
     * @param {func} callback Funcion para llamar con el resultado.
     * @returns {jquery.Promise}
     */
    this.getRentabilidad = function(date, callback) {
        return this._rentabilidad.done(function(rentabilidad) {
            var val = rentabilidad[date.getFullYear()][date.getMonth()];
            callback(val/1000);
        }).promise();
    };
    
    /**
     * Obtener rentabilidades para un arreglo de fechas.
     * @param {type} dates
     * @param {type} fondos
     * @returns {jquery.Promise}
     */
    this.getRentabilidades = function(dates, fondos) {
        return this._rentabilidad.then(function(rentabilidad) {
            if(dates.length !== fondos.length)
                throw "Dates y Fondos deben tener mismo largo";
            var res = new Array(fondos.length);
            for(var i = 0; i < dates.length; i++) {
                var date = dates[i];
                res[i] = rentabilidad[date.getFullYear()][date.getMonth()][fondos[i]]/1000;
            }
            return res;
        }).promise();
    };
    
    /**
     * Retorna UF del ultimo día del mes especificado.
     * 
     * @param {[Dates]} dates - Arreglo de fechas para las que se quieren
     * obtener los valores, deben estar en orden de más antiguo a más nuevo.
     * @returns {jquery.Promise}
     */
    this.getUFs = function(dates) {
        return this._monthly_uf(dates[0].getFullYear(),
                                dates[dates.length - 1].getFullYear()).then(
            function(ufs_raw){
                var ret_val = [];
                var raw_idx = 0;
                var date_idx = 0;
                while(raw_idx < ufs_raw[0].length && date_idx < dates.length) {
                    if(ufs_raw[0][raw_idx].YearMonthEqual(dates[date_idx])) {
                        ret_val.push(ufs_raw[1][raw_idx]);
                        date_idx++;
                    }
                    raw_idx++;
                }
                return ret_val;
            }).promise();
    };
}