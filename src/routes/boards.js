const Router = require('koa-router');

const router = new Router();

// crear board
router.post("boards.create", "/", async(ctx)=>{
    try {
        const board = await ctx.orm.Board.create(ctx.request.body);
        ctx.body = board;
        ctx.status = 201;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

// mostrar board
router.get("boards.show", "/", async(ctx)=>{
    try {
        const boards = await ctx.orm.Board.findAll();
        ctx.body = boards;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})
router.get("boards.show", "/show/:id", async(ctx)=>{
    try {
        const boards = await ctx.orm.Board.findOne({where:{id:ctx.params.id}});
        ctx.body = boards;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

// updatear board
router.post("boards.update", "/update/:id", async(ctx)=>{
    try{
        const board = await ctx.orm.Board.update(ctx.request.body,{where:{id:ctx.params.id}});
        ctx.body = board;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})
  
  


// Verificar si un arma acertó a un barco en el tablero (necesito boardId y rocketId)
router.get("/:boardId/:rocketId/:armId/checkHit", async (ctx) => {
    try {
      const boardId = ctx.params.boardId;
      const rocketId = ctx.params.rocketId;
      const armId = ctx.params.armId;
  
      // Obtener el tablero y el barco correspondientes desde la base de datos
      const board = await ctx.orm.Board.findOne({ where: { id: boardId } });
      const rocket = await ctx.orm.Rocket.findOne({ where: { id: rocketId } });
      const arm = await ctx.orm.Arm.findOne({ where: { id: armId } });
  
      // Verificar si el arma acertó al barco en el tablero
      console.log(board)
      console.log(rocket)
      console.log(arm)
      const isHit = await checkHit(board, rocket, arm);
      console.log(isHit)
  
      ctx.body = { isHit };
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
      ctx.status = 400;
    }
  });

  async function checkHit(board, rocket, arm) {
    // Verificar si el barco está presente en el tablero
    console.log("entre a checkhit")
    //const isRocketOnBoard = await board.hasRocket(rocket);
    //if (!isRocketOnBoard) {
     // throw new Error('El cohete no está presente en el tablero.');
    //}

    // Obtener las coordenadas del cohete (se creo getcoordinates en model para ver colisiones más fácil)
    const rocketCoordinate = await rocket.getCoordinates();
    const armCoordinate = await arm.getCoordinates();

    console.log(rocketCoordinate)

    if (rocket.orientation == 'horizontal'){
        console.log("entre a horizontal")
        for (let i = 0; i < rocket.length; i++) {
            let coordinate = [rocketCoordinate.x + i, rocketCoordinate.y];
            if (armCoordinate.x == coordinate[0] && armCoordinate.y == coordinate[1]) {
                return true; // Se encontró un disparo acertado en el cohete
            }
        }
    }
    else{
        for (let i = 0; i < rocket.length; i++) {
            console.log("entre a vertical")
            let coordinate = [rocketCoordinate.x, rocketCoordinate.y + i];
            if (armCoordinate.x == coordinate[0] && armCoordinate.y == coordinate[1]) {
                return true; // Se encontró un disparo acertado en el cohete
            }
        }
    }

    return false; // No se encontraron disparos acertados en el barco
  }


module.exports = router; 