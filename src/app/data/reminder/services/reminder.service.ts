import { inject, Injectable, OnDestroy } from "@angular/core";
import { TauriNotificationService } from "~data/tauri-api/services/tauri-notification.service";
import { TaskStore } from "~data/task/store/task.store";

const POLL_INTERVAL_MS = 60_000;

@Injectable({ providedIn: "root" })
export class ReminderService implements OnDestroy {
  readonly #taskStore = inject(TaskStore);
  readonly #notifications = inject(TauriNotificationService);
  readonly #notified = new Set<string>();
  #intervalId: ReturnType<typeof setInterval> | null = null;

  async start(): Promise<void> {
    const permissionGranted = await this.#notifications.requestPermission();
    if (!permissionGranted) return;

    this.#check();
    this.#intervalId = setInterval(() => this.#check(), POLL_INTERVAL_MS);
  }

  #check(): void {
    const now = new Date();
    const tasks = this.#taskStore.tasks();

    for (const task of tasks) {
      if (task.completed || !task.dueDate) continue;
      if (this.#notified.has(task.id)) continue;

      const due = new Date(task.dueDate);
      if (due <= now) {
        this.#notified.add(task.id);
        this.#notifications.send({ title: "Hermit Purple", body: task.title });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.#intervalId !== null) {
      clearInterval(this.#intervalId);
    }
  }
}
