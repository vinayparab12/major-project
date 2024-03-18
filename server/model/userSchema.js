const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Document structure is defined in below : 
const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    phone_no : {
        type:Number,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    cpassword : {
        type:String,
        required:true
    },
    tokens:[
        {
            token: {
                type:String,
                required:true
            }
        }
    ]
})

// Hashing the password : Pre-save method  , async await using bcryptjs
userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});

// Token genereation using JWT(JsonWebToken) :
userSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRETE_KEY); // Token will get generate with only this line
        this.tokens = this.tokens.concat({token:token}); // Token is added with this line
        await this.save(); 
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('userinterface',userSchema);

module.exports = User; // Required during formation of fronend 

