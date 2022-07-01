import { cloneElement } from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import styles from "@reach/dialog/styles.css";
import { Button } from "~/components/button";
import { Input } from "~/components/lib";
import { Logo } from "~/components/logo";
import { Modal, ModalContents, ModalOpenButton } from "~/components/modal";
import { authenticator } from "~/services/auth.server";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const action: ActionFunction = async ({ request }) => {
  // Authenticate the request and redirect to /dashboard if user is
  // authenticated or to /login if it's not
  const user = await authenticator.authenticate("user-pass", request, {
    successRedirect: "/discover",
    failureRedirect: "/",
  });
  return json({ user });
};

export const loader: LoaderFunction = async ({ request }) => {
  // Check if the user is already logged-in (this checks the key user in the session)
  let user = await authenticator.isAuthenticated(request);
  // If the user is logged-in, redirect to the dashboard directly
  if (user) return redirect("/discover");
  // If we don't have a user return an empty JSON response (or something else)
  return json({});
};

function LoginForm({ submitButton }: { submitButton: React.ReactElement }) {
  return (
    <Form method="post" className="flex flex-col items-stretch">
      <div className="flex flex-col my-3 mx-auto w-full max-w-xs">
        <label htmlFor="username">Username</label>
        <Input id="username" name="username" />
      </div>
      <div className="flex flex-col my-3 mx-auto w-full max-w-xs">
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" name="password" />
      </div>
      <div className="my-3 mx-auto w-full max-w-xs">
        {cloneElement(submitButton, { type: "submit" })}
      </div>
    </Form>
  );
}

export default function Index() {
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
              action={"/login"}
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
              action={"/register"}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}
