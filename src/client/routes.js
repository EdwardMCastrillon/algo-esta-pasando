//toca cambiar el handler para que sea un solo componente

import Inicio from './containers/inicio'
import Contenido from './containers/contenido'
import Recursos from './containers/recursos'
import Perfiles from './containers/perfiles'
import Agenda from './containers/agenda'
import Perfil from './components/perfil'
import Post from './components/post'
import PosContenido from './components/contenido'


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
    }
};
