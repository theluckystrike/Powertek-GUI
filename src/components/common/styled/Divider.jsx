import { Divider } from "@mui/material";
import styled from "@mui/material/styles/styled";

const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
}));

export default DividerStyled;
