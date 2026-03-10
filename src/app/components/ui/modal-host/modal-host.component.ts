import { Component, effect, inject, viewChild, ViewContainerRef } from "@angular/core";
import { ModalService } from "~data/modal/services/modal.service";

@Component({
  selector: "hp-modal-host",
  template: `<ng-container #host />`,
})
export class ModalHostComponent {
  private readonly vcr = viewChild.required("host", { read: ViewContainerRef });
  private readonly modalService = inject(ModalService);

  constructor() {
    effect(() => {
      this.modalService.registerHost(this.vcr());
    });
  }
}
