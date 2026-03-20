import { Routes } from "@angular/router";
import { SplashPageComponent } from "~pages/splash/splash-page.component";
import { OnboardingPageComponent } from "~pages/onboarding/onboarding-page.component";
import { MainLayoutComponent } from "~layouts/main/main-layout.component";
import { TasksPageComponent } from "~pages/tasks/tasks-page.component";

export const routes: Routes = [
  { path: "", component: SplashPageComponent },
  { path: "onboarding", component: OnboardingPageComponent },
  {
    path: "tasks",
    component: MainLayoutComponent,
    children: [
      { path: "", component: TasksPageComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];
