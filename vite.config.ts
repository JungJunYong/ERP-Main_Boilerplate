import {defineConfig, ViteDevServer} from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import Koa, {Middleware} from 'koa';
import {Interceptor, InterceptorMiddlewareOptions} from "./server/interceptor";

dotenv.config()

const middleware = (options: InterceptorMiddlewareOptions): Middleware => {
    const interceptor = new Interceptor(options);
    return interceptor.middleware;
};



const app = new Koa()
app.use(
    middleware({
        root: process.cwd(),
        extensions: ['js', 'json', 'html'],
        ignores: []
    })
);

function koaPlugin() {
    return {
        name: 'express-plugin',
        configureServer(server: ViteDevServer) {
            server.middlewares.use(app.callback())
        }
    }
}

export default defineConfig({
    plugins: [react()],
})






