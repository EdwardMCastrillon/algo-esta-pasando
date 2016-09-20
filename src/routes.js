import Inicio from './components/inicio'
import Contenido from './components/contenido'

export default {

    home: {
        path: "/",
        method: "get",
        handler: Inicio
    },
    contenido: {
        path: "/contenido",
        method: "get",
        handler: Contenido,
    },
};
// featured: {
//     path: `/iniio/:feature(${features.join("|")})`,
//     method: "get",
//     handler: FeaturedPage,
// },
