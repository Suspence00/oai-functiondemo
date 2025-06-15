/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const ENV_PATH = path.resolve(process.cwd(), '.env');

function ensureApiKeyExists() {
  // Check if API key is already in process.env
  if (process.env.OPENAI_API_KEY) {
    return Promise.resolve();
  }

  // Check if .env file already contains the key
  if (fs.existsSync(ENV_PATH)) {
    const content = fs.readFileSync(ENV_PATH, 'utf8');
    if (/^OPENAI_API_KEY=.+/m.test(content)) {
      return Promise.resolve();
    }
  }

  // Prompt for the key
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter your OpenAI API key (starts with "sk-"): ', (key) => {
      if (!key.startsWith('sk-')) {
        console.error('❌ Invalid key. Must start with "sk-".');
        process.exit(1);
      }

      const line = `OPENAI_API_KEY=${key}\n`;

      if (fs.existsSync(ENV_PATH)) {
        fs.appendFileSync(ENV_PATH, line);
        console.log('✅ Appended API key to existing .env file.');
      } else {
        fs.writeFileSync(ENV_PATH, line);
        console.log('✅ Created .env file with API key.');
      }

      rl.close();
      resolve();
    });
  });
}

ensureApiKeyExists();