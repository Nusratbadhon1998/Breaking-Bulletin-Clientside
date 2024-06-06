import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllArticleTable from "../../../components/Dashboard/Table/AllArticleTable";
import { toast } from "react-toastify";
import { useState } from "react";
import DeclineModal from "../../../components/Modal/DeclineModal";

function AllArticles() {
  const { user, loading } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const [articleId, setArticleId] = useState("");
  const axiosSecure = useAxiosSecure();
 
  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-articles");
      return data;
    },
  });

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

  const handleDelete = async (id) => {
    console.log(id);
  };

  return (
    <section className="my-20 mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-stone-800">
            <tr>
              <th>Author Photo</th>
              <th>Author Name</th>
              <th>Author email</th>
              <th>Title</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Publisher</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <AllArticleTable
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleModal={handleModal}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                article={article}
                key={article._id}
              />
            ))}
          </tbody>
        </table>
      </div>
      <DeclineModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDeclineReason={handleDeclineReason}
      ></DeclineModal>
    </section>
  );
}

export default AllArticles;
