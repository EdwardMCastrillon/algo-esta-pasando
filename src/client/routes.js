//toca cambiar el handler para que sea un solo componente

import Inicio from './containers/inicio'
import Contenido from './containers/contenido'
import Recursos from './containers/recursos'
import Perfiles from './containers/perfiles'
import Mapa from './containers/map'
import Ediciones from './containers/ediciones'
import Agenda from './containers/agenda'
import Perfil from './components/perfil'
import PosContenido from './components/contenido'
import PosContenido1 from './components/contenido1'


export default {

    home: {
        path: "/",
        method: "get",
        handler: Contenido,
    },
    agenda: {
        path: "/agenda",
        method: "get",
        handler: Agenda
    },
    posContenido: {
        path: "/contenido/:id",
        method: "get",
        handler: PosContenido,
    },
    posAeP: {
        path: "/aep/:id",
        path1: "/aep_/:id",
        method: "get",
        handler: PosContenido,
        handler1: PosContenido1,
    },
    recursos:{
        path : "/centro_de_recursos",
        method:"get",
        handler: Recursos,
    },
    posRecursos: {
        path: "/centro_de_recursos/:id",
        method: "get",
        handler: PosContenido,
        id:118
    },
    posComentarios: {
        path: "/comentarios/:id",
        method: "get",
        handler: PosContenido,
        id:118
    },
    perfiles:{
        path: "/autores",
        method: "get",
        handler: Perfiles,
        id:183
    },
    perfil:{
        path: "/autores/:id",
        method: "get",
        handler: Perfil,
        id:"183A"
    },
    map:{
        path: "/mapa",
        method: "get",
        handler: Mapa,
        id:183
    },
    ediciones:{
        path:"/ediciones_anteriores",
        method: "get",
        handler: Ediciones,
    }
};
