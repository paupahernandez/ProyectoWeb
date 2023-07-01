const Router = require('koa-router');
const players = require('./routes/players.js');
const games = require('./routes/games.js');
const arms = require('./routes/arms.js');
const rockets = require('./routes/rockets.js');
const boards = require('./routes/boards.js');


const router = new Router();

router.use('/players', players.routes());
router.use('/games', games.routes());
router.use('/arms', arms.routes());
router.use('/rockets', rockets.routes());
router.use('/boards', boards.routes());


module.exports = router // Export the router instance