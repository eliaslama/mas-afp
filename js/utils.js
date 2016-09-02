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
