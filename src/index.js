const app =  require('./app');
const db = require('./models');
const dotenv = require('dotenv');

dotenv.config();


const port = process.env.PORT || 3000;


db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(port, (err) => {
            if (err) {
                console.error('Error starting: ', err);
            }
            console.log(`Listening on port ${port}`);
            return app;
        });
    })
    .catch((err) =>  console.error('Unable to connect to the database:', err)); 