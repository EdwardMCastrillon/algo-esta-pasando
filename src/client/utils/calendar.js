const Calendar = {
    init(mes){
        var yyyy = new Date().getFullYear();
        let f = `01/${mes}/${yyyy}`;
        var cDias =  this.cantidadDias(f);
        // var dia = this.primerDia(f)
        return this.showCalendar(cDias,mes);
    },
    primerDia(fecha){
        var fechaf = fecha.split("/");
        var d = fechaf[0];
        var m = fechaf[1];
        var y = fechaf[2];
        return (new Date(y, m, d)).getDay();
    },
    cantidadDias(fecha) {
        var fechaf = fecha.split("/");
        var d = fechaf[0];
        var m = fechaf[1];
        var y = fechaf[2];
        console.log((new Date(y, m, 0)));
        return (new Date(y, m, 0)).getDate();

        // return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
    },
    meses(){
        return ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    },
    dia(){
        return ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
    },
    showCalendar(dias,mm){
        let html = ''
        var yyyy = new Date().getFullYear();
        console.log(new Date(yyyy, mm-1, 1));
        //
        for (var i = 0; i < dias; i++) {

            html += `<span class="flex column"><span>${this.dia()[this.primerDia(`${i+1}/${mm-1}/${yyyy}`)]}</span>${i+1}</span>`;
        }
        return html
    }
}
export default Calendar;
