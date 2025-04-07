import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const AddCategory = () => {
  //Navigate
  const navigate = useNavigate();

  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          navigate("/categories");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-100 transition-all duration-300 hover:shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Category
          </h2>
          <p className="text-gray-500 text-lg">Fill in the details below</p>
        </div>
        
        {/* Display alert message */}
        {isError && (
          <AlertMessage
            type="error"
            message={
              error?.response?.data?.message ||
              "Something happened please try again later"
            }
          />
        )}
        {isSuccess && (
          <AlertMessage
            type="success"
            message="Category added successfully, redirecting..."
          />
        )}
        
        {/* Category Type */}
        <div className="space-y-2">
          <label
            htmlFor="type"
            className="flex gap-2 items-center text-gray-700 font-semibold text-lg"
          >
            <FaWallet className="text-blue-600" />
            <span>Type</span>
          </label>
          <select
            {...formik.getFieldProps("type")}
            id="type"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700"
          >
            <option value="">Select transaction type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-sm mt-1 font-medium">{formik.errors.type}</p>
          )}
        </div>

        {/* Category Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="flex gap-2 items-center text-gray-700 font-semibold text-lg">
            <SiDatabricks className="text-blue-600" />
            <span>Name</span>
          </label>
          <input
            type="text"
            {...formik.getFieldProps("name")}
            placeholder="Enter category name"
            id="name"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1 font-medium">{formik.errors.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transform transition-all duration-200 ease-in-out hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isPending ? (
              <span className="inline-block animate-pulse">Processing...</span>
            ) : (
              "Add Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;