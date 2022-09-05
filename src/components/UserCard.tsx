import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { UserCardInterface } from "../interfaces";

export const UserCard: FunctionComponent<UserCardInterface> = (props: UserCardInterface) => {

  const buttons = props.deleted
    ? <Button size="small" onClick={() => props.onRestore(props.user.getId())}>Restore</Button>
    : <Button size="small" onClick={() => props.onRemove(props.user.getId())}>Remove</Button>;

  return (
    <Card sx={{ minWidth: 200 }} variant="outlined">
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          User Name
        </Typography>
        <Typography variant="h6" component="div">
          {props.user.getName()}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Age
        </Typography>
        <Typography variant="h6" component="div">
          {props.user.getAge()}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Address
        </Typography>
        <Typography sx={{ fontSize: 13 }} component="div">
          {props.user.getAddress()}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Company
        </Typography>
        <Typography sx={{ fontSize: 13 }} component="div">
          {props.user.getCompany()}
        </Typography>

      </CardContent>
      <CardActions>
        {buttons}
      </CardActions>
    </Card>
  );
}
