import { Component } from "@angular/core";
import { TaskListComponent } from "~components/task-list/task-list.component";

@Component({
  selector: "hp-tasks-page",
  imports: [TaskListComponent],
  template: `<hp-task-list />`,
})
export class TasksPageComponent {}
