import { Divider } from "@mui/material";
import styled from "@mui/material/styles/styled";

const DividerStyled = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.87)" : "rgba(0, 0, 0, 0.87)",
}));

export default DividerStyled;
