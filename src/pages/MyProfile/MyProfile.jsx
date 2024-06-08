import React from "react";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Shared/Container";
import Input from "../../components/Form/Input";
import Header from "../../components/Shared/Header";
import { toast } from "react-toastify";
import Submit from "../../components/Shared/Button/Submit";
import { imageUpload } from "../../utils/imageApi";

function MyProfile() {
  const { user, updateUserProfile,setUser } = useAuth();
  const handleUpdate = async (e) => {
    console.log("first");

    e.preventDefault();

    const userName = e.target.name.value;
    const email = user?.email;
    const image = e.target.image.files[0];

    try {
      const imageURL = await imageUpload(image);
      await updateUserProfile(userName, imageURL);

      setUser({ email: email, displayName: userName, photoURL: imageURL });
      toast.success("Profile Updated")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Header title={"Update"} />
      <div className="flex justify-between">
        <div className=" border border-black flex items-center  p-8 sm:flex sm:space-x-6 dark:bg-gray-50 dark:text-gray-800">
          <div className="flex-shrink-0  w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0 bg-stone-100/">
            <img
              src={user?.photoURL}
              alt=""
              className="object-cover border object-center w-full h-full rounded dark:bg-gray-500"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
            </div>
            <div className="space-y-1">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Email address"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  ></path>
                </svg>
                <span className="dark:text-gray-600">{user?.email}</span>
              </span>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleUpdate} className="space-y-5 border p-5">
            <Input
              name={"name"}
              label="User Name"
              type="text"
              defaultValue={user?.displayName}
            />
            <Input
              name={"email"}
              label="Email"
              type="email"
              defaultValue={user?.email}
            />
            <Input name={"image"} label="Photo" type="file" />
            <Submit value="Update"/>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default MyProfile;
