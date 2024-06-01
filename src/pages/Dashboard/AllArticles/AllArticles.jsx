import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AllArticleTable from "../../../components/Dashboard/Table/AllArticleTable";

function AllArticles() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/articles");
      return data;
    },
  });
  return (
    <section>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {articles.map((article) => (
              <AllArticleTable article={article} key={article._id} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AllArticles;
