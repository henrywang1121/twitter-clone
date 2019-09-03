const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 280
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

messageSchema.pre('remove', async function(next){
    try {
        //find a user
        let user = await User.findById(this.userId);
        //remove the id of the message from their message list
        user.message.remove(this.id);
        //save that user
        await user.save();
        return next();

    } catch(e) {
        return next(err);
    }

})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
