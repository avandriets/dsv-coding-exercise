import { FunctionComponent } from "react";
import { TextField } from "@mui/material";
import { UserSearch } from "../interfaces";

export const Search: FunctionComponent<UserSearch> = (props) => {

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    props.onSearch(value);
  };

  return (
    <TextField label="Search user"
               variant="outlined"
               size="small"
               onChange={handleSearch}/>
  );
}
