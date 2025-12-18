const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/loginbd', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

const UserSchema = new Schema({
    name: {
        type: String,  
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
