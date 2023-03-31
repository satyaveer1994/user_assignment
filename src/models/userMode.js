const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
// image:{
//     type:String,

// },
address_Line1:{
    type:String,
    required:true,

},
address_Line2:{
    type:String,
    required:true,
},
street:{
    type:String,
    required:true,
},
city:{
    type:String,
    required:true,
},
zip:{
    type:Number,
    required:true,
},
isDeleted: {
    type: Boolean,
    default: false,
  },

},{timestamps:true})

module.exports= mongoose.model("user",userSchema)

// 1. make signup API with field (name, email, password, image, address line 1, address line 2, street, city, zip) and manage user and address table (relation maintain b/w user and address table).