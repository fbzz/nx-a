import { memo, useEffect, useState } from "react";
import { useTicketStore } from "../../stores/tickets/tickets.store";
import { createPortal } from "react-dom";

/* eslint-disable-next-line */
export interface ToastrProps {}

export function Toastr(props: ToastrProps) {
  const { error } = useTicketStore((state) => state);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (!error) {
      return setDisplay(false);
    }
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
    }, 8000);
  }, [error]);

  return (
    <>
      {display &&
        createPortal(
          <div className="toast">
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

const MemoizedToastr = memo(Toastr);

export default MemoizedToastr;
