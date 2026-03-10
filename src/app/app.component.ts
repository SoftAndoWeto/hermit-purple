import { Component, inject, OnInit } from "@angular/core";
import { TaskListComponent } from "~components/task-list/task-list.component";
import { ModalHostComponent } from "~components/ui/modal-host/modal-host.component";
import { ReminderService } from "~data/reminder/services/reminder.service";

@Component({
  selector: "hp-root",
  imports: [TaskListComponent, ModalHostComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  readonly #reminderService = inject(ReminderService);

  ngOnInit(): void {
    this.#reminderService.start();
  }
}
