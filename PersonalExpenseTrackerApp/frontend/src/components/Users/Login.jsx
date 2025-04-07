import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { loginAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";

//! Validations
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  //Navigate
  const navigate = useNavigate();
  //Dispatch
  const dispatch = useDispatch();
  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: {
      email: "ben@gmail.com",
      password: "123456",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      console.log(values);
      //http request
      mutateAsync(values)
        .then((data) => {
          //dispatch
          dispatch(loginAction(data));
          //Save the user into localStorage
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    },
  });
  
  //Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/profile");
      }
    }, 3000);
  }, [isPending, isError, error, isSuccess, navigate]);
  
  return (
    <div className="max-w-md mx-auto my-12">
      {/* Top Card with Image/Illustration */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-t-2xl text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400 opacity-20 rounded-tr-full"></div>
        
        <h2 className="text-3xl font-bold text-white tracking-wide relative z-10">
          Welcome Back
        </h2>
        <p className="text-blue-100 mt-2 font-medium">
          Sign in to continue to your account
        </p>
      </div>
      
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-b-2xl shadow-xl space-y-6 border-x border-b border-gray-100"
      >
        {/* Display messages */}
        {isPending && <AlertMessage type="loading" message="Signing you in..." />}
        {isError && (
          <AlertMessage 
            type="error" 
            message={error?.response?.data?.message || "Login failed. Please check your credentials."} 
          />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Login successful! Redirecting..." />
        )}

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
              placeholder="Your email address"
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
              placeholder="Your password"
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 shadow-sm hover:border-blue-300"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs font-medium ml-1 mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <a 
            href="/forgot-password" 
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            {isPending ? "Signing in..." : "Sign In"}
            {!isPending && <FaSignInAlt className="ml-2" />}
          </button>
        </div>
        
        {/* Registration Link */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a 
              href="/register" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Create one now
            </a>
          </p>
        </div>
      </form>
      
      {/* Security Note */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500 flex items-center justify-center">
          <FaLock className="text-gray-400 mr-1" size={12} />
          Secure login with 256-bit encryption
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
