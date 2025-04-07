import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
  FaPlus,
} from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { addTransactionAPI } from "../../services/transactions/transactionService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
});

const TransactionForm = () => {
  //Navigate
  const navigate = useNavigate();

  // Mutation
  const {
    mutateAsync,
    isPending,
    isError: isAddTranErr,
    error: transErr,
    isSuccess,
  } = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ["add-transaction"],
  });
  //fetching
  const { data, isError, isLoading, isFetched, error, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="max-w-xl mx-auto my-12 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl overflow-hidden border border-blue-100 transform transition-all duration-300 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 opacity-20 rounded-full"></div>
        <div className="absolute -bottom-14 -left-14 w-48 h-48 bg-indigo-500 opacity-20 rounded-full"></div>
        <h2 className="text-3xl font-extrabold tracking-tight relative z-10">Add New Transaction</h2>
        <p className="mt-2 opacity-90 text-blue-100 font-medium">Track your income and expenses with ease</p>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="p-8 space-y-6">
        {/* Display alert message */}
        {isPending && <AlertMessage type="loading" message="Adding transaction..." />}
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
          <AlertMessage type="success" message="Transaction added successfully" />
        )}

        {/* Transaction Type Field */}
        <div className="space-y-2">
          <label
            htmlFor="type"
            className="flex items-center text-gray-700 font-semibold mb-2"
          >
            <FaWallet className="text-blue-600 mr-2" />
            <span>Transaction Type</span>
          </label>
          <div className="relative">
            <select
              {...formik.getFieldProps("type")}
              id="type"
              className="block w-full p-4 pl-4 pr-10 border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 appearance-none bg-white hover:border-blue-300"
            >
              <option value="">Select transaction type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.type}</p>
          )}
        </div>

        {/* Amount Field */}
        <div className="space-y-2">
          <label htmlFor="amount" className="flex items-center text-gray-700 font-semibold mb-2">
            <FaDollarSign className="text-blue-600 mr-2" />
            <span>Amount</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-medium">$</span>
            </div>
            <input
              type="number"
              {...formik.getFieldProps("amount")}
              id="amount"
              placeholder="0.00"
              className="pl-10 block w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 hover:border-blue-300"
            />
          </div>
          {formik.touched.amount && formik.errors.amount && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.amount}</p>
          )}
        </div>

        {/* Category Field */}
        <div className="space-y-2">
          <label htmlFor="category" className="flex items-center text-gray-700 font-semibold mb-2">
            <FaRegCommentDots className="text-blue-600 mr-2" />
            <span>Category</span>
          </label>
          <div className="relative">
            <select
              {...formik.getFieldProps("category")}
              id="category"
              className="block w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 appearance-none bg-white hover:border-blue-300"
            >
              <option value="">Select a category</option>
              {data?.map((category) => (
                <option key={category?._id} value={category?.name}>
                  {category?.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.category}</p>
          )}
        </div>

        {/* Date Field */}
        <div className="space-y-2">
          <label htmlFor="date" className="flex items-center text-gray-700 font-semibold mb-2">
            <FaCalendarAlt className="text-blue-600 mr-2" />
            <span>Date</span>
          </label>
          <div className="relative">
            <input
              type="date"
              {...formik.getFieldProps("date")}
              id="date"
              className="block w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 hover:border-blue-300"
            />
          </div>
          {formik.touched.date && formik.errors.date && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.date}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label htmlFor="description" className="flex items-center text-gray-700 font-semibold mb-2">
            <FaRegCommentDots className="text-blue-600 mr-2" />
            <span>Description (Optional)</span>
          </label>
          <textarea
            {...formik.getFieldProps("description")}
            id="description"
            placeholder="Add notes about this transaction"
            rows="3"
            className="block w-full p-4 border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-200 hover:border-blue-300"
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            {isPending ? "Processing..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
