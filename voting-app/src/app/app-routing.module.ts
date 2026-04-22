import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { PollDetailComponent } from './components/poll-detail/poll-detail.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';

const routes: Routes = [
  { path: '', redirectTo: '/polls', pathMatch: 'full' },
  { path: 'polls', component: PollListComponent },
  { path: 'polls/create', component: CreatePollComponent },
  { path: 'polls/:id', component: PollDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
