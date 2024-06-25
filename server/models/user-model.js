const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
    },

    phone:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    isAdmin:{
        type:Boolean,
        default:false,
    },
});

/*userSchema.pre('save',async function(next){
    const user=this;
if(!user.isModified('password')){
    return next();
}

try{
    const saltRound=await bcrypt.genSalt(10);
    const hash_password=await bcrypt.hash(user.password,saltRound);
    user.password=hash_password;
    next();
}
catch(error)
{
    next(error);
}
});*/
// Define the pre-save hook
userSchema.pre('save', async function(next) {
    const user = this;

    // Check if the password field is modified (or is a new user)
    if (!user.isModified('password')) {
        return next();
    }

    try {
        // Generate salt for hashing
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the generated salt
        const hash_password = await bcrypt.hash(user.password, salt);

        // Replace the plain password with the hashed one
        user.password = hash_password;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Pass any error to the next middleware
        next(error);
    }
});

userSchema.methods.generateToken=async function(){
    try{
return jwt.sign({
    userId:this._id.toString(),
    email:this.email,
    isAdmin:this.isAdmin,
},
process.env.JWT_SECRET_KEY,
{
    expiresIn:"30d",
}
);
    }
    catch(error){
        console.error(error);
    }
}

const User=new mongoose.model("Users",userSchema);
module.exports=User;