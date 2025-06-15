# OpenAI - Tools Demo
A demo of OpenAI functionality utilizing Vercel and Next.js.

Implements `streamText` and `tools` from Vercel's AI SDK with the OpenAI model `gpt-3.5-turbo`.

## Available Tools

This demo integrates several free APIs that do not require API keys:

- [Hacker News API](https://github.com/HackerNews/API) – fetch top stories and comments
- [PokeAPI](https://pokeapi.co/) – get Pokémon information
- [teehee.dev](https://teehee.dev/) – random jokes
- [Scryfall](https://scryfall.com/docs/api) – random Magic: The Gathering card
- [Cat Facts](https://catfact.ninja/) – random cat facts
- [random.dog](https://random.dog/) – random dog images
- [Advice Slip](https://api.adviceslip.com/) – random advice
- [Bored API](https://www.boredapi.com/) – random activity suggestions
- [Numbers API](http://numbersapi.com/) – random number trivia
- [SteamSpy](https://steamspy.com/api.php) – Steam game statistics

Requires an OpenAI API key with tokens to use.

# Install
```
git clone https://github.com/Suspence00/oai-functiondemo
cd oai-functiondemo
npm install
```

# Usage
`npm run dev`
You will be prompted to enter your OpenAI API key on first run.
