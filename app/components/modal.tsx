import type { DialogProps } from "@reach/dialog";
import Dialog from "@reach/dialog";
import type { Dispatch, ProviderProps, SetStateAction } from "react";
import { cloneElement, createContext, useContext, useState } from "react";
import { CircleButton } from "./button";

function callAll<Args extends Array<unknown>>(
  ...fns: Array<((...args: Args) => unknown) | undefined>
) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}

type IModalContext = [boolean, Dispatch<SetStateAction<boolean>>];

const ModalContext = createContext<IModalContext | undefined>(undefined);

function Modal(props: JSX.IntrinsicAttributes & { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({
  children: child,
}: {
  children: React.ReactElement;
}) {
  const [, setIsOpen] = useContext(ModalContext)!;
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({
  children: child,
}: {
  children: React.ReactElement;
}) {
  const [, setIsOpen] = useContext(ModalContext)!;
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalContentsBase(props: DialogProps) {
  const [isOpen, setIsOpen] = useContext(ModalContext)!;
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
}

function ModalContents({
  title,
  children,
  ...props
}: {
  title: string;
  children: React.ReactNode;
  props?: DialogProps;
}) {
  return (
    <ModalContentsBase {...props}>
      <div className="flex justify-end">
        <ModalDismissButton>
          <CircleButton>
            <span className="sr-only">Close</span>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 className="text-center text-3xl">{title}</h3>
      {children}
    </ModalContentsBase>
  );
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
