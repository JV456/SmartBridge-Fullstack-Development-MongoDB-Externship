import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { registerAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

//Validations
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
});

const RegistrationForm = () => {
  //Navigate
  const navigate = useNavigate();
  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      console.log(values);
      //http request
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });
  
  //Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/login");
      }
    }, 3000);
  }, [isPending, isError, error, isSuccess, navigate]);
  
  return (
    <div className="max-w-md mx-auto my-12 overflow-hidden">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-6 rounded-t-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white tracking-wide">
          Create Account
        </h2>
        <p className="text-center text-blue-100 mt-2 font-medium">
          Join our community and start tracking your finances
        </p>
      </div>
      
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-b-2xl shadow-xl space-y-6 border border-gray-100"
      >
        {/* Display messages */}
        {isPending && <AlertMessage type="loading" message="Processing your registration..." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || "Registration failed"} />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Registration successful! Redirecting to login..." />
        )}

        {/* Input Field - Username */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 ml-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="text-blue-500" />
            </div>
            <input
              id="username"
              type="text"
              {...formik.getFieldProps("username")}
              placeholder="Choose a username"
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 shadow-sm hover:border-blue-300"
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-xs font-medium ml-1 mt-1">{formik.errors.username}</p>
          )}
        </div>

        {/* Input Field - Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 ml-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaEnvelope className="text-blue-500" />
            </div>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="your@email.com"
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 shadow-sm hover:border-blue-300"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs font-medium ml-1 mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Input Field - Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="text-blue-500" />
            </div>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="At least 6 characters"
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 shadow-sm hover:border-blue-300"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs font-medium ml-1 mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Input Field - Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 ml-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="text-blue-500" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              {...formik.getFieldProps("confirmPassword")}
              placeholder="Confirm your password"
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 shadow-sm hover:border-blue-300"
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-xs font-medium ml-1 mt-1">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            {isPending ? "Processing..." : "Create Account"}
            {!isPending && <FaArrowRight className="ml-2" />}
          </button>
        </div>
        
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
