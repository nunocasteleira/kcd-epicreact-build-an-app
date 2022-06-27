import type { DialogProps as ReachDialogProps } from "@reach/dialog";
import { Dialog as ReachDialog } from "@reach/dialog";

interface DialogProps {
  children: React.ReactNode | React.ReactNode[];
}

function Dialog({ children, ...dialogProps }: DialogProps & ReachDialogProps) {
  return (
    <ReachDialog
      {...dialogProps}
      //rounded max-w-md shadow-md pb-12 my-5 mx-auto w-full md:w-auto md:my-10
      // className="max-w-md rounded pb-12 shadow-md w-full my-5 mx-auto md:w-auto md:my-24"
    >
      {children}
    </ReachDialog>
  );
}

export { Dialog };

/*
const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

*/
