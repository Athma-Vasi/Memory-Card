# Memoji Card Game

Memory card project as part of The Odin Project curriculum

[Click here to view project live](https://athma-vasi.github.io/Memory-Card/)

## Things I learned

This project is designed to cement foundational React principles introduced in the CV-Application project.

### TL;DR

- hooks
- useReducer

I initially used `useState` for local state management and `useReducer` at the app level. However, this created conflicts and I soon realized that any state update triggers a re-render, which was why my values were not being updated properly. Some of my functions were causing multiple re-renders!

So I removed the local `useState`s and made the `reducer` into the central repository of 'truth'. All state was modified at the component level and the `reducer` just replaces the current state with the new state, and passes the state down along with a `dispatch` callback. It became a pure function and was much easier to reason about.

#### Disclaimer

The emojis used in this project were downloaded from [emoji-api.com](https://emoji-api.com/)
