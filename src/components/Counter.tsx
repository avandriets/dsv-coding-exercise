import { FunctionComponent, useEffect, useReducer, useState } from "react";
import { counter, CounterAction, CounterState } from "../interfaces";
import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getRandomIntInclusive } from "../utils/utils";

const initialState: CounterState = {
  count: 0,
};

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case counter.Increment:
      return { ...state, count: state.count + 1 };
    case counter.Decrement:
      return { ...state, count: state.count - 1 };
    case counter.Reset:
      return { ...state, count: 0 };
    case counter.Set:
      return { ...state, ...action.data };
    case counter.IncrementRandom:
      return { ...state, count: state.count + getRandomIntInclusive(1, 10) };
    case counter.IncrementToOdd:
      return { ...state, count: state.count % 2 ? state.count + 2 : state.count + 1 };
    default:
      throw new Error();
  }
}

export const Counter: FunctionComponent = () => {
  const [countState, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState(0);

  useEffect(() => {
    if (countState.count < 0) {
      dispatch({ type: counter.Set, data: { count: 0 } });
    }
  }, [, countState]);

  const handleCountSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    setInput(parseInt(value || '0', 10));
  };

  return (
    <Box sx={{ mb: 10 }}>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <Button aria-label="remove"
                onClick={() => dispatch({ type: counter.Decrement })}>
          <RemoveIcon/>
        </Button>

        <h3>Count: {countState.count}</h3>

        <Button aria-label="add" onClick={() => dispatch({ type: counter.Increment })}>
          <AddIcon/>
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>

        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button variant="contained"
                  onClick={() => dispatch({ type: counter.Reset })}>
            Reset
          </Button>
          <Button variant="contained"
                  onClick={() => dispatch({ type: counter.IncrementRandom })} startIcon={<AddIcon/>}>
            Random
          </Button>
          <Button variant="contained"
                  onClick={() => dispatch({ type: counter.IncrementToOdd })}>
            To Odd
          </Button>
        </ButtonGroup>

      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <TextField type="number"
                   label="Decrease count for"
                   variant="outlined"
                   defaultValue={initialState.count}
                   style={{ display: "block" }}
                   onChange={handleCountSet}
                   size="small"/>

        <Button variant="contained"
                onClick={() => dispatch({ type: counter.Set, data: { count: countState.count - input } })}>
          Apply
        </Button>
      </Box>

    </Box>
  );
}
