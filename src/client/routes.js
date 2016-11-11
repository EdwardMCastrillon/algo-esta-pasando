//toca cambiar el handler para que sea un solo componente

import Inicio from './containers/inicio'
import Contenido from './containers/contenido'
import Sobre_algo_esta_pasando from './containers/sobre_algo_esta_pasando'
import Recursos from './containers/recursos'
import Perfiles from './containers/perfiles'
import Mapa from './containers/map'
import Ediciones from './containers/ediciones'
import Agenda from './containers/agenda'
import Perfil from './components/perfil'
import Editorial from './components/editorial'
import Publicar_en_aep from './components/publicar_en_aep'
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
    postAgenda: {
        path: "/agenda/:id",
        method: "get",
        handler: PosContenido
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
    },
    sobre_algo_esta_pasando:{
        path:"/sobre_algo_esta_pasando",
        method: "get",
        handler: Sobre_algo_esta_pasando,
    },
    posSobre_algo_esta_pasando: {
        path: "/sobre_algo_esta_pasando/:id",
        method: "get",
        handler: PosContenido,
        id:118
    },
    publicar_en_aep: {
        path: "/publicar_en_aep",
        method: "get",
        handler: Publicar_en_aep,
    },
    editorial: {
        path: "/editorial",
        method: "get",
        handler: Editorial,
    }
};
