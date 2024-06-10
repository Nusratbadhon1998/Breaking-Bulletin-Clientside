import React from "react";
import Input from "../../components/Form/Input";
import { useState } from "react";
import Select from "react-select";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure, { axiosSecure } from "../../hooks/useAxiosSecure";
import Submit from "../../components/Shared/Button/Submit";
import Container from "../../components/Shared/Container";
import { imageUpload } from "../../utils/imageApi";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Shared/Header";
import ScrollToTopButton from "../../components/Shared/ScrollToTopButton";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  const { user } = useAuth();
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/publishers");
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (articleData) => {
      const { data } = await axiosSecure.post("/articles", articleData);
      if (data.message){
        toast.warn(data.message)
      }else{
        toast.success("Successfully added data");

      }
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const image = form.image.files[0];
    const tag = selectedTag.value;
    const publisher = selectedPublisher.value;

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
      console.log(data)

      navigate("/my-articles");
      form.reset();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header title={"Add your DEsire article"} />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Input label={"Article Title"} name="title" type="text" />
          <Input label={"Photo"} name="image" type="file" />
          <Select
            defaultValue={selectedTag}
            onChange={setSelectedTag}
            options={tagsOptions}
            placeholder="Tags"
            className=" border-black bg-stone-50 text-stone-800"
          />
          <Select
            defaultValue={selectedPublisher}
            onChange={setSelectedPublisher}
            options={publisherOptions}
            placeholder="Publishers"
            className=" border-black bg-stone-50 text-stone-800"
          />
        </div>
        <textarea
          placeholder="Descriptions"
          rows={10}
          className="w-full border border-black my-5"
          name="description"
          id=""
        ></textarea>
        <Submit value="Add" />
      </form>
      <ScrollToTopButton />
    </Container>
  );
}

export default AddArticle;
