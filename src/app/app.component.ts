import { Component, inject, OnInit } from "@angular/core";
import { TaskListComponent } from "~components/task-list/task-list.component";
import { ModalHostComponent } from "~components/ui/modal-host/modal-host.component";
import { AppVersionComponent } from "~components/ui/app-version/app-version.component";
import { ThemeToggleComponent } from "~components/ui/theme-toggle/theme-toggle.component";
import { ReminderService } from "~data/reminder/services/reminder.service";
import { UpdaterService } from "~data/updater/services/updater.service";
import { ModalService } from "~data/modal/services/modal.service";
import { ThemeService } from "~data/theme/services/theme.service";
import { UpdateModalComponent } from "~components/update-modal/update-modal.component";

@Component({
  selector: "hp-root",
  imports: [TaskListComponent, ModalHostComponent, AppVersionComponent, ThemeToggleComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  readonly #reminderService = inject(ReminderService);
  readonly #updaterService = inject(UpdaterService);
  readonly #modalService = inject(ModalService);
  readonly #themeService = inject(ThemeService);

  ngOnInit(): void {
    this.#themeService.init();
    this.#reminderService.start();
    this.#checkForUpdates();
  }

  async #checkForUpdates(): Promise<void> {
    const update = await this.#updaterService.checkForUpdates();
    if (update) {
      this.#modalService.open(UpdateModalComponent, { update });
    }
  }
}
