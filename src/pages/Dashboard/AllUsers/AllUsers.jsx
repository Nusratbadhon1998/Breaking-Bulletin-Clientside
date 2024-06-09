import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../components/Shared/Container";
import AllUsersTable from "../../../components/Dashboard/Table/AllUsersTable";
import { toast } from "react-toastify";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

function AllUsers() {
  const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxiosCommon();
  const queryClient = useQueryClient();


  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const {
    data: users = [],
    isLoading: usersLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });
  const { data: userCount = {}, isLoading } = useQuery({
    queryKey: ["users-count"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/users-count");
      setCount(data.totalUsers);
      return data;
    },
  });

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const { mutateAsync } = useMutation({
    mutationFn: async (email) => {
      const { data } = axiosSecure.patch(`/user/admin/${email}`);
    },
    onSuccess: () => {
      toast.success("User is now admin");
      queryClient.invalidateQueries("users");
    },
  });

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleAdmin = async (email) => {
    await mutateAsync(email);
  };
 if (usersLoading) return <LoadingSpinner/>
  return (
    <Container>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-stone-800">
            <tr>
              <th>User Photo</th>
              <th>User Name</th>
              <th>User email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <AllUsersTable
                handleAdmin={handleAdmin}
                user={user}
                key={user._id}
              />
            ))}
          </tbody>
        </table>
        {/* pagination button */}
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
      </div>
    </Container>
  );
}

export default AllUsers;
