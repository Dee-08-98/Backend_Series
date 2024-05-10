const mongoose = require('mongoose')

const DbConnection = async()=>{
    try {
        const DB = await mongoose.connect(`${process.env.url}`)
        console.log('Database Connected');
        console.log('Database connected on port ' , DB);
    } catch (error) {
       console.log('DataBaseconnection error ' , error); 
    }
}

module.exports =  DbConnection;