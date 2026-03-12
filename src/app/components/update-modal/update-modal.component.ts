import { Component, inject, input, output, signal } from '@angular/core';
import { Update } from '@tauri-apps/plugin-updater';
import { ButtonModule } from 'primeng/button';
import { BaseModalComponent } from '~components/ui/base-modal/base-modal.component';
import { UpdaterService } from '~data/updater/services/updater.service';

@Component({
  selector: 'hp-update-modal',
  imports: [BaseModalComponent, ButtonModule],
  templateUrl: './update-modal.component.html',
})
export class UpdateModalComponent {
  readonly update = input.required<Update>();
  readonly closed = output<void>();

  readonly #updaterService = inject(UpdaterService);
  readonly installing = signal(false);

  async install(): Promise<void> {
    this.installing.set(true);
    await this.#updaterService.installUpdate(this.update());
  }

  skip(): void {
    this.closed.emit();
  }
}
