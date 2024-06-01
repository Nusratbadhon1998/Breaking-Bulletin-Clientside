import React from "react";
import Input from "../../../components/Form/Input";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utils/imageApi";
import { toast } from "react-toastify";

function AddPublisher() {
    const axiosSecure=useAxiosSecure()

const {mutateAsync}=useMutation({
    mutationFn:async(publisherData)=>{
        console.log(publisherData)

       const {data}=await axiosSecure.post('/publishers',publisherData)
       console.log(data)
       if(data.acknowledged){
        toast.success("Successfully added publisher")
       }
       else{
        toast.warn("Already exist !!")
       }

    }
})
  const handlePublish = async (e) => {
    e.preventDefault();
    const form= e.target
    const publisherName = form.publisherName.value;
    const image = form.image.files[0];

    try{

        const imageURL=await imageUpload(image)
        const publisherData= {publisherName,imageURL}

        const {data}=await mutateAsync(publisherData)




    }catch{

    }
  };
  return (
    <section className="flex bg-stone-300 justify-center items-center mx-auto min-h-screen">
      <form onSubmit={handlePublish} className="flex flex-col space-y-5">
      <Input label={"Publisher Name"} name={"publisherName"} type={"text"}/>
        <input type="file" name="image" id="" />
        <input
          className="px-4 py-2 border border-black hover:bg-stone-800 hover:text-stone-200 transition-colors duration-300"
          type="submit"
          value="Add"
        />
      </form>
    </section>
  );
}

export default AddPublisher;
