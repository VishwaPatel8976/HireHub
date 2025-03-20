import { useState, useContext,useEffect } from "react";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(false);

  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
 const{setShowRecruiterLogin} = useContext(AppContext)
  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    
    if(state == 'Sign Up' && !isTextDataSubmited){  
          setIsTextDataSubmited(true)
        }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  },[]);

  return (
    <div className="absolute w-screen h-screen flex justify-center items-center backdrop-blur-sm bg-black/20 ">
      <form onSubmit={onSubmitHandler}
        className="relative flex flex-col gap-5 p-10  bg-blue-50 rounded  shadow-lg"
        action=""
      >
        <h1 className="text-2xl font-semibold text-center text-[#00263C]">
          Recruiter {state}
        </h1>
        <p className="text-center text-gray-600">
          Welcome back! Please sign in to continue
        </p>
        {state === "Sign Up" && isTextDataSubmited ? (
          <>
          <div className="my-10 flex items-center gap-4">
            <label htmlFor="image">
              <img className="w-18 rounded-full" src= {image ? URL.createObjectURL(image) :  "/src/assets/upload_area.svg"} alt="logo" />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
            <p>upload company <br /> logo</p>
          </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-2xl border-gray-300">
                <img
                  className="w-5 h-5 brightness-60"
                  src="src/assets/person_icon.svg"
                  alt=""
                />
                <input
                  className="outline-none"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                  type="text"
                  placeholder="Company name"
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-2xl border-gray-300">
              <img
                className="w-5 h-5 brightness-60"
                src="src/assets/email_icon.svg"
                alt=""
              />
              <input
                className="outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                type="email"
                placeholder="Email id "
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-2xl border-gray-300">
              <img
                className="w-5 h-5 brightness-60"
                src="src/assets/lock_icon.svg"
                alt=""
              />
              <input
                className="outline-none"
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
                type="password"
                placeholder="Password"
              />
            </div>

          </>
        )}
           {state === "Login" && <p className="text-right text-blue-700 text-sm cursor-pointer  ">
              Forgot password?
            </p>}
        <button type="submit" className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg text-white  hover:bg-gradient-to-br  px-4 py-1.5 rounded ">
          {state === "Login" ? "login" : isTextDataSubmited ? "create account" : "next"}
        </button>

        {state === "Login" ? (
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-center">
            Already have an account?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
        <img onClick={() => setShowRecruiterLogin(false)} className="absolute top-6 right-8 cursor-pointer h-3 brightness-60 hover:brightness-100 hover:text-blue-900 " src="/src/assets/cross_icon.svg" alt="" />
      </form>
    </div>
  );
};

export default RecruiterLogin;
