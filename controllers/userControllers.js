const { PrismaClient } = require("@prisma/client");
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const SECKRET_KEY='Access123';

const prisma = new PrismaClient();
// getUsers, getUserById, deleteUser, updateUser, addUser

const getUsers = async (req, res) => {
  try {
    const checkage = req.body.age;
    if (checkage) {
      const getUserByAge = await prisma.user.findMany({ where: { age:checkage } });
      return res.send(getUserByAge);
    }else{
      const getAllUsers = await prisma.user.findMany();
      return res.send(getAllUsers);
    }
  } catch (error) {
    return res.status(500).send({message:error.message});
  }
};
const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const findUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!findUser) {
      return res.status(404).send(`User with id ${id} not found`);
    }
    res.send(findUser);
  } catch (error) {
    return res.status(500).send({message:error.message});
  }
};

const addUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.age || !req.body.address) {
      return res.status(404).send("please fill in the required fields");
    }
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
      },
    });
    return res.send(newUser);
  } catch (error) {
    return res.status(500).send({message:error.message});
  }
};

const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const findUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!findUser) {
      return res.status(404).send(`User with id ${id} not found`);
    }
    const updateUser = await prisma.user.update({
      data: {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
      },
      where: { id },
    });
    return res.send(updateUser);
  } catch (error) {
    return res.status(500).send({message:error.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const findUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!findUser) {
      return res.status(404).send(`User with id ${id} not found`);
    }
    const deleteUser = await prisma.user.deleteMany({
      where: { id },
    });
    res.send(deleteUser);
  } catch (error) {
    return res.status(500).send({message:error.message});
  }
};

const signUpUser=async (req, res) => {
  const {email,password}=req.body;
  try {
    // check existing user
    const existingUser=await prisma.profile.findUnique({where:{email}});
    if (existingUser) {
      return res.json({message:'Email already exist'});
    }
    // hashed password
    const hashedPassword= await bcrypt.hash(password,10);
    // user creation
    const createUser= await prisma.profile.create({
     data:{
      email,
      password:hashedPassword
     }
    })
    // token generate
    const token = jwt.sign({email:createUser.email,id:createUser.id},SECKRET_KEY);
    return res.status(201).send({user:createUser,token:token});

  } catch (error) {
    return res.status(500).json({message:'Internal Server Error'});
  }
}

const signInUser=async(req, res) => {
  const {email,password}=req.body;
  try {
    // check existing user
    const existingUser=await prisma.profile.findUnique({where:{email}});
    if (!existingUser) {
      return res.status(404).json({message:'User not found'})
    }
    // check password
    const matchPassword= await bcrypt.compare(password,existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({message:'Invalid Credentials'});
    }
    // generate token
    const token = jwt.sign({email:existingUser.email,id:existingUser.id},SECKRET_KEY);
    return res.status(201).send({user:existingUser,token:token});
  } catch (error) {
    return res.status(500).send({message:'Internal server error'})
  }
}

const uploadFile=async (req,res)=>{
  return res.status(201).json({
    success:1,
    message:'File Uploaded',
    profile_url:`http://localhost:443/profile/${req.file.filename}`
  })
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  signInUser,
  signUpUser,
  uploadFile
};
