import React, { useState, useEffect, useRef } from "react";
import Chip from "@mui/material/Chip";

export default function OverflowChip({ label, IconComponent, ...props }) {
  const labelRef = useRef(null);
  const iconRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const labelNode = labelRef.current;
      const IconNode = iconRef.current;
      if (labelNode) {
        const isOverflowing = labelNode.parentElement.offsetWidth + 40 < labelNode.parentElement.scrollWidth;
        if (isOverflowing) {
          labelNode.parentElement.style.display = "none";
          IconNode.style.margin = "0 auto";
        } else if (labelNode.parentElement.style.display != "none") {
          labelNode.parentElement.style.display = "";
          IconNode.style.margin = "";
        }
        setIsOverflow(isOverflowing);
      }
    };

    // Check on mount and window resize
    window.addEventListener("resize", checkOverflow);
    if (labelRef != null) new ResizeObserver(checkOverflow).observe(labelRef.current.parentElement.parentElement);
    checkOverflow();

    // return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  // Style objects for dynamic styling
  const iconStyle = {
    margin: isOverflow ? "0 auto" : "",
  };

  const labelStyle = {
    whiteSpace: "nowrap",
    // display: isOverflow ? "none" : "",
  };

  return (
    <Chip
      icon={<IconComponent style={iconStyle} ref={iconRef} />}
      label={
        <span id={"loll"} ref={labelRef} style={labelStyle}>
          {label}
        </span>
      }
      {...props} // Spread all other props to the Chip component
    />
  );
}
