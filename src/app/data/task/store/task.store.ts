import { signalStore, withState, withMethods, patchState } from "@ngrx/signals";
import { Task } from "../interfaces/task.interface";

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

export const TaskStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store) => ({
    addTask(title: string): void {
      const task: Task = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date(),
      };
      patchState(store, { tasks: [...store.tasks(), task] });
    },

    toggleTask(id: string): void {
      patchState(store, {
        tasks: store.tasks().map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      });
    },

    removeTask(id: string): void {
      patchState(store, {
        tasks: store.tasks().filter((t) => t.id !== id),
      });
    },
  }))
);
