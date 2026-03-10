import { Component, inject, signal } from "@angular/core";
import { TaskStore } from "~data/task/store/task.store";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DatePickerModule } from "primeng/datepicker";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "hp-task-add-form",
  imports: [ButtonModule, InputTextModule, DatePickerModule, FormsModule],
  templateUrl: "./task-add-form.component.html",
  styleUrl: "./task-add-form.component.scss",
})
export class TaskAddFormComponent {
  readonly store = inject(TaskStore);
  readonly newTitle = signal("");
  readonly dueDate = signal<Date | null>(null);

  add(): void {
    const title = this.newTitle().trim();
    if (!title) return;
    this.store.addTask(title, this.dueDate()?.toISOString() ?? null);
    this.newTitle.set("");
    this.dueDate.set(null);
  }
}
