import schema from "./user.model.js";
import bcrypt from "bcrypt";


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

