import { Injectable, Type, ViewContainerRef, ComponentRef } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ModalService {
  private vcr!: ViewContainerRef;

  registerHost(vcr: ViewContainerRef): void {
    this.vcr = vcr;
  }

  open<T>(component: Type<T>, inputs: Record<string, unknown> = {}): ComponentRef<T> {
    const ref = this.vcr.createComponent(component);

    Object.entries(inputs).forEach(([key, value]) => ref.setInput(key, value));

    const instance = ref.instance as Record<string, any>;
    if ("closed" in instance) {
      instance["closed"].subscribe(() => ref.destroy());
    }

    return ref;
  }
}
