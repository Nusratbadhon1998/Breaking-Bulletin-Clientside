import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";

function Register() {
  const [showPass, setShowPass] = useState(false);
  const { user, setUser, createUser, updateUserProfile } =
    useContext(AuthContext);

  console.log(user);

  const [loading, setLoading] = useState(false);
  // Error show
  const [error, setError] = useState(null);
  // success
  const [success, setSuccess] = useState(null);
  // for password validation
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const minSixCharsRegex = /^.{6,}$/;

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Clearing the error and success message
    setError("");
    setSuccess("");
    setLoading(true);

    const form = e.target;
    const userName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    try {
      if (!uppercaseRegex.test(password)) {
        toast.error("Password should contain at-least one uppercase", {
          position: "top-right",
          autoClose: 2000,
        }),
          setError("Password should contain at-least one uppercase");
        return;
      } else if (!specialCharRegex.test(password)) {
        toast.error("Password should contain one special character", {
          position: "top-right",
          autoClose: 2000,
        }),
          setError("Password should contain at-least one lowercase");
        return;
      } else if (!minSixCharsRegex.test(password)) {
        toast.error("Password should at-least 6 char", {
          position: "top-right",
          autoClose: 2000,
        }),
          setError("Password should at-least 6 char");
        return;
      }

      // 1. Upload image and get image url
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      console.log(data.data.display_url);

      //2. User Registration
      const result = await createUser(email, password);

      // 3. Save username and photo in firebase
      await updateUserProfile(userName, data.data.display_url);

      setUser({
        email: email,
        displayName: userName,
        photoURL: data.data.display_url,
      });
      setLoading(false);

      navigate("/");
      toast.success("Signup Successful");
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row lg:flex-row my-20">
      <div className="w-full  md:w-[75%] lg:w-[40%] min-h-screen relative">
        <img
          className="w-full h-full"
          src="https://images.unsplash.com/photo-1699523525646-ae96e089474f?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>

      <div
        data-aos="fade-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        className=" w-full bg-yellow/10 md:w-[55%] lg:w-[60%] p-8 space-y-3 rounded-xl bg-stone-100 text-stone-700 "
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="Name" className="block text-gray-600 font-bold">
              Username
            </label>
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="w-full border border-black px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-stone-800 focus:border-violet-600"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="Email" className="block text-gray-600 font-bold">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="email"
              className="w-full border bg-gray-50 text-stone-800 focus:border-violet-600"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-600 font-bold">
              Photo URL
            </label>
            <input type="file" name="image" id="" />
          </div>
          <div className="space-y-1 text-sm relative">
            <label htmlFor="password" className="block text-gray-600 font-bold">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full  border border-black px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-stone-800 focus:border-violet-600 "
            />
            <div
              className="absolute right-3 bottom-4"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </div>
            {error && (
              <small className="font-semibold mt-12 text-left text-red">
                {error}
              </small>
            )}
          </div>

          <input
            disabled={loading}
            className="block w-full p-3 text-center rounded-lg bg-black text-white font-semibold"
            type="submit"
            value="Sign Up"
          />
        </form>

        <p className="text-base text-center sm:px-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="underline font-bold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
