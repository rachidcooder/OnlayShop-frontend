import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema=mongoose.Schema({
  username:{type :String ,required :true},
  email:{type :String ,required :true ,unique :true},
  password:{type :String ,required :true},
  isAdmin :{type :Boolean ,required :true,default:false},
  role :{type :String ,required :true,default:"user"},
  isVerified:{type :Boolean ,required :true,default :false}
},{timestamp:true})

userSchema.methods.matchPassword = async function(enteredPassword){
 return await bcrypt.compare(enteredPassword,this.password) ;
}

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User",userSchema);