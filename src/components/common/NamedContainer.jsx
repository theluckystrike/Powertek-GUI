import React from "react";
import { Typography } from "@mui/material";

import Divider from "./styled/Divider";
import Item from "./styled/Item";

function NamedContainer(props) {
  const { title, dividerSx, paperSx, children, overridetitle } = props;

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
        <Divider sx={{ marginTop: "10px", marginBottom: "10px", ...dividerSx }} />
        {children}
      </>
    </Item>
  );
}

export default NamedContainer;
