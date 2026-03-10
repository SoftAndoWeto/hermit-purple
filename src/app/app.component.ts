import { Component } from "@angular/core";
import { TaskListComponent } from "~components/task-list/task-list.component";
import { ModalHostComponent } from "~components/ui/modal-host/modal-host.component";

@Component({
  selector: "hp-root",
  imports: [TaskListComponent, ModalHostComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
