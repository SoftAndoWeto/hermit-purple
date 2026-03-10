import { Component, inject } from "@angular/core";
import { TaskStore } from "~data/task/store/task.store";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { TaskAddFormComponent } from "~components/task-add-form/task-add-form.component";

@Component({
  selector: "hp-task-list",
  imports: [CheckboxModule, ButtonModule, FormsModule, TaskAddFormComponent],
  templateUrl: "./task-list.component.html",
  styleUrl: "./task-list.component.css",
})
export class TaskListComponent {
  readonly store = inject(TaskStore);
}
