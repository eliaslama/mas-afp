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

function DataGetter() {    
//    this._base_url = "http://localhost:8000";
    this._base_url = "http://54.153.17.120:8000";
    $.ajaxSetup({
        timeout: 3000, 
        retryAfter:7000
    });
    
    this._rentabilidad = $.ajax(
            {url: this._base_url + "/api/indicador/realmensual"}
    ).then(function(result){
            ret_val = [];
            if (result.status !== 'ok')
                throw "Error getting data:" + result.status;
            var data = result.data;
            for (var i = 0; i < data.length; i++) {
                date = new Date(Date.parse(data[i].fecha));
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
    
    
    this.get_rentabilidad = function(date, callback) {
        this._rentabilidad.done(function(rentabilidad) {
            var val = rentabilidad[date.getFullYear()][date.getMonth()];
            callback(val);
        });
    };
}