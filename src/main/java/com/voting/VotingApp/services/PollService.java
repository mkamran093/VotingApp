package com.voting.VotingApp.services;

import com.voting.VotingApp.model.OptionVote;
import com.voting.VotingApp.model.Poll;
import com.voting.VotingApp.repositories.PollRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getPollById(Long myid) {
        return pollRepository.findById(myid);
    }

    public void vote(Long pollId, int optionIndex) {
        // get poll from db
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException("Poll not found"));

        // get all options
        List<OptionVote> options = poll.getOptions();

        // if index for vote is not valid, throw error
        if(optionIndex < 0 || optionIndex >= options.size()) {
            throw new IllegalArgumentException("Invalid option index");
        }

        // get selected options
        OptionVote selectedOption = options.get(optionIndex);

        // increment value by 1
        selectedOption.setVoteCount(selectedOption.getVoteCount() + 1);

        // save incremented option in db
        pollRepository.save(poll);

    }
}
