import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { SettingsStore } from "~data/settings/store/settings.store";

@Component({
  selector: "hp-onboarding-page",
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: "./onboarding-page.component.html",
  styleUrl: "./onboarding-page.component.scss",
})
export class OnboardingPageComponent {
  readonly #router = inject(Router);
  readonly #settingsStore = inject(SettingsStore);

  name = "";

  async submit(): Promise<void> {
    const name = this.name.trim();
    if (!name) return;
    await this.#settingsStore.setUsername(name);
    this.#router.navigate(["/tasks"]);
  }
}
