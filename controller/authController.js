const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const userModel = require("../model/userModel");
const authModel = require("../model/authModel");
const walletModel = require("../model/walletModel");
const { success, failure } = require("../util/common");
const jsonwebtoken = require("jsonwebtoken");

class Auth {
  async signup(req, res) {
    try {
      const validation = validationResult(req).array();
      console.log(validation);
      if (validation.length > 0) {
        return res.status(422).send(
          failure(
            "Failed to Add User",
            validation.map((x) => x.msg)
          )
        );
      }
      const { name, email, password, phone, address, role } = req.body;
      const finder = await userModel.findOne({ email: email });
      if (finder) {
        return res.status(200).send(failure("User Already Exists"));
      }
      const userData = await userModel.create({ name, email, phone, address });
      if (role != 1) {
        await walletModel.create({
          user: userData._id,
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10).then((hash) => {
        return hash;
      });
      const authData = await authModel.create({
        email: email,
        password: hashedPassword,
        user: userData._id,
        verified: false,
        role: role,
      });
      if (!authData)
        return res.status(200).send(failure("Failed to Create User"));
      return res
        .status(200)
        .send(success("New User Created Successfully", userData));
    } catch (err) {
      console.log(err);
      return res.status(500).send(failure("Internal Server Error"));
    }
  }
  async login(req, res) {
    const validation = validationResult(req).array();
    if (validation.length > 0) {
      return res.status(422).send(
        failure(
          "Failed to Login",
          validation.map((x) => x.msg)
        )
      );
    }
    const { email, password } = req.body;
    const auth = await authModel
      .findOne({ email: email })
      .populate("user", "-_id -__v");
    if (!auth) {
      return res.status(200).send(failure("User isn't Found!"));
    }
    const rslt = await bcrypt.compare(password, auth.password);
    if (!rslt) {
      return res.status(200).send(failure("Invalid Credentials"));
    }
    const responseData = auth.toObject();
    delete responseData._id;
    delete responseData.password;
    delete responseData.__v;
    const jwt = jsonwebtoken.sign(responseData, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    responseData.token = jwt;
    return res
      .status(200)
      .send(success("Successfully Logged In", responseData));
  }
}

module.exports = new Auth();
