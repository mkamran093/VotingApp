import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll, VoteRequest, CreatePollRequest } from '../models/poll.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getAllPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(this.apiUrl);
  }

  getPollById(id: number): Observable<Poll> {
    return this.http.get<Poll>(`${this.apiUrl}/${id}`);
  }

  createPoll(poll: CreatePollRequest): Observable<Poll> {
    return this.http.post<Poll>(this.apiUrl, poll);
  }

  vote(voteRequest: VoteRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote`, voteRequest);
  }
}
