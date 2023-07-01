const Router = require('koa-router');

const router = new Router();

router.post("games.create", "/", async(ctx)=>{
    try {
        const game = await ctx.orm.Game.create(ctx.request.body);
        ctx.body = game;
        ctx.status = 201;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("games.list", "/", async(ctx)=>{
    try {
        const games = await ctx.orm.Game.findAll();
        ctx.body = games;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("games.show", "/show/:id", async(ctx)=>{
    try {
        const games = await ctx.orm.Game.findOne({where:{id:ctx.params.id}});
        ctx.body = games;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

module.exports = router; // Export the router instance