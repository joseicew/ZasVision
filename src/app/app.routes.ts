import { RouterModule, Routes } from "@angular/router";
import { LogInComponent } from "./component/log-in/log-in.component";
import { HomeComponent } from './component/home/home.component';
import { SigninComponent } from "./component/signin/signin.component";
import { HomeMenuComponent } from "./component/home/home-menu/home-menu.component";
import { AchievementMenuComponent } from "./component/home/achievement-menu/achievement-menu.component";
import { ProfileMenuComponent } from "./component/home/profile-menu/profile-menu.component";

const ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      {path:"homeMenu",component:HomeMenuComponent},
      {path:"achievementMenu",component:AchievementMenuComponent},
      {path:"profileMenu",component:ProfileMenuComponent},
      {path: "**",  pathMatch: 'full',redirectTo: 'homeMenu' },
    ]
  },
  { path: "signin", component: SigninComponent },
  { path: "login", component: LogInComponent },
  { path: "**", pathMatch: "full", redirectTo: "login" }
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);
