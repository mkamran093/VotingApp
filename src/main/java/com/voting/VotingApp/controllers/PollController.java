package com.voting.VotingApp.controllers;

import com.voting.VotingApp.model.Poll;
import com.voting.VotingApp.request.Vote;
import com.voting.VotingApp.services.PollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/polls")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }


    @PostMapping
    public Poll createPoll(@RequestBody Poll poll) {
        return pollService.createPoll(poll);
    }

    @GetMapping
    public List<Poll> getAll() {
        return pollService.getAllPolls();
    }

    @GetMapping("/{myid}")
    public ResponseEntity<Poll> getPoll(@PathVariable Long myid) {
        return pollService.getPollById(myid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/vote")
    public void vote(@RequestBody Vote vote) {
        pollService.vote(vote.getPollId(), vote.getOptionIndex());
    }
}
