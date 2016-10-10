const FunctExtra = {
    accentDecode(tx) {
        var rp = String(tx)
        rp = rp.replace(/&aacute;/g, 'á')
        rp = rp.replace(/&eacute;/g, 'é')
        rp = rp.replace(/&iacute;/g, 'í')
        rp = rp.replace(/&oacute;/g, 'ó')
        rp = rp.replace(/&uacute;/g, 'ú')
        rp = rp.replace(/&ntilde;/g, 'ñ')
        rp = rp.replace(/&uuml;/g, 'ü')
        //
        rp = rp.replace(/&Aacute;/g, 'Á')
        rp = rp.replace(/&Eacute;/g, 'É')
        rp = rp.replace(/&Iacute;/g, 'Í')
        rp = rp.replace(/&Oacute;/g, 'Ó')
        rp = rp.replace(/&Uacute;/g, 'Ú')
        rp = rp.replace(/&Ñtilde;/g, 'Ñ')
        rp = rp.replace(/&Üuml;/g, 'Ü')
        return rp
    },
    closedNav(){
        document.querySelector('#app').className = 'closed';
    },
    utf8_encode(argString) {
        if (argString === null || typeof argString === 'undefined') {
            return ''
        }

        // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        var string = (argString + '')
        var utftext = ''
        var start
        var end
        var stringl = 0

        start = end = 0
        stringl = string.length
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n)
            var enc = null

            if (c1 < 128) {
                end++
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                )
            } else if ((c1 & 0xF800) !== 0xD800) {
                enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                )
            } else {
                // surrogate pairs
                if ((c1 & 0xFC00) !== 0xD800) {
                    throw new RangeError('Unmatched trail surrogate at ' + n)
                }
                var c2 = string.charCodeAt(++n)
                if ((c2 & 0xFC00) !== 0xDC00) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1))
                }
                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000
                enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                )
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end)
                }
                utftext += enc
                start = end = n + 1
            }
        }

        if (end > start) {
            utftext += string.slice(start, stringl)
        }

        return utftext
    }
};

export default FunctExtra;
