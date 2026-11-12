# Elcano pilot film — production log

Made 13 November 2026 from the approved script (`../video-script.md`), pilot option A in `docs/PLAN_V2.md`.

## Result

| File (in `out/`, not in git) | What                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `elcano-film-16x9.mp4`       | 84 s master, 1280×720, AAC, −16 LUFS                                            |
| `elcano-film-9x16.mp4`       | vertical cut for social (centre crop)                                           |
| `video.en.vtt`               | captions (also in `public/media/juan-sebastian-elcano/`)                        |
| `transcript.txt`             | narration text (also in the legend file)                                        |
| `poster.jpg`                 | poster frame (also `src/assets/legends/juan-sebastian-elcano/video-poster.jpg`) |

On the site now: four silent 6-second loops in story mode (`public/media/juan-sebastian-elcano/loop-*.{webm,mp4,jpg}`), on the chapters The Challenge, Against the Odds, The Defining Moment and The Legacy. The full film stays hidden until it is on YouTube (decision D5: the editor uploads it, then `video.provider: youtube`, `video.src: <11-character id>`, `video.status: published`).

Rebuild the film: `python assemble.py` (needs ffmpeg). The script holds the beat timings, captions and narration text.

## Credits used: 193 of about 718 (estimate was about 270)

| Step                | Model                                                      | Jobs          | Notes                                                                                                                                                |
| ------------------- | ---------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Character reference | Nano Banana (requested Pro; the service ran Nano Banana 2) | 1             | face from the public-domain engraving                                                                                                                |
| Keyframe stills     | same                                                       | 7 + 4 retakes | retakes: beat 4 (ship read as an open boat), beat 5 (flag, comb morions), beat 7 twice (modern coastlines and lettering; replaced by a compass rose) |
| Shots               | Kling 3.0 standard, silent                                 | 7             | 6–10 s each                                                                                                                                          |
| Comparison shot     | Seedance 2.5, 720p                                         | 1             | beat 6; used in the film (better push-in and motion than Kling)                                                                                      |
| Narration           | Seed Audio, preset voice "Arthur"                          | 7 lines       | one line hit a rate limit and was resubmitted                                                                                                        |
| Music               | ElevenLabs Music v2.5, 65 s instrumental                   | 1             |                                                                                                                                                      |

## Checks made

- Every still was viewed before animation against the script's "check before animating" list.
- Kling vs Seedance on the same still: Seedance followed the motion prompt (push-in, gulls); Kling barely moved. For the next films: Kling for slow scenes, Seedance where motion matters.
- Shot 3: the cap drifts into a tied scarf in the last second; trimmed. Shot 7: a page edge appears at the end; trimmed.
- Higgsfield terms (higgsfield.ai/terms, read 13 November 2026): no ownership claimed over outputs, commercial use allowed (§4.4); AI content must be disclosed (§5.5); provenance marks must not be removed (§6.4). Re-encoding drops embedded metadata, so the original downloads are kept here; the visible disclosure is on screen for the first 3.5 s and on the end card.

## Not done yet

- The voice was chosen without listening (no audio playback here). If "Arthur" doesn't suit, the seven lines cost about 2 credits to redo with another voice.
- YouTube upload (editor).
