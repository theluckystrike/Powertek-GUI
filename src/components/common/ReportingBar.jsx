import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { Tooltip } from "@mui/material";

const ReportingBar = ({ value, min = 0, max = 16 }) => {
  const theme = useTheme();
  const percentage = (parseFloat(value) / (max - min)) * 100;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "5px", textAlign: "center" }}>
      <Typography variant="body1" component="div" fontWeight="400" sx={{ textAlign: "center" }}>
        {min}
      </Typography>
      <Tooltip title={`${value}`} placement="bottom" arrow>
        <div
          style={{
            background: "linear-gradient(90deg, rgba(15,218,30,1) 0%, rgba(223,226,16,1) 65%, rgba(255,0,0,1) 100%)",
            height: "15px",
            width: `100%`,
            borderRadius: 50,
            position: "relative",
          }}
        >
          <div
            style={{
              transition: "left 0.5s ease",
              position: "absolute",
              left: `${percentage}%`,
              top: "-2.5px",
              width: "2px",
              height: "20px",
              background: theme.palette.mode === "dark" ? "#e0e0e0" : "#000",
              boxShadow: theme.palette.mode === "dark" ? "1px 1px 2px black" : "none",
            }}
          ></div>
          <Typography
            variant="body1"
            component="div"
            fontSize="15px"
            fontWeight="600"
            sx={{
              transition: "left 0.5s ease",
              position: "absolute",
              left:
                percentage < 10
                  ? `calc(${percentage}% + 8px)`
                  : value < 9
                  ? `calc(${percentage}% - 10px)`
                  : `calc(${percentage}% - 18px)`,
              top: "-5px",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
              textShadow: theme.palette.mode === "dark" ? "1px 1px 2px black" : "none", // Added shadow for contrast
              fontWeight: "600",
            }}
          >{`${value}`}</Typography>
        </div>
      </Tooltip>
      <Typography variant="body1" component="div" fontWeight="400" sx={{ textAlign: "center" }}>
        {max}
      </Typography>
    </Box>
  );
};

export { ReportingBar };
