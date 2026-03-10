import { Injectable } from "@angular/core";
import { load, Store } from "@tauri-apps/plugin-store";

@Injectable({ providedIn: "root" })
export class TauriStoreService {
  private store: Store | null = null;

  private async getStore(): Promise<Store> {
    if (!this.store) {
      this.store = await load("hp-store.json", {
        defaults: {},
        autoSave: true
      });
    }
    return this.store;
  }

  async get<T>(key: string): Promise<T | null> {
    const store = await this.getStore();
    return (await store.get<T>(key)) ?? null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    const store = await this.getStore();
    await store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    const store = await this.getStore();
    await store.delete(key);
  }
}
