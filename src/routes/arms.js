const Router = require('koa-router');

const router = new Router();

router.post("arms.create", "/", async(ctx)=>{
     try {
         const arm = await ctx.orm.Arm.create(ctx.request.body);
         ctx.body = arm;
         ctx.status = 201;
     } catch(error) {
         ctx.body = error;
         ctx.status = 400;
     }
 })

router.get("arms.list", "/list", async(ctx)=>{
    try {
        const arm = await ctx.orm.Arm.findAll();
        ctx.body = arm;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("arms.show", "/:id", async(ctx)=>{
    try {
        const arm = await ctx.orm.Arm.findOne({where:{id:ctx.params.id}});
        ctx.body = arm;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

// posicionar a arma donde dice player
router.post("arms.update", "/update/:id", async(ctx)=>{
    try{
        const arm = await ctx.orm.Arm.update({x:ctx.request.body.X, y:ctx.request.body.Y},
            {where:{id:ctx.params.id}});
            
        const updatedArm = await ctx.orm.Arm.findOne({ where: { id:ctx.params.id } });
        ctx.body = updatedArm;
       
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})





module.exports = router; // Export the router instance