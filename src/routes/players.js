const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const router = new Router();

router.post("players.create", "/", async (ctx) => {
  try {
    const player = await ctx.orm.Player.create(ctx.request.body);
    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    const token = jwt.sign(
      { scope: ['player'] },
      JWT_PRIVATE_KEY,
      { subject: player.id.toString(),
        expiresIn: expirationSeconds }
    );

    ctx.body = {
      "id": player.id,
      username: player.username,
      mail: player.mail,
      "access_token": token,
      "token_type": "Bearer",
      "expires_in": expirationSeconds,
    };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});


router.get("players.getPlayersRockets", "/rocketsData/:playerId", async (ctx) => {
  try {
    const playerId = ctx.params.playerId;
    const rockets = await ctx.orm.Rocket.findAll({
      where: { playerId: playerId },
      attributes: ["id", "playerId", "name", "health", "x", "y", "orientation"],
    });

    if (rockets.length > 0) {
      const player = await ctx.orm.Player.findByPk(playerId, { attributes: ["username"] });

      ctx.body = {
        rockets: rockets,
        player: player.username
      };
      ctx.status = 200;
    } else {
      ctx.body = "No se encontraron cohetes para el jugador con el ID proporcionado";
      ctx.status = 404;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});


router.get("players.list","/",async(ctx)=>{
    try{
        const player = await ctx.orm.Player.findAll();
        ctx.body = player;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("players.show","/show/:id",async(ctx)=>{
    try{
        const player = await ctx.orm.Player.findOne({where:{id:ctx.params.id}});
        ctx.body = player;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.post("players.update","/update/:id",async(ctx)=>{
    try{
        const player = await ctx.orm.Player.update(ctx.request.body,{where:{id:ctx.params.id}});
        ctx.body = player;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// ojo error con asociaciones


// manejamos login usuario
router.post("players.login", "/login", async (ctx) => {
  try {
    const authInfo = ctx.request.body;
    const player = await ctx.orm.Player.findOne({
      where: {
        username: authInfo.username,
        mail: authInfo.mail
      }
    });

    if (player && player.password === ctx.request.body.password) {
      const expirationSeconds = 1 * 60 * 60 * 24;
      const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
      const token = jwt.sign(
        { scope: ['player'] },
        JWT_PRIVATE_KEY,
        {
          subject: player.id.toString(),
          expiresIn: expirationSeconds
        }
      );

      ctx.body = {
        id: player.id,
        username: player.username,
        mail: player.mail,
        access_token: token,
        token_type: "Bearer",
        expires_in: expirationSeconds
      };
      ctx.status = 200;
    } else {
      ctx.body = "Wrong username, email, or password";
      ctx.status = 400;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// manejamos logout usuario

// manejamos inicio de game (pasamos PlayerId)

  async function createGameHandler(ctx) {
    try {
      // obtener jugador actual
      const playerId = ctx.request.body.playerId;
      const existingPlayer = await ctx.orm.Player.findOne({ where: { id: playerId } });
  
      if (existingPlayer.gameId) {
        ctx.body = "Jugador ya está asociado a un juego";
        ctx.status = 400;
        return;
      }
      
      // creamos juego
      const game = await ctx.orm.Game.create(ctx.request.body);
      
      // Asignar el gameId del juego al jugador
      existingPlayer.gameId = game.id;
      await existingPlayer.save();
  
      ctx.body = game;
      ctx.status = 201;
    } catch (error) {
      ctx.body = error;
      ctx.status = 400;
    }
  }

  
  

router.post("players.createGame", "/createGame", createGameHandler);

// nos unimos a juego existente (pasamos PlayerId y GameId)

async function joinGameHandler(ctx) {
    try {
      const playerId = ctx.request.body.playerId;
      const gameId = ctx.request.body.gameId;
    
      const existingPlayer = await ctx.orm.Player.findOne({ where: { id: playerId } });
      const existingGame = await ctx.orm.Game.findOne({ where: { id: gameId } });
    
    // verificamos si jugador y juego existen en la bdd 
      if (!existingPlayer || !existingGame) {
        ctx.body = "Jugador o juego no encontrado";
        ctx.status = 404;
        return;
      }
    // verificamos si juego ya tiene dos jugadores
      if (checkPlayersInGame(ctx, existingGame)) {
        ctx.body = "El juego ya está lleno";
        ctx.status = 400;
        return;
      }
  
      existingGame.playerId = playerId;
      await existingGame.save();
  
      ctx.body = existingGame;
      ctx.status = 200;
    } catch (error) {
      ctx.body = error;
      ctx.status = 400;
    }
  }

  router.post("players.joinGame", "/joinGame", joinGameHandler);

  // Función para verificar si ya hay dos jugadores en el juego *** ojo tema puertos FALTA
  async function checkPlayersInGame(ctx, game) {
    const playerCount = await ctx.orm.Player.count({ where: { gameId: game.id } });
    return playerCount === 2;
  }

  // manejamos salir de game (pasamos PlayerId y GameId)
  async function exitGameHandler(ctx){
    try{
        const playerId = ctx.request.body.playerId;
        const gameId = ctx.request.body.gameId;
        const existingPlayer = await ctx.orm.Player.findOne({ where: { id: playerId } });
        const existingGame = await ctx.orm.Game.findOne({ where: { id: gameId } });

        if (!existingPlayer || !existingGame) {
            ctx.body = "Jugador o juego no encontrado";
            ctx.status = 404;
            return;
        }

        if (existingPlayer.gameId !== existingGame.id) {
            ctx.body = "Jugador no está asociado a este juego";
            ctx.status = 400;
            return;
        }

        // sino si saco a jugador de juego
        existingPlayer.gameId = null;
        await existingPlayer.save();
        ctx.body = existingPlayer;
        ctx.status = 200;
        // le tengo que avisar al otro que jugador se fue **
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
  }

  router.post("players.exitGame", "/exitGame", exitGameHandler);


module.exports = router;