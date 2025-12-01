import users from "./user.mjs"

export const getAllUsers=(req,res)=>{
    res.json(users);
}

export const getUserById=(req,res)=>{
    const user=users.find(u=>u.id=req.params.id);
    if(!user) return res.status(404).send("User not found");
    res.json(user);
}

export const createUser=(req,res)=>{
    const newUser={
        id:users.length+1,
        name:req.body.name
    }
    users.push(newUser);
    res.status(201).json(newUser)
}

export const updateUser=(req,res)=>{
    const user=user.find(u=>u.id==req.params.id);
    if(!user) return res.status(404).send("User not found");
    user.name=req.body.name;
    res.json(user);
}

export const deleteUser=(req,res)=>{
    users=users.find(u=>u.id!=req.params.id)
    res.send("User Deleted")
}