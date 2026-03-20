import { Component, effect, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { SettingsStore } from "~data/settings/store/settings.store";

@Component({
  selector: "hp-splash-page",
  templateUrl: "./splash-page.component.html",
  styleUrl: "./splash-page.component.scss",
})
export class SplashPageComponent {
  readonly #router = inject(Router);
  readonly #settingsStore = inject(SettingsStore);

  readonly greeting = signal("");

  #redirected = false;

  constructor() {
    effect(() => {
      if (!this.#settingsStore.loaded() || this.#redirected) return;
      this.#redirected = true;

      const username = this.#settingsStore.username();

      if (!username) {
        this.#router.navigate(["/onboarding"]);
        return;
      }

      this.greeting.set(this.#buildGreeting(username));
      setTimeout(() => this.#router.navigate(["/tasks"]), 1500);
    });
  }

  #buildGreeting(username: string): string {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return `Доброе утро, ${username}!`;
    if (hour >= 12 && hour < 17) return `Добрый день, ${username}!`;
    if (hour >= 17 && hour < 22) return `Добрый вечер, ${username}!`;
    return `Доброй ночи, ${username}!`;
  }
}
