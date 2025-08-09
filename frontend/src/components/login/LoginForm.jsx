import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { login } from "../api/api.js";
import { UseContext } from "../context/AuthContext.jsx";

function LoginForm() {
  const { setUser } = UseContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";
  const carId = searchParams.get("carId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const totalDays = searchParams.get("totalDays");

  // Build final redirect without duplicate carId
  const params = new URLSearchParams();
  if (carId && !redirect.includes(`/car/${carId}`)) params.set("carId", carId);
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  if (totalDays) params.set("totalDays", totalDays);
  const finalRedirect =
    params.toString() !== "" ? `${redirect}?${params.toString()}` : redirect;

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      setUser(data);
      navigate(finalRedirect, { replace: true });
    },
    onError: () => {
      setErrorMassage("Email or password is not correct");
    },
  });

  const submitHandler = e => {
    e.preventDefault();
    if (email && password) {
      mutate({ email, password });
    } else {
      setErrorMassage("Email or password is not correct");
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Enter your details</h1>
        <div>{errorMassage}</div>
        <form className='flex flex-col gap-3' onSubmit={submitHandler}>
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className='w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40 rounded-lg'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type='submit'
            className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'
          >
            Login
          </button>
          <Link to={`/register?redirect=${encodeURIComponent(finalRedirect)}`}>
            Don't have an account? <span>Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
