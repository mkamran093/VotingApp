import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PollService } from '../../services/poll.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent {
  pollForm: FormGroup;
  submitting = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private pollService: PollService, private router: Router) {
    this.pollForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(5)]],
      options: this.fb.array([
        this.createOptionControl(),
        this.createOptionControl()
      ])
    });
  }

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  createOptionControl() {
    return this.fb.group({
      option: ['', Validators.required]
    });
  }

  addOption(): void {
    if (this.options.length < 8) {
      this.options.push(this.createOptionControl());
    }
  }

  removeOption(index: number): void {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.pollForm.invalid || this.submitting) return;

    this.submitting = true;
    this.error = null;

    const payload = {
      question: this.pollForm.value.question,
      options: this.pollForm.value.options.map((o: any) => ({
        option: o.option,
        voteCount: 0
      }))
    };

    this.pollService.createPoll(payload).subscribe({
      next: (poll) => {
        this.router.navigate(['/polls', poll.id]);
      },
      error: () => {
        this.error = 'Failed to create poll. Please try again.';
        this.submitting = false;
      }
    });
  }
}
