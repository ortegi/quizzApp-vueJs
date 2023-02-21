import { createRouter, createWebHistory } from "vue-router";
import  GameView  from './views/GameView.vue';
import RegisterView from './views/RegisterView.vue';
import LoginView from './views/LoginView.vue';
import QuizView from './views/QuizView.vue';
import GameLost from './views/GameLost.vue'
import GameWon from './views/GameWon.vue'

const routes = [
    {path: '/', component: RegisterView },
    {path: '/game', component: GameView },
    {path: '/login', component: LoginView},
    {path: '/quizz', component: QuizView},
    {path: '/gamelost', component: GameLost},
    {path: '/gamewon', component: GameWon}
];

const history = createWebHistory()

const router = createRouter({
    history,
    routes
});

export default router;