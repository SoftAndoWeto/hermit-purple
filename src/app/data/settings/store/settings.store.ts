import { inject } from "@angular/core";
import { signalStore, withState, withMethods, withHooks, patchState } from "@ngrx/signals";
import { TauriStoreService } from "~data/tauri-api/services/tauri-store.service";

const STORE_KEY = "settings.username";

type SettingsState = {
  username: string | null;
  loaded: boolean;
};

const initialState: SettingsState = {
  username: null,
  loaded: false,
};

export const SettingsStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store, tauriStore = inject(TauriStoreService)) => ({
    async setUsername(username: string) {
      patchState(store, { username });
      await tauriStore.set(STORE_KEY, username);
    },
  })),
  withHooks({
    async onInit(store, tauriStore = inject(TauriStoreService)) {
      const username = await tauriStore.get<string>(STORE_KEY);
      patchState(store, { username: username ?? null, loaded: true });
    },
  })
);
