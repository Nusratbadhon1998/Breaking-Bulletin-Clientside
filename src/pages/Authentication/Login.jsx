import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";
import { FaTwitter } from "react-icons/fa";

// import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/Form/Input";

function Login() {
  const [showPass, setShowPass] = useState(false);

  const { signIn, signInWithGoogle, user, setUser } = useAuth();

  const [error, setError] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then(() => {
        // Successful login
        navigate(location?.state ? location.state : "/");
        toast.success("Successfully Logged In!", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        // Error handling
        setError("Invalid Credential");
        toast.warn("Invalid Credentials");
      });
  };

  const socialLogin = (provider) => {
    provider()
      .then((result) => {
        toast.success("Successfully Logged In");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      {/* <Helmet>
        <title>Login</title>
      </Helmet> */}
      <div
        data-aos="fade-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        className="flex flex-col md:flex-row lg:flex-row my-20"
      >
        <div className="w-full  md:w-[75%] lg:w-[40%] min-h-screen relative">
          <img
            className="w-full h-full"
            src="https://cdn.britannica.com/47/65947-050-2A0F17EF/sinking-New-York-Herald-ocean-liner-British-May-7-1915.jpg"
            alt=""
          />
        </div>
        {/* Form */}
        <div className=" w-full shadow-xl bg-yellow/10 md:w-[55%] lg:w-[60%] p-8 space-y-3  bg-stone-100 text-stone-700 ">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input label={"Email"} name={"email"} type={"email"} />
            <Input label={"Password"} name={"password"} type={"password"} />
            <div
              className="absolute right-12 top-[39%] lg:top-[28.5%]"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </div>
            {error && <small className="text-red-500 text-left">{error}</small>}

            <input
              className="block w-full p-3 text-center   bg-stone-800 cursor-pointer text-white font-semibold"
              type="submit"
              value="Sign In"
            />
          </form>

          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            <p className="px-3 text-sm text-gray-600">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          </div>
          <div className="flex justify-center space-x-4">
            {/* Google Button */}
            <button
              onClick={() => socialLogin(signInWithGoogle)}
              aria-label="Log in with Google"
              className="p-3 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
            {/* Github Button */}
            <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
            <FaTwitter className="size-6" />

            </button>
          </div>
          <p className="text-xs text-center sm:px-6 text-gray-600">
            Don't have an account?
            <Link to="/register" className="underline text-gray-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
