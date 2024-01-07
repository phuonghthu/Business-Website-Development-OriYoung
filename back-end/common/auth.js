const Utils = require("./utils");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const headers = {
    id: user._id,
    name: user.name,
    role: user.role,
  };
  return jwt.sign(headers, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15d",
  });
};

const generateRefreshToken = (user) => {
  const headers = {
    id: user._id,
    name: user.name,
  };
  return jwt.sign(headers, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json(Utils.createResponseModel(401, "Bạn cần phải đăng nhập."));

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(401)
        .json(Utils.createResponseModel(401, "Bạn cần phải đăng nhập."));
    req.user = user;
    next();
  });
};

//check permission admin from token
const authenticateTokenAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json(Utils.createResponseModel(401, "Bạn cần đăng nhập."));

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(401)
        .json(Utils.createResponseModel(401, "Bạn cần đăng nhập."));
    if (user.role !== "admin")
      return res
        .status(403)
        .json(Utils.createResponseModel(401, "Bạn không có quyền truy cập."));
    req.user = user;
    next();
  });
};

const authenticateRefreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null)
    return res
      .status(404)
      .json(Utils.createResponseModel(404, "Data not found."));
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(401)
        .json(Utils.createResponseModel(401, "Bạn cần đăng nhập lại."));
    req.user = user;
    next();
  });
};

module.exports = {
  generateAccessToken: generateAccessToken,
  generateRefreshToken: generateRefreshToken,
  authenticateToken: authenticateToken,
  authenticateRefreshToken: authenticateRefreshToken,
  authenticateTokenAdmin: authenticateTokenAdmin,
};
