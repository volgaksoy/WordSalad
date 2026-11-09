# Word Salad

A responsive, pass-and-play party game for two teams. No backend, build step, or account required.

## Run locally

Run `python -m http.server 4173` and open http://localhost:4173. Run engine checks with `node --test`.

## Play

Add team names and players (uneven teams supported), choose phrase count and turn length, then pass the device privately to each player. Teams alternate timed turns through verbal clues, mime, and one-word clues. Correct answers earn one point; skips return to the queue without penalty. Rule breaks deduct one point and return the phrase to the queue. Recaps use green for correct guesses, red for rule breaks, and gray for skipped or unanswered phrases. Emptying the bowl pauses the timer and advances the round with the same team's remaining time. Clue givers rotate per team.

Game state and phrase drafts are stored in localStorage on this browser. Refreshing a running turn does not stop its deadline. Pause hides the phrase and freezes time. Clearing browser data clears the game. Private entry is a social pass-and-play screen, not encryption; browser developer tools can read saved phrases. No game data is uploaded. Optional Google Fonts requests download typography; system fonts work offline. Sounds are synthesized locally.

## GitHub Pages

Publish the root of `main` using GitHub Pages. All asset paths are relative and work under `/WordSalad/`. The repository is private; Pages availability depends on the account plan. The deployed webpage is public, while game data remains on each device.
