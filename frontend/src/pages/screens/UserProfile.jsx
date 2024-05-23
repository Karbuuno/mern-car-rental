import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { UseContext } from "@/components/context/AuthContext";
import { updateProfile } from "@/components/api/api";

function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, setUser } = UseContext();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPassword(user.password || "");
    }
  }, [user]);

  const { mutate, isError, onSuccess } = useMutation({
    mutationFn: updateProfile,
    onSuccess: data => {
      QueryClient.invalidateQueries({ queryKey: ["user"] });
      console.log(data);
    },
  });

  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    mutate({ _id: user._id, formData });
  };

  return (
    <>
      <div className='flex place-content-center'>
        <Card className='w-[450px] h-[500px] m-5'>
          <CardHeader>
            <div className='mt-5'>
              <CardTitle>Update Profile</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={submitHandler}>
              <div className='grid w-full items-center gap-4 mt-5'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    name='name'
                    id='name'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Enter your name'
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Email</Label>
                  <Input
                    id='name'
                    type='text'
                    name='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Enter your email'
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Password</Label>
                  <Input
                    id='name'
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Enter your password'
                  />
                </div>
              </div>
              <Button type='submit'>Update</Button>
            </form>
          </CardContent>
          <CardFooter className='flex justify-between'>
            {/* <Button type='submit'>Update</Button> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default UserProfile;
