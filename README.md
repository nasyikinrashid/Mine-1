# Database Quest: The Lost Data

A self-contained learning game for **Database Fundamentals 1**, suitable for beginner/diploma students.

## Files
- `index.html` — homepage, instructions, gameplay and results
- `style.css` — responsive futuristic visual design
- `script.js` — gameplay, scoring, feedback and editable question bank

## Play locally
Open `index.html` in a modern browser. No installation, internet connection or server is required.

## Publish to GitHub Pages
1. Create a public GitHub repository (e.g. `database-quest`).
2. Upload **all three website files** (`index.html`, `style.css`, `script.js`) and this README to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)` and click **Save**.
6. After GitHub finishes publishing, open `https://YOUR-USERNAME.github.io/database-quest/`.

## Edit questions
Open `script.js` and find the `EDITABLE QUESTION BANK` section. Each object contains:
- `zone`: topic shown during play
- `question`: prompt
- `options`: array of four answers
- `answer`: correct option index **0, 1, 2, or 3**
- `explanation`: explanation displayed after answering

Add, delete, or modify question objects. The score maximum and progress count adjust automatically. Keep the final question as a new application scenario. All questions must have four options and a valid correct index.

## Scoring
Correct on first attempt: 10 points. Incorrect first attempt: 0 points for that question, but students must retry until correct. No timer or penalties for taking time. Results show first-attempt accuracy and explanations for every question.

## Controls
Mouse/touch: click/tap an answer target. Keyboard: keys 1–4. Continue appears after a correct answer. Restart and Home are available.

## Manual test checklist
- [ ] Start Mission opens Question 1.
- [ ] How to Play and Begin Adventure work.
- [ ] Incorrect target shows a hint and permits a retry.
- [ ] Correct target shows explanation and Continue.
- [ ] Repeated clicks cannot increase score twice.
- [ ] Progress and score update through all 15 questions.
- [ ] Completion shows total, accuracy, and all explanations.
- [ ] Restart clears progress and score.
- [ ] Home and Play Again work.
- [ ] Keyboard 1–4 and phone-sized touch controls work.

The game does not store or transmit student data.


## Version 2 navigation and music
- **Previous** returns to an earlier question, preserving its answers and score.
- **Next** and **Continue** advance only after a correct answer; on the last question they open results.
- Wrong answers can be retried. Revisiting questions never adds duplicate points.
- **Music: On/Off** plays a gentle synthesized melody using the browser Web Audio API; no external audio file or internet required. Browsers require a click before music can play.
- Keyboard: 1–4 answers; left/right arrows navigate.

### Quick manual test
1. Open `index.html`, click Start Mission.
2. Select a wrong answer, check hint, then select the right answer.
3. Click Next, then Previous; confirm previous selection is saved.
4. Return to the next question and confirm the score is unchanged.
5. Toggle Music On and Off.
6. Complete all 15 questions; verify results and Play Again.
7. Test on a narrow mobile browser viewport.
