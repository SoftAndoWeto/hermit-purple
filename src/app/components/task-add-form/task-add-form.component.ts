import { Component, inject, signal } from "@angular/core";
import { TaskStore } from "~data/task/store/task.store";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "hp-task-add-form",
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: "./task-add-form.component.html",
  styleUrl: "./task-add-form.component.css",
})
export class TaskAddFormComponent {
  readonly store = inject(TaskStore);
  readonly newTitle = signal("");

  add(): void {
    const title = this.newTitle().trim();
    if (!title) return;
    this.store.addTask(title);
    this.newTitle.set("");
  }
}
