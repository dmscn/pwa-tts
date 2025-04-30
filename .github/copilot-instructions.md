# Copilot Instructions: Text-to-Speech PWA

## Project Overview

This project aims to build a lightweight Progressive Web Application (PWA) that converts user-inputted text into natural-sounding speech using the Kokoro TTS service. The application should be simple, fast, and provide a seamless user experience across devices.

## Goal

The primary goal is to create a functional PWA with:
- A text input area.
- A button to trigger text-to-speech generation via Kokoro TTS.
- An audio player to present the output.

The application must be exceptionally lightweight and leverage the specified tech stack.

## Tech Stack

- **Framework**: Astro
- **Frontend Library**: React (for interactive components)
- **Styling**: Tailwind CSS
- **UI Component Library**: Flowbite
- **Text-to-Speech**: Kokoro TTS via the `kokoro-js` npm package

## Key Features & Requirements

Based on the Project Requirement Document (PRD), the core features and requirements are:

1. **Text Input**: A multi-line text area with a clear label for user input.
2. **Generate Button**: A button to initiate the TTS process.
3. **Loading State**: The button should display a spinner and be disabled while generation is in progress.
4. **Audio Output**: An audio player element should appear below the button upon successful generation.
5. **UI Spacing**: Clear visual separation between the input/button area and the audio output.
6. **PWA Capabilities**: The application should function as a PWA (basic offline support, installability).
7. **Lightweight & Performant**: The application must be optimized for speed and minimal resource usage.
8. **Responsiveness**: The UI must adapt well to various screen sizes.

## Implementation Details & Guidelines

### Astro + React
- Use Astro as the primary framework.
- Interactive parts like the text area, button, loading state, and audio player should be implemented as React components.
- These React components will be integrated into Astro pages.

### Styling
- Apply styling using Tailwind CSS classes.
- Utilize Flowbite components where appropriate for standard UI elements (like buttons, spinners, text areas) to maintain consistency and speed up development.

### Kokoro TTS Integration
- Install and use the `kokoro-js` package to handle communication with the Kokoro TTS service.
- The button's click handler will trigger the TTS generation via this library.

### State Management
- Manage the application state (text input, loading status, audio data) within the React components, likely using React's `useState` hook.

### Error Handling
- Implement basic error handling for the TTS generation process (e.g., display an error message if the API call fails).

### Audio Playback
- Use the standard HTML5 `<audio>` element to play the generated audio.
- The `src` of this element will be set to the audio data received from Kokoro TTS.

### PWA Setup
- Configure Astro for PWA capabilities, including setting up a web manifest and a service worker for caching (at least for offline page display).

### Code Structure
- Organize code logically within the Astro project structure, separating React components, Astro pages, and utility functions.

## Specific Component Requirements

### Textarea Component (React)
- Should be a React component.
- Include a `<label>` associated with the `<textarea>`.
- Manage the text input state.
- Apply Tailwind/Flowbite styling.

### Generate Button Component (React)
- Should be a React component.
- Display "Generate" text initially.
- Manage a loading state (boolean).
  - When `loading` is `true`:
    - Display a spinner (e.g., using a Flowbite spinner component or Tailwind classes).
    - Disable the button.
  - When `loading` is `false`:
    - Display "Generate" text.
    - Enable the button.
- Accept an `onClick` prop to trigger the TTS generation function.
- Apply Tailwind/Flowbite styling.

### Audio Player Component (React)
- Should be a React component.
- Conditionally render based on whether audio data is available.
- Use the HTML5 `<audio controls>` element.
- Set the `src` attribute to the generated audio data (likely a data URL or blob URL).
- Apply Tailwind styling for spacing and appearance.

## Integration Steps

1. Set up a new Astro project with React and Tailwind integrations.
2. Install Flowbite and `kokoro-js`.
3. Create the React components (Textarea, GenerateButton, AudioPlayer).
4. Create an Astro page (e.g., `src/pages/index.astro`) to host the React components.
5. In the Astro page or a parent React component, manage the overall state (text, loading, audio).
6. Implement the function that calls `kokoro-js` with the text from the textarea when the button is clicked.
7. Update the state based on the TTS response (set `loading` to `false`, set audio data).
8. Render the AudioPlayer component when audio data is available.
9. Configure the Astro project for PWA features (manifest, service worker).

## Performance & Optimization

- Keep component logic minimal.
- Ensure efficient state updates in React.
- Optimize imports and dependencies.
- Leverage Astro's build optimizations for lightweight output.

## Testing

- Verify text input and button click functionality.
- Test the loading state and button disabling.
- Confirm audio playback after generation.
- Check responsiveness on different devices.
- Test basic offline behavior.

This document should serve as a comprehensive guide for contributing to the project.
