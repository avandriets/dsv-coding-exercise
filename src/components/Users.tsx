import { Box, TextField } from "@mui/material";
import { FunctionComponent, useState } from "react";

export const Users: FunctionComponent = () => {
  const [users] = useState([]);
  const [text] = useState("");

  return (
    <Box>

      <p style={{ marginBottom: 0, marginTop: 30 }}>Search for a user</p>

      <TextField defaultValue={text}
                 style={{ display: "block", margin: "auto" }}/>

    </Box>
  );
}
