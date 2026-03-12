import { Component, OnInit, signal } from "@angular/core";
import { getVersion } from "@tauri-apps/api/app";

@Component({
  selector: "hp-app-version",
  templateUrl: "./app-version.component.html",
  styleUrl: "./app-version.component.scss",
})
export class AppVersionComponent implements OnInit {
  readonly #version = signal<string | null>(null);
  readonly version = this.#version.asReadonly();

  async ngOnInit(): Promise<void> {
    this.#version.set(await getVersion());
  }
}
