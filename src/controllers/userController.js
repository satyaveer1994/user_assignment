const userModel= require('../models/userMode');
const jwt=require('jsonwebtoken');


const createUser = async function(req,res){
    try{
let data = req.body;
if(Object.keys(data).length===0){
    return res.status(400).send({status: false,msg:'please send some data in req.body'})
}
const {name,email,password,address_Line1,address_Line2,street,city,zip}=data

if(!name){
    return res.status(400).send({status:false,msg:'name is required'})
}
if(!email){
    return res.status(400).send({status:false,msg:'email is required'})
}
// check unique emailId
const user =  await userModel.findOne({email:email})
if(user){
    return res.status(400).send({status:false,msg:'user already exist '})
}




if(!password){
    return res.status(400).send({status:false,msg:'password is required'})
}
if(!address_Line1){
    return res.status(400).send({status:false,msg:'address_Line1 is required'})
}
if(!address_Line2){
    return res.status(400).send({status:false,msg:'address_Line2 is required'})
}
if(!street){
    return res.status(400).send({status:false,msg:'street is required'})
}

if(!city){
    return res.status(400).send({status:false,msg:'city is required'})
}

if(!zip){
    return res.status(400).send({status:false,msg:'zip is required'})
}

const createUser = await userModel.create(data)
return res.status(201).send({status:true,msg:'ok',data:createUser})



    }catch(error){
        console.log(error);
        res.status(500).send({status:false,msg:error.msg})
    }
}




const login= async function(req,res){
    try{

        let data = req.body

        if(Object.keys(data).length===0){
            return res.status(400).send({status: false,msg:'please send some data in req.body'})
        }
        const {email,password}= data

        if(!email){
            return res.status(400).send({status:false,msg:'email is required'})
        }
        // check unique emailId
        const user =  await userModel.findOne({email:email})
        if(user){
            return res.status(400).send({status:false,msg:'user already exist '})
        }
        
        
        
        
        if(!password){
            return res.status(400).send({status:false,msg:'password is required'})
        }

        const token = jwt.sign({
            userId: user_id
        },'key')

        res.setHeader(['x-auth-token'],token)
        return res.status(200).send({status:true,msg:'login user success'})
    


    }catch(error){
        console.log(error);
        return res.status(500).send({status:false,msg:error.msg})
    }
}

const getUser = async function (req, res) {
    try {
      const data = req.query;
      if (Object.keys(data) == 0)
        return res.status(400).send({ status: false, msg: "No input provided" });
  
      const user = await userModel.find({
        $and: [data, { isDeleted: false }],
      });
  
      if (user.length == 0)
        return res.status(404).send({ status: false, msg: "No user Available." });
      return res.status(200).send({ status: true, data: user });
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message });
    }
  };

module.exports={createUser,login,getUser}