const { PrismaClient } = require("@prisma/client");

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


module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
