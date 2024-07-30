import Introduction from "../pages/introduction.js";
import Narrate from "../pages/narrate.js";
import TwoBind from "../pages/twoBind.js";

const router = new VueRouter({
    routes: [
        { name: "introduction", path: "/introduction", component: Introduction },
        { name: "narrate", path: "/narrate", component: Narrate },
        { name: "twoBind", path: "/twoBind", component: TwoBind }
    ]
});

export default router;
