import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from '../../services/poll.service';
import { Poll } from '../../models/poll.model';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  polls: Poll[] = [];
  loading = true;
  error: string | null = null;

  constructor(private pollService: PollService, private router: Router) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(): void {
    this.loading = true;
    this.error = null;
    this.pollService.getAllPolls().subscribe({
      next: (data) => {
        this.polls = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load polls. Make sure your Spring Boot server is running.';
        this.loading = false;
      }
    });
  }

  getTotalVotes(poll: Poll): number {
    return poll.options.reduce((sum, opt) => sum + opt.voteCount, 0);
  }

  getLeadingOption(poll: Poll): string {
    if (!poll.options.length) return '—';
    const max = poll.options.reduce((a, b) => a.voteCount > b.voteCount ? a : b);
    return max.voteCount === 0 ? 'No votes yet' : max.option;
  }

  goToDetail(id: number | undefined): void {
    if (id !== undefined) this.router.navigate(['/polls', id]);
  }
}
