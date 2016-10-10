const Calendar = {
    init(mes){
        let f = `01/${mes}/2016`;
        return this.existeFecha(f);
    },
    existeFecha(fecha) {
        var fechaf = fecha.split("/");
        var d = fechaf[0];
        var m = fechaf[1];
        var y = fechaf[2];
        return (new Date(y, m, 0)).getDate();
        // return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
    },
    meses(){
        return ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    }
}
export default Calendar;
