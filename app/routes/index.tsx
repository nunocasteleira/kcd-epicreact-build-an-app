import { cloneElement, useState } from "react";
import { Logo } from "~/components/logo";
import { Button } from "~/components/button";
import styles from "@reach/dialog/styles.css";
import Dialog from "@reach/dialog";
import { Modal, ModalContents, ModalOpenButton } from "~/components/modal";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function LoginForm({
  onSubmit,
  submitButton,
}: {
  onSubmit: any;
  submitButton: React.ReactElement;
}) {
  function handleSubmit(event: any) {
    event.preventDefault();
    const { username, password } = event.target.elements;

    onSubmit({
      username: username.value,
      password: password.value,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
      <div className="flex flex-col my-3 mx-auto w-full max-w-xs">
        <label htmlFor="username">Username</label>
        <input
          className="rounded border border-gray-200 bg-gray-100 py-2 px-3"
          id="username"
        />
      </div>
      <div className="flex flex-col my-3 mx-auto w-full max-w-xs">
        <label htmlFor="password">Password</label>
        <input
          className="rounded border border-gray-200 bg-gray-100 py-2 px-3"
          id="password"
          type="password"
        />
      </div>
      <div className="my-3 mx-auto w-full max-w-xs">
        {cloneElement(submitButton, { type: "submit" })}
      </div>
    </form>
  );
}

export default function Index() {
  function login(formData: any) {
    console.log("login", formData);
  }

  function register(formData: any) {
    console.log("register", formData);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Logo width="80" height="80" />
      <h1 className="text-4xl leading-tight mb-2 mt-0">Bookshelf</h1>
      <div className="grid grid-cols-2 gap-3">
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}
