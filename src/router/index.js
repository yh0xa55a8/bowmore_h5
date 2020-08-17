import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "@/views/Welcome";
import Boat from "@/views/Boat";
import Technique from "@/views/Technique";
import Cellar from "@/views/Cellar";
import Question from "@/views/Question";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/welcome"
  },
  {
    path: "/welcome",
    name: "welcome",
    component: Welcome
  },
  {
    path: "/boat",
    name: "boat",
    component: Boat
  },
  {
    path: "/tech",
    name: "tech",
    component: Technique
  },
  {
    path: "/cellar",
    name: "cellar",
    component: Cellar
  },
  {
    path: "/question",
    name: "question",
    component: Question
  }
];

const router = new VueRouter({
  routes
});

export default router;
