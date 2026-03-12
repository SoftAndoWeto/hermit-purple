import { Injectable } from "@angular/core";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
  type Options,
} from "@tauri-apps/plugin-notification";

@Injectable({ providedIn: "root" })
export class TauriNotificationService {
  async requestPermission(): Promise<boolean> {
    let granted = await isPermissionGranted();
    if (!granted) {
      const result = await requestPermission();
      granted = result === "granted";
    }
    return granted;
  }

  send(options: Options): void {
    sendNotification(options);
  }
}
