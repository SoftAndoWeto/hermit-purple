import { Component, input, output } from "@angular/core";
import { Task } from "~data/task/interfaces/task.interface";
import { ModalConfirmComponent } from "~components/ui/modal-confirm/modal-confirm.component";

@Component({
  selector: "hp-delete-task-modal",
  imports: [ModalConfirmComponent],
  templateUrl: "./delete-task-modal.component.html",
})
export class DeleteTaskModalComponent {
  readonly task = input.required<Task>();

  readonly result = output<boolean>();
  readonly closed = output<void>();
}
