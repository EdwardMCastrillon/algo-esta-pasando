//toca cambiar el handler para que sea un solo componente

import Inicio from './containers/inicio'
import Contenido from './containers/contenido'
import Recursos from './containers/recursos'
import Perfiles from './containers/perfiles'

export default {

    home: {
        path: "/",
        method: "get",
        handler: Inicio,
        id:111
    },
    contenido: {
        path: "/contenido",
        method: "get",
        handler: Contenido,
        id:118
    },
    recursos:{
        path : "/centro_de_recursos",
        method:"get",
        handler: Recursos,
        id:211
    },
    perfiles:{
        path: "/autores",
        method: "get",
        handler: Perfiles,
        id:183
    }
};
