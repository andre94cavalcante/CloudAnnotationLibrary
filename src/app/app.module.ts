import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './login-screen/auth.service';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { ApiUsersComponent } from './api-users/api-users.component';

const appRoutes: Routes = [
  { path: '', component: LoginScreenComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'search', component: SearchComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'registration', component: RegisterScreenComponent },
  { path: 'api/users', component: ApiUsersComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    TopbarComponent,
    HomeComponent,
    UserComponent,
    SearchComponent,
    NotificationsComponent,
    LoginScreenComponent,
    RegisterScreenComponent,
    ApiUsersComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
