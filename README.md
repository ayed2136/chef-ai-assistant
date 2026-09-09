# Chef AI Assistant

Build Chef AI: a fully responsive modern recipe assistant with English and Arabic UI, dynamic LTR/RTL switching, clean simple Tailwind-style design and FontAwesome icons. Include header with title/subtitle, Leftover Mode toggle, language switcher, API settings button; interactive AI chat with history and streaming/typing feedback; ingredient/craving query card; recipe cards grid with prep time, ingredients, steps, and refresh random recipes. Implement secure Groq Llama 3.3 70B integration via server-side secret/configuration, never expose or hardcode the supplied API key in browser code. Provide robust errors and offline fallback recipe JSON/data so app remains usable without network/API. Aim for a self-contained single-page experience; explain that deployment secrets cannot safely live in a public single HTML client file.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/af69e1ed-b057-40c7-9c60-2ea569c55f01).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
