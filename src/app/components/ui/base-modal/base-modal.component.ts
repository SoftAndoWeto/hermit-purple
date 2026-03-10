import { Component, HostListener, input, output } from "@angular/core";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "hp-base-modal",
  imports: [ButtonModule],
  templateUrl: "./base-modal.component.html",
  styleUrl: "./base-modal.component.scss",
})
export class BaseModalComponent {
  readonly title = input<string>("");
  readonly closed = output<void>();

  close(): void {
    this.closed.emit();
  }

  @HostListener("click")
  onBackdropClick(): void {
    this.close();
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    this.close();
  }
}
