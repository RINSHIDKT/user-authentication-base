import schema from "./user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const {sign}=pkg;


export function addUser(req,res)
{
    
    try {
        const {user,password}=req.body;
        if(!(user&&password))
        return res.status(404).send("Fields are empty")
        bcrypt.hash(password,10)
        .then((hashedPwd)=>{
            schema.create({user,password:hashedPwd});
        })
        .then(()=>{
            res.status(201).send("Successfully registered")
        })
        .catch((error)=>{
            console.log(error);
            res.status(500).send(error)
        })
    } catch (error) {
        console.log(error);
    }


}
export async function login(req,res)
{
    console.log(req.body);
    const{user,password}=req.body;
    const usr=await schema.findOne({user})
    console.log(usr);
    if (usr===null) return res.status(404).send("username or password doesnot exist");
    const success=await bcrypt.compare(password,usr.password)
    console.log(success);
    if(success!==true) return res.status(404).send("username or password doesnot exist");
    const token=await sign({user},process.env.JWT_KEY,{expiresIn:"24h"})
    console.log(token);
    res.status(200).send({msg:"successfully login",token})
    res.end();
}
export async function home(req,res)
{
    try{
        console.log(req.user);
        const username=req.user.user
        console.log(username);
        res.status(200).send({msg:`hello ${username}`})
        
    } catch (error){
        res.status(404).send(error)
    }
}

