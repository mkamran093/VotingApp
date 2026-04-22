export interface PollOption {
  option: string;
  voteCount: number;
}

export interface Poll {
  id?: number;
  question: string;
  options: PollOption[];
}

export interface VoteRequest {
  pollId: number;
  optionIndex: number;
}

export interface CreatePollRequest {
  question: string;
  options: PollOption[];
}
