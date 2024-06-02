import React, { useState } from "react";
import MyArticleRow from "../../components/Table/MyArticleRow";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import DeclineReasonModal from "../../components/Modal/DeclineReasonModal";

function MyArticles() {
  const { user, loading } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");


  const handleModal = (_id) => {
    setIsOpen(true);
    setId(_id);
    console.log(id)
  };
// Getting data
  const {
    data: myArticle = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-article", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/articles/${user.email}`);
      return data;
    },
  });

  const {data:singleArticle={},isLoading:articleLoading}=useQuery({
    queryKey:['article',id],
    queryFn: async()=>{
      const {data}= await axiosSecure.get(`/article/${id}`)
      return data
    }
  })

  const handleDeclineReason = async () => {
    

    setIsOpen(false);
  };

  return (
    <Container>
      <section className="my-20 mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="text-stone-800">
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Details</th>
                <th>Status</th>
                <th>Premium</th>

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myArticle.map((article, idx) => (
                <MyArticleRow
                  idx={idx}
                  // handleDelete={handleDelete}
                  // handleUpdate={handleUpdate}
                  handleModal={handleModal}
                  article={article}
                  key={article._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <DeclineReasonModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        singleArticle={singleArticle}
      />
    </Container>
  );
}

export default MyArticles;
