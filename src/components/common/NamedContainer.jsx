import React, { useState } from "react";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import Divider from "./styled/Divider";
import Item from "./styled/Item";

function NamedContainer(props) {
  const { title, dividerSx, paperSx, children, overridetitle, noDivider } = props;

  return (
    <Item
      color="#fff"
      p="4"
      sx={{
        height: "calc(100% - 16px)",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        ...paperSx,
      }}
    >
      <>
        {overridetitle || (
          <Typography variant="h5" fontWeight="600">
            {title}
          </Typography>
        )}
        {overridetitle && title}
        {noDivider || <Divider sx={{ marginTop: "10px", marginBottom: "10px", ...dividerSx }} />}
        {children}
      </>
    </Item>
  );
}

function CollapsiableNamedContainer({ title, children }) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = () => setIsExpanded(!isExpanded);

  return (
    <NamedContainer
      overridetitle
      noDivider
      paperSx={{
        backgroundColor: theme.palette.mode === "dark" ? "#2f3135" : "#dadde2",
      }}
      title={
        <Box sx={{ display: "flex", flexDirection: "row" }} onClick={toggleIsExpanded}>
          <Typography variant="h5" fontWeight="600" sx={{ margin: "auto" }}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={toggleIsExpanded}>{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
        </Box>
      }
    >
      {isExpanded && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Divider sx={{ marginTop: "5px" }} /> {children}
        </Box>
      )}
    </NamedContainer>
  );
}

export { NamedContainer as default, CollapsiableNamedContainer };
