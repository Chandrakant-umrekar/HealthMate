import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Please login",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.userId) {
      req.body.userId = tokenDecode.userId;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized. Please login",
      });
    }
    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default userAuth;
