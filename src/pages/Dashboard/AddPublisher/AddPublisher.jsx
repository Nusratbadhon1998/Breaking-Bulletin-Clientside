import React from "react";
import Input from "../../../components/Form/Input";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utils/imageApi";
import { toast } from "react-toastify";
import Submit from "../../../components/Shared/Button/Submit";
import newspaper from "../../../assets/newpaper.jpg";
function AddPublisher() {
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (publisherData) => {
      const { data } = await axiosSecure.post("/publishers", publisherData);
      if (data.acknowledged) {
        toast.success("Successfully added publisher");
      } else {
        toast.warn("Already exist !!");
      }
    },
  });
  const handlePublish = async (e) => {
    e.preventDefault();
    const form = e.target;
    const publisherName = form.publisherName.value;
    const image = form.image.files[0];

    try {
      const imageURL = await imageUpload(image);
      const publisherData = { publisherName, imageURL };

      const { data } = await mutateAsync(publisherData);
    } catch {}
  };
  return (
    <section className="flex flex-col justify-center items-center mx-auto min-h-screen bg-[url(https://t4.ftcdn.net/jpg/03/00/85/23/360_F_300852364_qSrtNxY6pokaVR7er7knpb8AyYJSxtUd.jpg)]">
        
        <form
          onSubmit={handlePublish}
          className="flex flex-col bg-white justify-center space-y-5 border p-6"
        >
          <h1 className="text-center text-2xl">Add Publisher</h1>
          <Input
            label={"Publisher Name"}
            name={"publisherName"}
            type={"text"}
          />
          <input type="file" name="image" id="" />
          <Submit />
        </form>
    </section>
  );
}

export default AddPublisher;
