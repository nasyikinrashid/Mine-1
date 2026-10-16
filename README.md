# Tax Quest — Employment Income

A complete, buildless learning adventure for Malaysian diploma students. English; foundational YA 2025 examples; 12 questions; approximately 15–20 minutes; always untimed.

## Files

```
tax-quest/
├── index.html
├── style.css
├── script.js
└── README.md
```

All artwork uses CSS and system emoji. No remote fonts, libraries, assets, API, account or installation is required. Emoji appearance varies by device. No student information is stored or transmitted. Refreshing, Home and Restart clear progress.

## Learning outcome
Classify basic employment receipts under sections 13(1)(a)–(e), distinguish personal benefits from genuine business reimbursements, and calculate gross employment income from stated taxable amounts. The final question transfers these ideas to a new employee case.

## Play
Use arrow keys or WASD, or tap the four direction buttons. Walk onto a numbered file and press E or Inspect file. Select an answer with keys 1–4, mouse or touch. Read feedback and choose Continue. Wrong answers require a retry before exploration resumes. Solved files can be revisited for explanations. Clear all four files, walk to the exit (column 3, row 5) and choose Open door. Complete three rooms to see the full learning report.

One learning point per correct first attempt; maximum 12. Retries are recorded separately and unlock progress without restoring lost first-attempt points. No points depend on movement, speed or elapsed time. The game has no timer. Each choice is locked immediately, preventing duplicate scoring.

## Test locally
Extract the ZIP. Open index.html in a modern browser. All files must remain in the same folder. There is no build or installation step. Internet is only needed to follow the optional LHDN source link.

## Upload and publish on GitHub Pages
1. Create a GitHub repository, for example `tax-quest`.
2. Choose Add file > Upload files. Upload the CONTENTS of the tax-quest folder: index.html, style.css, script.js and README.md. index.html must be at the repository root, not inside an extra folder.
3. Commit the upload to the main branch.
4. Open Settings > Pages. Under Build and deployment select Deploy from a branch. Choose main and /(root), then Save. GitHub may take a few minutes to publish.
5. Open the URL shown by GitHub Pages. For a project repository it normally follows https://YOUR-USERNAME.github.io/tax-quest/ . Use the exact URL GitHub supplies.
6. After edits, commit the changed files and wait for Pages to redeploy. Refresh the page; if necessary use a hard refresh.

GitHub Pages availability depends on the account and repository visibility. No GitHub repository has been created or deployed on your behalf.

## Edit questions
In script.js find `EDITABLE QUESTION BANK` and edit QUESTION_BANK. Each object contains:

```js
{ q: 'Question text',
  options: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
  correct: 1, // zero-based: this means Answer B
  why: 'Explain the rule, calculation and likely misconception.' }
```

Keep exactly four options per case. `correct` must be 0, 1, 2 or 3. Keep the total in groups of four; each group creates one room. Edit ROOMS to name additional rooms. Keep ROOM_SIZE at 4 because the map contains four file positions. The final question is automatically marked as the transfer challenge: keep a genuinely new example there. Update homepage wording, duration, level and year when changing the course design. All question text is rendered as text, not HTML.

## Tax scope and source notes
These are introductory classification and arithmetic cases, not a complete tax return or computation of tax payable. No personal reliefs, tax rates, residency tests, timing rules, gratuity exemptions or compensation exemption amounts are taught. Business reimbursements in the cases are exact reimbursements of expenditure incurred solely in carrying out employment duties. Car questions either state the taxable value or expressly exclude private use. Accommodation is classified only; no accommodation valuation formula is implied.

Source starting point: LHDN public rulings index:
https://www.hasil.gov.my/perundangan/ketetapan-umum/

Relevant official guidance: Public Ruling 5/2019, Perquisites from Employment; Public Ruling 11/2019, Benefits in Kind; Public Ruling 3/2005 and its addendum, Living Accommodation Benefit Provided for the Employee by the Employer. LHDN employer explanatory notes describe categories 13(1)(a)–(e), including the employer-funded portion of unapproved funds and compensation for loss of employment. Consult the current official index when adapting the game for another year. Some historic direct PDF links are no longer available.

Official HASiL newsletter explanation of benefits in kind and accommodation:
https://www.hasil.gov.my/media/nnidr0j2/e_newsletter_hasil_edition_10_2022.pdf

Cases and explanations were authored for this game. Tax treatment depends on the stated facts; the game does not suggest that every allowance is taxable or that all reimbursements are exempt.

## Verification performed
JavaScript syntax check and a Node-based simulated-DOM integration test passed. The test exercised homepage and Start, door conditions, wall collision, wrong answers, retry, repeated answer calls, progression through all 12 cases, completion with an expected 11/12 first-attempt score, restart, home, and question-bank integrity.

Visual browser QA was unavailable in the execution environment. Responsive CSS and native button keyboard/touch support are included; complete the checks below in actual browsers before classroom use.

## Manual browser checklist
- Open index.html directly. Confirm no console errors and all styling loads.
- Press Play; confirm room 1, 0/12 solved, and 0/12 first-attempt points.
- Test arrows, WASD and all touch direction controls. Check striped walls block movement.
- Try Inspect away from a file; try the locked exit and Open door away from it.
- Inspect file 1; choose an incorrect option. Rapidly click and press answer keys: only one attempt should register.
- Read feedback, Continue to retry, answer correctly, Continue exploring. Confirm solved count grows but first-attempt score does not.
- Revisit the file and check the explanation; reviewing must not award points.
- Clear four files; move to column 3, row 5. Open door to enter the next room.
- Complete all rooms and check the final report includes every explanation and the transfer result.
- Use Restart and Home from gameplay, and Play again and Return home from results. Check state resets.
- Test at 360px, 768px and desktop widths; check long questions, readable options and no horizontal overflow.
- Test Tab, Shift+Tab, Enter and Space, visible focus, 1–4 answer keys, and a screen reader's feedback announcement.
- Test a phone in portrait and landscape. No answer should depend on fast tapping or precise aiming.
- Leave a question open for several minutes: no timeout, lost score or forced progression should occur.
