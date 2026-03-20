import { inject, Injectable, Renderer2, RendererFactory2, signal } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { TauriStoreService } from "~data/tauri-api/services/tauri-store.service";

@Injectable({ providedIn: "root" })
export class ThemeService {
  readonly #store = inject(TauriStoreService);
  readonly #document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);
  readonly #isDark = signal(false);
  readonly isDark = this.#isDark.asReadonly();

  async init(): Promise<void> {
    const saved = await this.#store.get<boolean>("theme.dark");
    this.#apply(saved ?? false);
  }

  toggle(): void {
    this.#apply(!this.#isDark());
    this.#store.set("theme.dark", this.#isDark());
  }

  #apply(dark: boolean): void {
    this.#isDark.set(dark);
    const $doc = this.#document.documentElement;
    if (dark) {
      this.#renderer.addClass($doc, "dark");
    } else {
      this.#renderer.removeClass($doc, "dark");
    }
  }
}
