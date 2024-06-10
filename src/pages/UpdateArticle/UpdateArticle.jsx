import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import Header from "../../components/Shared/Header";
import Input from "../../components/Form/Input";
import Select from "react-select";
import Submit from "../../components/Shared/Button/Submit";
import ScrollToTopButton from "../../components/Shared/ScrollToTopButton";
import { imageUpload } from "../../utils/imageApi";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

function UpdateArticle() {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const navigate= useNavigate()

  const { data: publishers = [], isLoading: publisherLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/publishers");
      return data;
    },
  });
  const { data: article = {}, isLoading,refetch } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/article/${id}`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (articleData) => {
      const { data } = axiosSecure.put(`article/${article._id}`, articleData);
      console.log(data)
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("article", id);
      toast.success("Updated Successfully");
      navigate('/my-articles')
    },
  });

  const [selectedTag, setSelectedTag] = useState(article?.tag);
  const [selectedPublisher, setSelectedPublisher] = useState(
    article?.publisher
  );
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const tag = selectedTag?.value || article.tag;
    const publisher = selectedPublisher?.value || article.publisher;

    try {
      const imageURL = await imageUpload(image);
      const articleData = {
        title,
        imageURL,
        tag,
        publisher,
        description,
        authorName: user?.displayName,
        authorEmail: user?.email,
        authorImage: user?.photoURL,
      };

      const { data } = await mutateAsync(articleData);
      console.log(data);

      form.reset();

      console.log(articleData);
    } catch (error) {
      console.log(error);
    }
  };

  const publisherOptions = publishers.map((publisher) => ({
    value: publisher.publisherName,
    label: publisher.publisherName,
  }));
  const tagsOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Environment", label: "Environment" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Cyber-security", label: "CyberSecurity" },
    { value: "Finance", label: "Finance" },
    { value: "Society", label: "Society" },
    { value: "Sports", label: "Sports" },
    { value: "Global-market", label: "GlobalMarket" },
    { value: "International", label: "International" },
  ];

  return (
    <Container>
      <Header title={"Update your DEsire article"} />
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Input
            defaultValue={article.title}
            label={"Article Title"}
            name="title"
            type="text"
          />
          <div className="flex gap-5 ">
            <Input label={"Photo"} name="image" type="file" />

            <div className="flex justify-center items-center  p-5 border">
              <img
                className="size-12 bg-cover "
                src={article.imageURL}
                alt="Default Image"
              />
            </div>
          </div>

          <Select
            defaultValue={article.tag}
            placeholder={article.tag}
            onChange={setSelectedTag}
            options={tagsOptions}
            className=" border-black bg-stone-50 text-stone-800"
          />
          <Select
            defaultValue={article.publisher}
            placeholder={article.publisher}
            onChange={setSelectedPublisher}
            options={publisherOptions}
            className=" border-black bg-stone-50 text-stone-800"
          />
        </div>
        <textarea
          placeholder="Descriptions"
          defaultValue={article.description}
          rows={10}
          className="w-full border border-black my-5 p-5"
          name="description"
          id=""
        ></textarea>
        <Submit value="Update" />
      </form>
      <ScrollToTopButton />
    </Container>
  );
}

export default UpdateArticle;
