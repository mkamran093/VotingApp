import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollService } from '../../services/poll.service';
import { Poll } from '../../models/poll.model';

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.scss']
})
export class PollDetailComponent implements OnInit {
  poll: Poll | null = null;
  loading = true;
  voting = false;
  error: string | null = null;
  successMessage: string | null = null;
  selectedOption: number | null = null;
  hasVoted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPoll(id);
  }

  loadPoll(id: number): void {
    this.loading = true;
    this.error = null;
    this.pollService.getPollById(id).subscribe({
      next: (data) => {
        this.poll = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load this poll.';
        this.loading = false;
      }
    });
  }

  getTotalVotes(): number {
    if (!this.poll) return 0;
    return this.poll.options.reduce((sum, opt) => sum + opt.voteCount, 0);
  }

  getPercentage(voteCount: number): number {
    const total = this.getTotalVotes();
    return total === 0 ? 0 : Math.round((voteCount / total) * 100);
  }

  selectOption(index: number): void {
    if (this.hasVoted) return;
    this.selectedOption = index;
  }

  submitVote(): void {
    if (this.selectedOption === null || !this.poll?.id || this.voting) return;

    this.voting = true;
    this.error = null;

    this.pollService.vote({ pollId: this.poll.id, optionIndex: this.selectedOption }).subscribe({
      next: () => {
        this.successMessage = `You voted for "${this.poll!.options[this.selectedOption!].option}"!`;
        this.hasVoted = true;
        this.voting = false;
        // Refresh poll data to show updated counts
        this.loadPoll(this.poll!.id!);
      },
      error: () => {
        this.error = 'Vote failed. Please try again.';
        this.voting = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/polls']);
  }
}
