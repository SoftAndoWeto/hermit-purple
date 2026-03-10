import { Component, inject } from "@angular/core";
import { TaskStore } from "~data/task/store/task.store";
import { ModalService } from "~data/modal/services/modal.service";
import { DeleteTaskModalComponent } from "~components/delete-task-modal/delete-task-modal.component";
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
  private readonly modalService = inject(ModalService);

  onListClick(event: MouseEvent): void {
    const target = event.target as Element;

    if (!target.closest("[data-action='delete']")) return;

    const taskId = target.closest("[data-task-id]")?.getAttribute("data-task-id");
    if (!taskId) return;

    const task = this.store.tasks().find((t) => t.id === taskId);
    if (!task) return;

    const ref = this.modalService.open(DeleteTaskModalComponent, { task });
    ref.instance.result.subscribe((confirmed: boolean) => {
      if (confirmed) this.store.removeTask(task.id);
    });
  }
}
