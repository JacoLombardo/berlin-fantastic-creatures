import bcrypt from "bcrypt";

const isPasswordCorrect = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export default isPasswordCorrect;