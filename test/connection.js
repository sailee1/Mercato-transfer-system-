const mongoose = require ('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/testing')
mongoose.connection
.once('open', () => console.log('Connected to mongoose'))
.on('error',(error)=> {
    console.warn('Error: ', error)
})

beforeEach((done) => {
    mongoose.connection.collections.players.drop(() => {
        done();
    }).catch(done)
})