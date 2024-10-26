import { create } from "zustand";
import { persist } from "zustand/middleware";
const useHabitStore = create(
  persist((set) => {
    return {
      habits: [],
      addHabit: (name, frequency) =>
        set((state) => {
          return {
            habits: [
              ...state.habits,
              {
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }),
      removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),
      toogleHabit: (id, date) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id
              ? {
                  ...habit,
                  completedDates: habit.completedDates.includes(date)
                    ? habit.completedDates.filter((d) => d !== date)
                    : [...habit.completedDates, date],
                }
              : habit
          ),
        })),
    };
  },{
    name:"habits-local",
  })
);

export default useHabitStore;
