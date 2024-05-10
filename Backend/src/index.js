

const dotenv = require('dotenv')
dotenv.config()



const app = require('./app.js')


const port = process.env.port || 7777
const url = process.env.url

const mongoose = require('mongoose')



mongoose.connect(url)
    .then(() => {
        app.listen(port, () => {
            console.log('Server is running on Port :- ', port);
            console.log('Database connected');
        })
    })
    .catch((err) => {
        console.log('Mongoose Connection error : ', err);
    })



// ******************** Both DataBase connection are Working ******************************

// const DbConnection  = require('./db/DbConnection')
// DbConnection()
// .then(() => {
//     app.listen(port, () => {
//         console.log('Server is running on Port :- ', port);
//     })
// })
// .catch((err) => {
//     console.log('Mongoose Connection error : ', err);
// })



