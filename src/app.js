const koa = require('koa');
const koalogger = require('koa-logger');
const { koaBody } = require('koa-body');
const router = require('./routes');
const orm =  require('./models');
const cors = require('koa-cors');

// Crear instancia de Koa
const app = new koa();

app.context.orm = orm;

// Middlewares proporcionados por Koa
app.use(koalogger());
app.use(koaBody());

// Habilitar CORS
app.use(cors());

// Koa Router
app.use(router.routes());

// Middlewares personalizados
app.use(async (ctx, next) => {
    ctx.body = 'Hello World world';
    });


// Hacer que el servidor escuche en el puerto 3000
// app.listen(3000, () => {
//     console.log('Server running on port 3000');
//     });


module.exports = app;