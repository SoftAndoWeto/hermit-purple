import { Injectable } from '@angular/core';
import { check, Update } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

@Injectable({ providedIn: 'root' })
export class UpdaterService {
  async checkForUpdates(): Promise<Update | null> {
    try {
      return await check();
    } catch {
      return null;
    }
  }

  async installUpdate(update: Update): Promise<void> {
    await update.downloadAndInstall();
    await relaunch();
  }
}
