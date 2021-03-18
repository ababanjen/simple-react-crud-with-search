import React, { useState, useRef } from "react";
import { useOutsideClick } from "../hooks";

export default function withDialog(WrappedComponent) {
  return function withDialog({ ...props }) {
    const [show, setShow] = useState(false);
    const [dialogHeader, setDialogHeader] = useState(null);
    const [dialogContent, setDialogContent] = useState(null);
    const [dialogFooter, setDialogFooter] = useState(null);

    const ref = useRef();
    useOutsideClick(ref, () => {
      if (show) setShow(false);
    });

    function showDialog({ show, header, content, footer }) {
      if (show !== undefined) setShow(show);
      setDialogHeader(header);
      setDialogContent(content);
      setDialogFooter(footer);
    }
    return (
      <>
        {show && (
          <div className="dialog-container absolute-center" ref={ref}>
            <div className="dialog-item-container flexContainer column">
              <div className="dialog-header flexContainer margin-box">
                {dialogHeader}
              </div>
              <div className="dialog-content">{dialogContent}</div>
              <div className="dialog-footer">{dialogFooter}</div>
            </div>
          </div>
        )}
        <WrappedComponent {...props} showDialog={showDialog} />
      </>
    );
  };
}
