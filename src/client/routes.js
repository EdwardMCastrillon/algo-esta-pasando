//toca cambiar el handler para que sea un solo componente

import Inicio from './containers/inicio'
import Contenido from './containers/contenido'
import Recursos from './containers/recursos'
import Perfiles from './containers/perfiles'
import Perfil from './components/perfil'
import Post from './components/post'

export default {

    home: {
        path: "/",
        method: "get",
        handler: Inicio,
        handlerid: Post,
        pathId: "/post/:id",
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
    },
    perfil:{
        path: "/autor/:id",
        method: "get",
        handler: Perfil,
        id:"183A"
    }
};
