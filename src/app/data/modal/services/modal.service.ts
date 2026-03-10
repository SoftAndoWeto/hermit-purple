import { Injectable, Type, ViewContainerRef, ComponentRef } from "@angular/core";
import { BaseModalComponent } from "~components/ui/base-modal/base-modal.component";

export interface ModalConfig {
  title?: string;
}

@Injectable({ providedIn: "root" })
export class ModalService {
  private vcr!: ViewContainerRef;

  registerHost(vcr: ViewContainerRef): void {
    this.vcr = vcr;
  }

  open<T>(component: Type<T>, config: ModalConfig = {}): ComponentRef<BaseModalComponent> {
    const innerRef = this.vcr.createComponent(component);

    const modalRef = this.vcr.createComponent(BaseModalComponent, {
      projectableNodes: [[innerRef.location.nativeElement]],
    });

    if (config.title) {
      modalRef.setInput("title", config.title);
    }

    modalRef.instance.closed.subscribe(() => {
      modalRef.destroy();
      innerRef.destroy();
    });

    return modalRef;
  }
}
