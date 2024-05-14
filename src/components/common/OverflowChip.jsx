import React, { useState, useEffect, useRef } from "react";
import Chip from "@mui/material/Chip";

export default function OverflowChip({ label, IconComponent, sx, ...props }) {
  const labelRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [iconStyle, setIconStyle] = useState({
    margin: isOverflow ? "0 auto" : "",
  });

  const [labelStyle, setlabelStyle] = useState({
    whiteSpace: "nowrap",
    display: isOverflow ? "none" : "",
  });

  useEffect(() => {
    const checkOverflow = () => {
      const labelNode = labelRef.current;
      const parentNode = labelNode ? labelNode.parentElement : null;

      if (parentNode) {
        const labelTextRef = labelNode.innerHTML;
        labelNode.innerHTML = "WARNING";
        const isOverflowing = parentNode.scrollWidth > parentNode.clientWidth;
        console.log(parentNode, isOverflowing, isOverflow, parentNode.scrollWidth, parentNode.clientWidth);
        if (isOverflowing !== isOverflow) {
          setIsOverflow(isOverflowing);
          setIconStyle({
            margin: isOverflowing ? "0 auto" : "",
          });
          setlabelStyle({
            whiteSpace: "nowrap",
            display: isOverflowing ? "none" : "",
          });
          parentNode.style.display = isOverflowing ? "none" : "inline-block";
        }
        labelNode.innerHTML = labelTextRef;
      }
    };

    const resizeObserver = new ResizeObserver(checkOverflow);

    if (labelRef.current) {
      const parentElement = labelRef.current.parentElement;
      resizeObserver.observe(parentElement);
      checkOverflow(); // Initial check
    }

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      if (labelRef.current) {
        const parentElement = labelRef.current.parentElement;
        if (parentElement) {
          resizeObserver.unobserve(parentElement);
        }
      }
    };
  }, []);

  return (
    <Chip
      icon={<IconComponent style={iconStyle} />}
      label={
        <span ref={labelRef} style={labelStyle}>
          {label}
        </span>
      }
      sx={{
        ...sx,
      }}
      {...props} // Spread all other props to the Chip component
    />
  );
}
