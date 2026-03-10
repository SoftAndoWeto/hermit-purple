import { Component, input, output } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { BaseModalComponent } from "~components/ui/base-modal/base-modal.component";

@Component({
  selector: "hp-modal-confirm",
  imports: [BaseModalComponent, ButtonModule],
  templateUrl: "./modal-confirm.component.html",
  styleUrl: "./modal-confirm.component.css",
})
export class ModalConfirmComponent {
  readonly title = input<string>("Подтверждение");
  readonly message = input<string>("");

  readonly result = output<boolean>();
  readonly closed = output<void>();

  confirm(value: boolean): void {
    this.result.emit(value);
    this.closed.emit();
  }

  onBaseModalClosed(): void {
    this.closed.emit();
  }
}
