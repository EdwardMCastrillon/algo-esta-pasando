
import InitActions from "./containers/InitActions";

import features from "./constants/features";

import HomePage from "./containers/HomePage";
import PhotoPage from "./containers/PhotoPage";
import FeaturedPage from "./containers/FeaturedPage";

export default {

    home: {
        path: "/",
        method: "get",
        handler: HomePage
    },

    featured: {
        path: `/iniio/:feature(${features.join("|")})`,
        method: "get",
        handler: FeaturedPage,
    },

    photo: {
        path: "/photo/:id",
        method: "get",
        handler: PhotoPage,
    },
};
