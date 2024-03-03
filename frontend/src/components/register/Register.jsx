import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { register } from "../api/api.js";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["register"] });
      navigate("/");
      console.log(data);
    },
  });
  // const { mutate, isLoading, isError, data } = useMutation(login, {
  //   onSuccess: data => console.log(data),
  // });
  const submitHandler = e => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const newUser = Object.fromEntries(formData);
    registerMutation.mutate({ name, email, password });
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Enter your details</h1>
        <form className='flex flex-col gap-3' onSubmit={submitHandler}>
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='text'
            name='name'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Enter your name'
          />
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='text'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='password'
            name='password'
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
