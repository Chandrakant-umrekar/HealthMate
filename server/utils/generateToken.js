import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, userId: user._id },
    process.env.JWT_SECRET
  );
};

export default generateToken;
