import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import DeclineModal from "../../../components/Modal/DeclineModal";
import ArticleCard from "../../../components/Dashboard/ArticleCard";
import Container from "../../../components/Shared/Container";
import Swal from "sweetalert2";

function AllArticles() {
  const { user, loading } = useAuth();
  
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  let [isOpen, setIsOpen] = useState(false);
  const [articleId, setArticleId] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles",currentPage, itemsPerPage],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-articles?page=${currentPage}&size=${itemsPerPage}`);
      return data;
    },
  });
  const { data  } = useQuery({
    queryKey: ["articles-count"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/articles-count");
      setCount(data.result);
      return data;
    },
  });

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  //   add decline reason
  const { mutateAsync } = useMutation({
    mutationFn: async (reason) => {
      const { data } = await axiosSecure.put(`/articles/${articleId}`, {
        declineReason: reason,
      });
      console.log(data);
    },
    onSuccess: () => {
      console.log("success");
    },
  });
  // Change status and premium
  const handleUpdate = async ({ id, status, isPremium }) => {
    if (isPremium) {
      try {
        const { data } = await axiosSecure.patch(`/articles/${id}`, {
          isPremium,
        });
        if (data.modifiedCount) {
          toast.success("Updated premium");
          refetch();
        }
      } catch (error) {
        console.log("Error in handleStatus:", error); // Debugging line
        toast.warning(error.message);
      }
    }
    if (status) {
      try {
        const { data } = await axiosSecure.patch(`/articles/${id}`, {
          status,
        });
        if (data.modifiedCount) {
          toast.success("Updated");
          refetch();
        }
      } catch (error) {
        console.log("Error in handleStatus:", error); // Debugging line
        toast.warning(error.message);
      }
    }
  };

  const handleModal = (_id) => {
    setIsOpen(true);
    setArticleId(_id);
  };

  const handleDeclineReason = async (e) => {
    e.preventDefault();
    const form = e.target;
    const declineReason = form.reason.value;
    console.log(declineReason);

    mutateAsync(declineReason);

    setIsOpen(false);
  };

  const handleDelete =  (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33#B2BEB5",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/article/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        });
      }
    });
  };
  const handlePaginationButton = (value) => {
    console.log(value);
    setCurrentPage(value);
  };
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      {articles.map((article) => (
        <ArticleCard
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleModal={handleModal}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          article={article}
          key={article._id}
        />
      ))}
      </div>
      <div className="flex justify-center mt-12">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="px-4 py-2 mx-1 text-stone-700 disabled:text-gray-500 capitalize bg-stone-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-stone-500  hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>

              <span className="mx-1">previous</span>
            </div>
          </button>
          {/* Numbers */}
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-stone-800 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-stone-500  hover:text-white`}
            >
              {btnNum}
            </button>
          ))}
          {/* Next Button */}
          <button
            disabled={currentPage === numberOfPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="px-4 py-2 mx-1 text-stone-700 transition-colors duration-300 transform bg-stone-200 rounded-md hover:bg-stone-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      <DeclineModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDeclineReason={handleDeclineReason}
      ></DeclineModal>
    </Container>
  );
}

export default AllArticles;
