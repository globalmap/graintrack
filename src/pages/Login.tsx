import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import Button from "../shared/components/Button";
import { useAuth } from "../core/hooks/useAuth";
import router from "../app/router";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authService } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    authService.login(username, password).subscribe({
      next: (success) => {
        if (!success) {
          throw setError("Invalid username or password");
        }
        router.navigate({to: "/"})
      },
      error: (err) => {
        setError("An error occurred during login");
        console.error(err);
      },
    });
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl mb-4'>Login</h1>

      <Form.Root className='w-[260px]' onSubmit={handleSubmit}>
        <Form.Field className='grid mb-[10px]' name='username'>
          <div className='flex items-baseline justify-between'>
            <Form.Label className='text-[15px] font-medium leading-[35px]'>
              Username
            </Form.Label>
            <Form.Message
              className='text-[13px] opacity-[0.8]'
              match='valueMissing'>
              Please enter your username
            </Form.Message>
            <Form.Message
              className='text-[13px] opacity-[0.8]'
              match='typeMismatch'>
              Please provide a valid username
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className='box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6'
              type='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className='grid mb-[10px]' name='password'>
          <div className='flex items-baseline justify-between'>
            <Form.Label className='text-[15px] font-medium leading-[35px]'>
              Password
            </Form.Label>
            <Form.Message
              className='text-[13px] opacity-[0.8]'
              match='valueMissing'>
              Please enter your password
            </Form.Message>
            <Form.Message
              className='text-[13px] opacity-[0.8]'
              match='typeMismatch'>
              Please provide a valid password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className='box-border w-full bg-blackA2 shadow-blackA6 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Control>
        </Form.Field>

        {error && <p className='text-red-500'>{error}</p>}
        <Form.Submit asChild>
          <Button type='submit'>Login</Button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default Login;
