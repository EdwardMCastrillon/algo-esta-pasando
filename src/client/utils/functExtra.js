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
    }
};

export default FunctExtra;
