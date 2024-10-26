import { Box, Container, Typography } from "@mui/material";
import "./App.css";
import AddHabit from "./component/AddHabit";
import useHabitStore from "./store/store";
import ShowHabit from "./component/ShowHabit";
function App() {
  const {habits,addHabit}=useHabitStore();
  return (
    <Container sx={{textAlign:"left"}}>
      <Box>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
        >
          Habit Tracker
        </Typography>
        <AddHabit />
        <ShowHabit />
      </Box>
    </Container>
  );
}

export default App;
