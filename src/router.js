import { createRouter, createWebHistory } from "vue-router";
import  GameView  from './views/GameView.vue';
import RegisterView from './views/RegisterView.vue';
import LoginView from './views/LoginView.vue';
import QuizView from './views/QuizView.vue';
import GameFinished from './views/GameFinished.vue'
import DaHome from './views/DaHome.vue'

const routes = [
    {path: '/', component: RegisterView },
    {path: '/game', component: GameView },
    {path: '/login', component: LoginView},
    {path: '/quizz', component: QuizView},
    {path: '/gameFinish', component: GameFinished},
    {path:'/home', component: DaHome}
];

const history = createWebHistory()

const router = createRouter({
    history,
    routes
});

export default router;