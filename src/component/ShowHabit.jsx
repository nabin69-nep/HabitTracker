import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import React from "react";
import useHabitStore from "../store/store";
import { CheckCircle, Delete } from "@mui/icons-material";
function ShowHabit() {
  const { habits, removeHabit, toogleHabit } = useHabitStore();
  const today = new Date().toISOString().split("T")[0];
  const getStreak = (habit) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
      }}
    >
      {habits.map((habit) => {
        return (
          <Paper key={habit.id} elevation={1} sx={{ padding: 2 }}>
            <Grid container alignItems={"center"}>
              <Grid xs={12} sm={6}>
                <Typography variant="h6">{habit.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {habit.frequency}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircle />}
                    onClick={() => toogleHabit(habit.id, today)}
                  >
                    {habit.completedDates.includes(today)
                      ? "Completed"
                      : "Mark Completed"}
                  </Button>
                  <Button
                    onClick={() => removeHabit(habit.id)}
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography>Current Streak:{getStreak(habit)}</Typography>
              <LinearProgress variant="determinate" sx={{mt:1}}value={(getStreak(habit)/30)*100}></LinearProgress>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}

export default ShowHabit;
