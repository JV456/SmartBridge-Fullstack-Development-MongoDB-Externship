import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
  FaArrowLeft,
} from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams, Link } from "react-router-dom";
import { updateCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const UpdateCategory = () => {
  //Params
  const { id } = useParams();
  //Navigate
  const navigate = useNavigate();

  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateCategoryAPI,
    mutationKey: ["update-category"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        id,
      };
      mutateAsync(data)
        .then((data) => {
          //redirect
          navigate("/categories");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4">
      <div className="w-full max-w-lg">
        <Link 
          to="/categories" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2" /> Back to Categories
        </Link>
        
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-100 transition-all duration-300 hover:shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Update Category
            </h2>
            <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-500 text-lg">Modify the category details below</p>
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
              message="Category updated successfully, redirecting..."
            />
          )}
          
          {/* Category Type */}
          <div className="space-y-2">
            <label
              htmlFor="type"
              className="flex gap-2 items-center text-gray-700 font-semibold text-lg"
            >
              <FaWallet className="text-indigo-600" />
              <span>Type</span>
            </label>
            <select
              {...formik.getFieldProps("type")}
              id="type"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-700"
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
              <SiDatabricks className="text-indigo-600" />
              <span>Name</span>
            </label>
            <input
              type="text"
              {...formik.getFieldProps("name")}
              placeholder="Enter category name"
              id="name"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-700"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1 font-medium">{formik.errors.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex gap-4">
            <Link
              to="/categories"
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 ease-in-out text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="w-2/3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-lg transform transition-all duration-200 ease-in-out hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isPending ? (
                <span className="inline-block animate-pulse">Processing...</span>
              ) : (
                "Update Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;