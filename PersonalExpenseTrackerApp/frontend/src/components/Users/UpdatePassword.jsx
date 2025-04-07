import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "../../services/users/userService";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const UpdatePassword = () => {
  //Dispatch
  const dispatch = useDispatch();
  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["change-password"],
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      mutateAsync(values.password)
        .then((data) => {
          //Logout
          dispatch(logoutAction());
          //remove the user from storage
          localStorage.removeItem("userInfo");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800 border-b border-gray-200 pb-3">
        Change Your Password
      </h2>
      <form onSubmit={formik.handleSubmit} className="w-full">
        {/* Status Messages */}
        <div className="mb-4">
          {isPending && <AlertMessage type="loading" message="Updating...." />}
          {isError && (
            <AlertMessage type="error" message={error.response.data.message} />
          )}
          {isSuccess && (
            <AlertMessage
              type="success"
              message="Password updated successfully"
            />
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-2 text-gray-700"
            htmlFor="new-password"
          >
            New Password
          </label>
          <div className="flex items-center bg-white border border-gray-300 rounded-lg py-3 px-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200 hover:shadow-md">
            <AiOutlineLock className="text-blue-500 text-xl mr-3" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="outline-none flex-1 bg-transparent"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500 mt-1 block">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;