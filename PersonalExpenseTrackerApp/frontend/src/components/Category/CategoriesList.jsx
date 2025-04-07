import React from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCategoryAPI,
  listCategoriesAPI,
} from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  //fetching
  const { data, isError, isLoading, isFetched, error, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  //Deleting
  //Navigate
  const navigate = useNavigate();

  // Mutation
  const {
    mutateAsync,
    isPending,
    error: categoryErr,
    isSuccess,
  } = useMutation({
    mutationFn: deleteCategoryAPI,
    mutationKey: ["delete-category"],
  });
  //Delete handler
  const handleDelete = (id) => {
    mutateAsync(id)
      .then((data) => {
        //refetch
        refetch();
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="max-w-3xl mx-auto my-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
          <p className="text-gray-500 mt-1">Manage your transaction categories</p>
        </div>
        <Link to="/add-category">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md">
            <FaPlus size={12} />
            <span>Add New</span>
          </button>
        </Link>
      </div>

      {/* Display message */}
      {isLoading && <AlertMessage type="loading" message="Loading categories..." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}
      {isSuccess && (
        <AlertMessage type="success" message="Category deleted successfully!" />
      )}

      {data?.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <p className="text-gray-500 text-lg">No categories found. Create your first category!</p>
        </div>
      )}

      <ul className="space-y-3">
        {data?.map((category) => (
          <li
            key={category?._id}
            className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center">
              <div className={`w-2 h-12 rounded-full mr-4 ${
                category.type === "income" ? "bg-green-500" : "bg-red-500"
              }`}></div>
              <div>
                <span className="text-lg font-medium text-gray-800">{category?.name}</span>
                <span
                  className={`ml-3 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    category.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {category?.type?.charAt(0).toUpperCase() +
                    category?.type?.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link to={`/update-category/${category._id}`}>
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200">
                  <FaEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(category?._id)}
                disabled={isPending}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <FaTrash />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;