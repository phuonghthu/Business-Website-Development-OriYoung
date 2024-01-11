const User = require("../models/User");
const Invoice = require("../models/Invoice");
const Utils = require("../common/utils");
const Auth = require("../common/auth");

const checkPermission = (req, res, next) => {
  console.log(req.session.role);
  if (req.session.role === "admin") {
    next();
  } else {
    return res.json(
      Utils.createResponseModel(400, `Bạn không có quyền truy cập`)
    );
  }
};
const refreshToken = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res
      .status(404)
      .json(Utils.createResponseModel(404, `Người dùng không tồn tại.`));
  }
  user.accessToken = Auth.generateAccessToken(user);
  user.refreshToken = Auth.generateRefreshToken(user);
  await user.save();
  return res.json(Utils.createSuccessResponseModel(1, user));
};

const handleLogin = async (req, res) => {
  const { phone, password } = req.body;
  //find user by phone or email

  const user = await User.findOne({
    $or: [{ phone: phone }, { email: phone }],
    isDeleted: false,
  });
  //check user exist
  if (!user) {
    return res
      .status(400)
      .json(
        Utils.createResponseModel(
          400,
          `Người dùng không tồn tại tài khoản với tài khoản ${phone}.`
        )
      );
  }
  //check password
  const isPasswordCorrect = await Utils.validatePassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json(
        Utils.createResponseModel(400, `Mật khẩu không đúng, vui lòng thử lại`)
      );
  }
  user.accessToken = Auth.generateAccessToken(user);
  user.refreshToken = Auth.generateRefreshToken(user);
  await user.save();
  // create session
  // req.session.user = user._id;
  // req.session.userName = user.userName;
  // req.session.role = user.role;
  console.log("Role:" + user.role);
  //create cookie
  res.cookie("user", user._id);
  console.log("user logined: " + user);
  return res.json(Utils.createSuccessResponseModel(1, user));
};

const handleRegister = async (req, res) => {
  const { phone, password } = req.body;
  const inputType = checkInput(phone);
  if (inputType === "unknown") {
    return res
      .status(400)
      .json(
        Utils.createResponseModel(
          400,
          `Vui lòng nhập số điện thoại hoặc email.`
        )
      );
  }
  //check user exist by phone or email
  const existUser = await User.findOne({
    $or: [{ phone: phone }, { email: phone }],
    isDeleted: false,
  });
  if (existUser != null) {
    return res
      .status(400)
      .json(
        Utils.createResponseModel(
          400,
          `Người dùng đã tồn tại tài khoản với số điện thoại ${phone}.`
        )
      );
  }

  try {
    const hashPassword = Utils.hashPassword(password);
    const number = await User.countDocuments();
    // Tạo một user mới
    const user = new User({
      password: hashPassword,
    });
    if (inputType === "email") {
      user.email = phone;
      user.phone = `Chưa cập nhật`;
    }
    if (inputType === "phone") {
      user.phone = phone;
      user.email = `user_${number}@gmail.com`;
    }

    await user.save();
    return res.json(Utils.createSuccessResponseModel(1, user._id));
  } catch (error) {
    console.log("userController-Line 31: " + error.message);
    return res
      .status(500)
      .json(Utils.createErrorResponseModel(error.message, error.message));
  }
};

const updateInfoUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  const checkUser = await User.findOne({
    phone: req.body.phone,
    _id: { $ne: req.user.id },
  });
  if (checkUser) {
    return res
      .status(400)
      .json(
        Utils.createResponseModel(
          400,
          `Số điện thoại là ${req.body.phone} đã tồn tại.`
        )
      );
  }

  const newProfile = { ...user.toObject(), ...req.body };
  //using newProfile to update user
  user.email = newProfile.email;
  user.name = newProfile.name;
  user.birthday = newProfile.birthday;
  user.gender = newProfile.gender;
  user.address = newProfile.address;
  user.phone = newProfile.phone;
  user.updated_at = new Date();
  await user.save();
  const userWithoutPassword = { ...user.toObject() };
  delete userWithoutPassword.password;
  return res.json(Utils.createSuccessResponseModel(1, userWithoutPassword));
};

const getInfoMine = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res
      .status(400)
      .json(
        Utils.createResponseModel(
          400,
          `Vui lòng đăng nhập để lấy thông tin cá nhân.`
        )
      );
  }
  const userWithoutPassword = { ...user.toObject() };
  delete userWithoutPassword.password;
  return res.json(Utils.createSuccessResponseModel(1, userWithoutPassword));
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json(
          Utils.createErrorResponseModel(
            `Mật khẩu mới không được trùng với mật khẩu cũ.`
          )
        );
    }
    const user = await User.findById(req.user.id);

    const isPasswordCorrect = await Utils.validatePassword(
      oldPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(
          Utils.createResponseModel(
            400,
            `Mật khẩu cũ không đúng, vui lòng thử lại`
          )
        );
    }
    const hashPassword = Utils.hashPassword(newPassword);
    user.password = hashPassword;
    user.updated_at = new Date();
    await user.save();
    return res.json(Utils.createSuccessResponseModel(1, user._id));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { newPassword, account } = req.body;
    if (account === undefined) {
      return res
        .status(400)
        .json(
          Utils.createErrorResponseModel(
            `Vui lòng nhập email hoặc số điện thoại.`
          )
        );
    }

    const user = await User.findOne({
      $or: [{ phone: account }, { email: account }],
    });
    if (!user) {
      return res
        .status(400)
        .json(
          Utils.createErrorResponseModel(
            `Người dùng không tồn tại với tài khoản ${account}.`
          )
        );
    }

    const hashPassword = Utils.hashPassword(newPassword);
    user.password = hashPassword;
    user.updated_at = new Date();
    await user.save();
    return res.json(Utils.createSuccessResponseModel(1, user._id));
  } catch (err) {
    console.log(err);
    return res.status(500).json(Utils.createErrorResponseModel(err.message));
  }
};

//get all user , role != admin, isDeleted = false
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" }, isDeleted: false });

    const usersWithTotalOrders = await Promise.all(
      users.map(async (user) => {
        const totalOrders = await Invoice.countDocuments({ user: user._id });
        return { ...user.toObject(), totalOrders };
      })
    );
    console.log(usersWithTotalOrders);

    return res.json(
      Utils.createSuccessResponseModel(
        usersWithTotalOrders.length,
        usersWithTotalOrders
      )
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(Utils.createErrorResponseModel(error.message));
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json(Utils.createErrorResponseModel("Người dùng không tồn tại"));
    }
    user.isDeleted = true;
    await user.save();
    return res.json(Utils.createSuccessResponseModel(0, true));
  } catch (error) {
    console.log(error);
    return res.status(500).json(Utils.createErrorResponseModel(error.message));
  }
};

function checkInput(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g; // This is a very basic international phone number regex

  if (emailRegex.test(input)) {
    return "email";
  } else if (phoneRegex.test(input)) {
    return "phone";
  } else {
    return "unknown";
  }
}

module.exports = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
  updateInfoUser: updateInfoUser,
  getInfoMine: getInfoMine,
  changePassword: changePassword,
  getAllUsers: getAllUsers,
  deleteUser: deleteUser,
  checkPermission: checkPermission,
  refreshToken: refreshToken,
  forgotPassword: forgotPassword,
};
