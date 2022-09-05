import { Box, Grid } from "@mui/material";
import { FunctionComponent, useReducer } from "react";
import { Search } from "./Search";
import users from "../data";
import { User, UsersAction, usersEnum, UsersState } from "../interfaces";
import { UserCard } from "./UserCard";
import { UserModel } from "../models";

const initialState: UsersState = {
  users: [],
  deleted: [],
  filter: '',
};

function reducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case usersEnum.Add:
      return { ...state, users: [...state.users, ...action.payload?.users ?? []] };
    case usersEnum.Remove:
      const user = state.users.find(u => u.id === action.payload?.userId);

      return {
        ...state,
        users: state.users.filter(u => u.getId() !== action.payload?.userId),
        deleted: [...state.deleted, ...(user ? [user]: [])],
      };
    case usersEnum.Restore:
      const deletedUser = state.deleted.find(u => u.id === action.payload?.userId);

      return {
        ...state,
        deleted: state.deleted.filter(u => u.getId() !== action.payload?.userId),
        users: [...state.users, ...(deletedUser ? [deletedUser]: [])],
      };
    case usersEnum.Filer:
      return { ...state, filter: action.payload?.filter || '' };
    default:
      throw new Error();
  }
}

function init(): UsersState {
  const usersHash = users
    .filter(user => user.age > 18)
    .sort((a, b) => a.age - b.age || a.company.name.localeCompare(b.company.name))
    .reduce((acc: { [key: string]: UserModel; }, c: User) => {
      const user = new UserModel(c);

      if (acc[user.getId()]) {
        user.reGenerateId();
        while (acc[user.getId()]) {
          user.reGenerateId();
        }
      }

      acc[user.getId()] = user;

      return acc;
    }, {});

  return {
    users: Object.values(usersHash),
    deleted: [],
    filter: '',
  };
}

export const Users: FunctionComponent = () => {
  const [usersState, dispatch] = useReducer(reducer, initialState, init);

  const onRemove = (value: string) => {
    dispatch({ type: usersEnum.Remove, payload: { userId: value } });
  }

  const onRestore = (value: string) => {
    dispatch({ type: usersEnum.Restore, payload: { userId: value } });
  }

  const content = usersState.users
    .filter(u => !usersState.filter || u.getName().toLowerCase().includes(usersState.filter.toLowerCase()))
    .map(user => (
    <Grid item xs={2} sm={4} md={4} key={user.getId()}>
      <UserCard user={user} deleted={false} onRemove={onRemove} onRestore={onRestore}></UserCard>
    </Grid>)
  );

  const deletedUsers = usersState.deleted
    .filter(u => usersState.filter && u.getName().toLowerCase().includes(usersState.filter.toLowerCase()))
    .map(user => (
      <Grid item xs={2} sm={4} md={4} key={user.getId()}>
        <UserCard user={user} deleted={true} onRemove={onRemove} onRestore={onRestore}></UserCard>
      </Grid>)
    );

  const onSearch = (value: string) => {
    dispatch({ type: usersEnum.Filer, payload: { filter: value } });
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 4 }}>
        <Search onSearch={onSearch}></Search>
      </Box>

      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}>
        {content}
        {deletedUsers}
      </Grid>

    </Box>
  );
}
