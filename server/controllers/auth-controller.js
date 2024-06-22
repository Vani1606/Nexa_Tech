const User = require("../models/user-model");
const bcrypt=require("bcryptjs");
//HOME LOGIC


const home=async(req,res)=>{
    try{
        res
        .status(200)
        .send("HOME");
    }
    catch(error)
    {
        console.log(error);
    }
};


//USER REGISTER LOGIC
const register=async(req,res)=>{
    try{
        console.log(req.body);

        const {username,email,phone,password}=req.body;

        const userExist=await User.findOne({email});

        if(userExist)
        {
            return res.status(400).json({message:"email already exists"});
        }

       const newUser= await User.create({username,email,phone,password});
    
        res.status(200)
        .json({ msg:"Registration successful",token:await newUser.generateToken(),userId:newUser._id.toString(), 
           
        });
    }
    catch(error)
    {
        res.status(500).json("internal server error");
    }
};

//USER LOGIN LOGIC

const login=async (req,res)=>
{
    try{
const {email,password}=req.body;
const userExist=await User.findOne({email});
console.log(userExist);

if(!userExist)
{
    return res.status(400).json({message:"invalid credentials"});
}

const user=await bcrypt.compare(password,userExist.password);
if(user)
{
    res.status(200).json({
        msg:"login successful",
        token:await userExist.generateToken(),
        userId:userExist._id.toString(),
    });
}
else
{
    res.status(401).json({message:"invalid email or password"});
}
    }
    catch{
        res.status(500).json("internal server error");
    }
};


//USER LOGIC

const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };

module.exports={home,register,login,user};