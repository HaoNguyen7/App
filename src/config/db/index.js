const mongoose =require('mongoose')

async function connect(){
   try{await mongoose.connect('mongodb+srv://blossomvn1:haopro01@cluster0.u45vh.mongodb.net/App?retryWrites=true&w=majority', 
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
    })
console.log('Successful connection')
}

catch(error){
    console.log('Failed connection')
}
}

module.exports = {connect}