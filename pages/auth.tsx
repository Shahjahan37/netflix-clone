import axios from "axios";
import Input from "@/components/input";
import { useCallback, useState } from "react";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => {
      return currentVariant === "login" ? "register" : "login";
    });
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        password,
        name,
      });
    } catch (error: any) {
      console.log("Register api error ", error.response);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black lg:bg-black/50 w-full h-full">
        <nav className="px-12 py-5">
          <img src="/images/logo.svg" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  onChange={(event: any) => {
                    setName(event.target.value);
                  }}
                  value={name}
                  label="Username"
                />
              )}
              <Input
                id="email"
                onChange={(event: any) => {
                  setEmail(event.target.value);
                }}
                value={email}
                label="Email"
                type="email"
              />
              <Input
                id="password"
                onChange={(event: any) => {
                  setPassword(event.target.value);
                }}
                value={password}
                label="Password"
                type="password"
              />
            </div>
            <button
              onClick={register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login now"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
