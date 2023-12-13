const mongoose = require('mongoose')
const valideMongodbId = (id) =>{

    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new Error('th id is not valid or not found')

}


module.exports = valideMongodbId