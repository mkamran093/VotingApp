import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { PollDetailComponent } from './components/poll-detail/poll-detail.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';

@NgModule({
  declarations: [
    AppComponent,
    PollListComponent,
    PollDetailComponent,
    CreatePollComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
