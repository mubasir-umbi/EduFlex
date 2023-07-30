import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";
import generatateOtp from "../utils/generateOtp.js";
import generateToken from "../utils/generateToken.js";
import verifyEmail from "../utils/verifyMail.js";

const tutorRegister = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    password,
    addressLine,
    addressLine2,
    country,
    state,
    city,
    zip,
  } = req.body;

  const tutorExist = await Tutor.findOne({ email });

  console.log(tutorExist);
  if (tutorExist) {
    res.status(400);
    throw new Error("Email Alredy Exist");
  }

  const tutor = await Tutor.create({
    firstName,
    lastName,
    email,
    mobile,
    password,
    addressLine,
    addressLine2,
    country,
    state,
    city,
    zip,
    otp: generatateOtp(),
  });

  if (tutor) {
    verifyEmail(tutor.email, tutor.otp);

    res.status(201).json({
      _id: tutor._id,
      otp: tutor.otp,
    });
  } else {
    res.status(400);
    throw new Error("Invalid tutor data");
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.body._id);
  console.log(req.body);
  if (tutor) {
    if (tutor.otp === req.body.otp) {
      tutor.otpVerified = true;

      const updatedTutor = await tutor.save();

      res.status(201).json({
        firstName: updatedTutor.firstName,
        lastName: updatedTutor.lastName,
        email: updatedTutor.email,
        mobile: updatedTutor.mobile,
        addressline: updatedTutor.addressLine,
        addressline2: updatedTutor.addressLine2,
        country: updatedTutor.country,
        state: updatedTutor.state,
        city: updatedTutor.city,
        zip: updatedTutor.zip,
        isVerified: updatedTutor.isVerified,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Otp");
    }
  }
});

const tutorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const tutor = await Tutor.findOne({ email });

  if (tutor && (await tutor.matchPassword(password)) && tutor.otpVerified) {
    console.log(tutor);
    if (!tutor.isBlocked) {
      generateToken(res, tutor._id);

      res.status(201).json({
        id: tutor._id,
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        email: tutor.email,
        mobile: tutor.mobile,
        addressline: tutor.addressLine,
        addressline2: tutor.addressLine2,
        country: tutor.country,
        state: tutor.state,
        city: tutor.city,
        zip: tutor.zip,
        isVerified: tutor.isVerified,
        isBlocked: tutor.isBlocked,
      });
    } else {
      res.status(401);
      throw new Error("Can not login, you are blocked");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutTutor = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const myStudents = asyncHandler(async (req, res) => {
  const tutorId = req.query.id;

  const students = await Tutor.findById(tutorId).populate("students");

  // await Tutor.aggregate([
  //   {
  //     $match: {
  //       _id: tutorId,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'users',
  //       localField: 'students',
  //       foreignField: '_id',
  //       as: 'studentsInfo',
  //     },
  //   },
  // ])

  if (students) {
  const myStudents =   students.students.map((std) => {
      return {
        id: std._id,
        fName : std.fName,
        lName: std.lName,
        email: std.email
         }
    })
    res.json(myStudents);
  } else {
    throw new Error("Error");
  }
})



export { tutorRegister, verifyOtp, tutorLogin, logoutTutor, myStudents };
