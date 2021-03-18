import React, { useState } from "react";
import { RoundAddIcon } from "../components/Icons";
export default function withFLoatingAddBtn(WrappedComponent) {
  return function withFLoatingAddBtn({ ...props }) {
    const [iconButton, setIconButton] = useState(null);
    function showIconButton({ onClick }) {
      if (onClick)
        setIconButton(
          <RoundAddIcon
            height="50px"
            width="50px"
            onClick={onClick}
            className="roundAddIcon"
          />
        );
    }
    return (
      <>
        {iconButton}
        <WrappedComponent {...props} showIconButton={showIconButton} />
      </>
    );
  };
}
