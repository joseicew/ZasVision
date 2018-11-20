import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
 
library.add(fas);

//Form
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";

//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Components
import { AppComponent } from "./app.component";
import { LogInComponent } from "./component/log-in/log-in.component";
import { HomeComponent } from "./component/home/home.component";
import { SigninComponent } from './component/signin/signin.component';

//Menu
import { HomeMenuComponent } from "./component/home/home-menu/home-menu.component";
import { AchievementMenuComponent } from './component/home/achievement-menu/achievement-menu.component';
import { ProfileMenuComponent } from './component/home/profile-menu/profile-menu.component';

//Routes
import { APP_ROUTING } from "./app.routes";

//Service
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [AppComponent, LogInComponent, HomeComponent, SigninComponent,HomeMenuComponent, AchievementMenuComponent, ProfileMenuComponent],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    HttpModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
