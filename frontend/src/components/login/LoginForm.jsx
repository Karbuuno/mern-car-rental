import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { login } from "../api/api.js";

import { UseContext } from "../context/AuthContext.jsx";

function LoginForm() {
  const { user, setUser } = UseContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const QueryClient = useQueryClient();
  //Redirecting
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  const { mutate, isError, onSuccess } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["login"] });
      setUser(data);
      console.log(data);
    },
    isError: err => {
      console.log(err);
    },
  });

  const submitHandler = async e => {
    e.preventDefault();

    mutate({ email, password });
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Enter your details</h1>

        <form className='flex flex-col gap-3' onSubmit={submitHandler}>
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='email'
            placeholder='Enter email'
            // name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='password'
            placeholder='Enter password'
            // name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type='submit'
            className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'
          >
            Login
          </button>
          <Link to={"/register"}>
            Don't have an account? <span>Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
