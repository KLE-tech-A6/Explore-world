import React from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const BlogDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSuccessAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Blog Deleted Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const handleErrorAlert = () => {
    Swal.fire({
      title: "Something Went Wrong",
      text: "Fix it and try again",
      icon: "error",
    });
  };

  const handleDeleteBlog = () => {
    axios
      .delete(`http://localhost:5050/blogs/delete/${id}`)
      .then(() => {
        handleSuccessAlert();
        navigate("/blogs");
      })
      .catch((err) => {
        handleErrorAlert();
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      <div className="flex">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="pl-80 pt-8 pr-10 w-full">
          <h1 className="text-2xl font-bold">Blog Hotel</h1>
          <div className="flex flex-col items-center shadow-2xl rounded-xl w-[600px] mt-20 p-8 mx-auto">
            <h3 className="text-2xl">
              Are you sure you want to delete this Blog
            </h3>

            <div className="flex justify-center mt-8 gap-10">
              <button
                onClick={handleDeleteBlog}
                className="bg-red-600 text-white p-2 w-28 rounded-lg font-semibold"
              >
                Yes, Delete
              </button>
              <Link to="/blogs">
                <button className="bg-sky-600 text-white p-2 w-28 rounded-lg font-semibold">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDelete;
