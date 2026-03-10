import { inject } from "@angular/core";
import { signalStore, withState, withMethods, withHooks, patchState } from "@ngrx/signals";
import { Task } from "../interfaces/task.interface";
import { TauriStoreService } from "~data/tauri-api/services/tauri-store.service";

const STORE_KEY = "tasks";

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

export const TaskStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store, tauriStore = inject(TauriStoreService)) => ({
    async addTask(title: string, dueDate?: string | null) {
      const task: Task = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: dueDate ?? null,
      };
      const tasks = [...store.tasks(), task];
      patchState(store, { tasks });
      await tauriStore.set(STORE_KEY, tasks);
    },

    async toggleTask(id: string) {
      const tasks = store.tasks().map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      patchState(store, { tasks });
      await tauriStore.set(STORE_KEY, tasks);
    },

    async removeTask(id: string) {
      const tasks = store.tasks().filter((t) => t.id !== id);
      patchState(store, { tasks });
      await tauriStore.set(STORE_KEY, tasks);
    },
  })),
  withHooks({
    async onInit(store, tauriStore = inject(TauriStoreService)) {
      const saved = await tauriStore.get<Task[]>(STORE_KEY);
      if (saved?.length) {
        patchState(store, { tasks: saved });
      }
    },
  })
);
