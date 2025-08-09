import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { register } from "../api/api.js";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const from = sp.get("from");
  const to = sp.get("to");
  const totalDays = sp.get("totalDays");

  // car id
  const carId = sp.get("carId");

  const finalRedirect =
    from && to && totalDays
      ? `${redirect}?carId=${carId}&from=${from}&to=${to}&totalDays=${totalDays}`
      : redirect;

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      navigate(finalRedirect, { replace: true });
    },
    onError: err => {
      console.error("Registration failed:", err);
    },
  });

  const submitHandler = e => {
    e.preventDefault();
    if (name && email && password) {
      registerMutation.mutate({ name, email, password });
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Enter your details</h1>
        <form className='flex flex-col gap-3' onSubmit={submitHandler}>
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Enter your name'
          />
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter your password'
          />

          <button
            type='submit'
            className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'
          >
            Register
          </button>

          <Link to={"/login"}>
            Already registered? <span>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
