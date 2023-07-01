const Router = require('koa-router');

const router = new Router();

router.post("rockets.create", "/", async(ctx)=>{
    try {
        const rocket = await ctx.orm.Rocket.create(ctx.request.body);
        ctx.body = rocket;
        ctx.status = 201;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})


router.get("rockets.list", "/", async(ctx) => {
    try {
        console.log("Hola")
        const rocket = await ctx.orm.Rocket.findAll();
        ctx.body = rocket;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("rockets.show", "/show/:id", async(ctx)=>{
    try {
        console.log("Hola");
        const rocket = await ctx.orm.Rocket.findOne({where:{id:ctx.params.id}});
        ctx.body = rocket;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

// posicionar a rocket donde dice player
router.post("rockets.update", "/update/:id", async(ctx)=>{
    try{

        const rocket = await ctx.orm.Rocket.update({x:ctx.request.body.x, y:ctx.request.body.y, orientation:ctx.request.body.orientation,
        playerId:ctx.request.body.playerId},
            {where:{id:ctx.params.id}});
        ctx.body = rocket;
        ctx.status = 200;
    } catch(error){
        console.log(ctx.request.body.D);
        ctx.body = error;
        ctx.status = 400;
    }
})

// eliminamos rockets ya existentes para partir de cero
router.delete("rockets.delete", "/delete", async (ctx) => {
    try {
      const rocketIds = ctx.request.body.rocketIds; // Obtener los IDs de los rockets a eliminar desde el cuerpo de la solicitud
  
      const rockets = await ctx.orm.Rocket.destroy({
        where: { id: rocketIds },
      });
  
      ctx.body = rockets;
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
      ctx.status = 400;
    }
  });
  
  router.delete("rockets.delete", "/delete/:rocketIds", async (ctx) => {
    try {
      const rocketIds = ctx.params.rocketIds.split(","); // Obtener los IDs de los cohetes como una matriz
  
      const rockets = await ctx.orm.Rocket.destroy({
        where: { id: rocketIds },
      });
  
      ctx.body = rockets;
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
      ctx.status = 400;
    }
  });
  
  

module.exports = router; // Export the router instance