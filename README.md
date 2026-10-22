# GymTastisch

A simple, free workout tracker that runs in the browser and installs on your phone like an app.

## Features

- **Guided setup:** create your training days on first launch, then see which day is up next
- **Training days in rotation:** save up to 7 days (e.g. "Day 1" or "Push") with a fixed set of exercises. They come up in your chosen order, whichever weekday you train, and any day can be started with one tap
- **Week overview:** tap a day of the current week to add a workout afterwards or mark it as a rest day
- **Progressive overload:** your first set decides the weight for next time, based on your target rep range (default 8–12). The suggested change is about 5 % of the load, rounded to the exercise's weight step
- **Weight steps per exercise** to match plates or machine stacks (1 kg by default), and bodyweight exercises with optional added weight
- **kg and lb side by side:** the weight entry shows both units. Machines whose stacks go up in pounds move one plate at a time (10 lb ≈ 4.5 kg), and any exercise can be switched between kg plates and a lb stack right where the weight is set
- **Quick logging:** weight × reps with +/− buttons, prefilled from last time
- **Rest timer:** starts automatically after each set, keeps the screen on and plays a short beep over your music
- **Motivation:** weekly goal ring and streak, feedback when a set beats last time, and a summary with highlights after every workout
- **Statistics:** workouts per week, weekly volume, sets per muscle group, personal records and an optional body-weight log with trend chart
- **69 illustrated exercises** with machine, cable and free-weight variants, quick filters (upper body, legs, core, cardio) and search, plus your own exercises with photos and notes
- **Technique tips** for every built-in exercise: machine setup, execution, target muscles and common mistakes, based on NSCA and ACSM references; available from the exercise page and during a workout
- **Progress** chart per exercise (estimated 1RM, top weight, volume) and a history of all workouts
- **German and English**, dark and light mode
- **Works offline;** your data stays on your phone, with backup export and import

## Install

**iPhone:** open the app in Safari, tap **Share → Add to Home Screen**, then open it from the new icon.

**Android:** open the app in Chrome, tap the **⋮ menu → Install app** (or **Add to Home screen**), then open it from the new icon.

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

Every push to `main` is built and published with GitHub Pages.
