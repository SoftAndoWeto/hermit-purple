import { Component, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ThemeService } from "~data/theme/services/theme.service";

@Component({
  selector: "hp-theme-toggle",
  imports: [ButtonModule],
  templateUrl: "./theme-toggle.component.html",
  styleUrl: "./theme-toggle.component.scss",
})
export class ThemeToggleComponent {
  readonly #themeService = inject(ThemeService);
  readonly isDark = this.#themeService.isDark;

  toggle(): void {
    this.#themeService.toggle();
  }
}
