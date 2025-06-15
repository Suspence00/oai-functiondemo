"use client";

import React, { useRef, useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import clsx from "clsx";
import { LoadingCircle, SendIcon } from "./icons";
import { Bot, User, ChevronLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

const examples = [
  "Get me the top 5 stories on Hacker News in markdown table format. Use columns like title, link, score, and comments.",
  "Summarize the comments in the top hacker news story.",
  "How tall is Metapod?",
  "Tell me a joke",
  "Tell me the name of a random magic card",
  "Give me a random cat fact",
  "Show me a random dog picture",
  "Share some advice",
  "Suggest a fun activity",
  "Tell me a random number trivia fact",
  "Show me the top games on Steam"
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, setMessages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        return;
      }
    },
  });

  const [exampleIndex, setExampleIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setExampleIndex((i) => (i + 1) % examples.length);
    }, 5000);
  };

  const restartInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const disabled = isLoading || input.length === 0;

  return (
    <main className="flex flex-col items-center justify-between pb-40">
      {/* Removed Vercel and Github links from the top corners */}
      {messages.length > 0 ? (
        <React.Fragment>
          <div className="w-full max-w-screen-md self-start px-5 sm:px-0">
            <button
              onClick={() => setMessages([])}
              className="my-4 flex items-center text-sm text-gray-500 hover:text-black"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Home
            </button>
          </div>
          {messages.map((message, i) => (
            <div
              key={i}
              className={clsx(
                "flex w-full items-center justify-center border-b border-gray-200 py-8",
                message.role === "user" ? "bg-white" : "bg-gray-100",
              )}
            >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  "p-1.5 text-white",
                  message.role === "assistant" ? "bg-green-500" : "bg-black",
                )}
              >
                {message.role === "user" ? (
                  <User width={20} />
                ) : (
                  <Bot width={20} />
                )}
              </div>
              <div className="prose mt-1 w-full break-words prose-p:leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // open links in new tab
                    a: (props) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          ))
        </React.Fragment>
      ) : (
        <div className="border-gray-200 sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10">
            <h1 className="text-lg font-semibold text-black">
              Welcome to Bobly!
            </h1>
            <div className="text-gray-500">
              AI chatbot that uses OpenAI tool integration and{" "}
              <a
                href="https://sdk.vercel.ai/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                Vercel AI SDK
              </a>{" "}
              to interact with:
              <ul>
                <li>
                  <a
                    href="https://github.com/HackerNews/API"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    Hacker News API
                  </a>
                </li>
                <li>
                  <a
                    href="https://pokeapi.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    PokeAPI
                  </a>
                </li>
                <li>
                  <a
                    href="https://teehee.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    teehee.dev
                  </a>
                </li>
                <li>
                  <a
                    href="https://scryfall.com/docs/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    scryfall API
                  </a>
                </li>
                <li>
                  <a
                    href="https://catfact.ninja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    Cat Facts API
                  </a>
                </li>
                <li>
                  <a
                    href="https://random.dog/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    random.dog API
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.adviceslip.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    Advice Slip API
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.boredapi.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    Bored API
                  </a>
                </li>
                <li>
                  <a
                    href="http://numbersapi.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    Numbers API
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamspy.com/api.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition-colors hover:text-black"
                  >
                    SteamSpy API
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col space-y-4 border-t border-gray-200 bg-gray-50 p-7 sm:p-10">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => {
                  setExampleIndex(
                    (exampleIndex - 1 + examples.length) % examples.length
                  );
                  restartInterval();
                }}
                className="rounded-full p-2 text-gray-500 hover:text-black"
                aria-label="Previous example"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                key={exampleIndex}
                className="animate-fade-in rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50"
                onClick={() => {
                  setInput(examples[exampleIndex]);
                  inputRef.current?.focus();
                }}
              >
                {examples[exampleIndex]}
              </button>
              <button
                onClick={() => {
                  setExampleIndex((exampleIndex + 1) % examples.length);
                  restartInterval();
                }}
                className="rounded-full p-2 text-gray-500 hover:text-black"
                aria-label="Next example"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer replaced with custom credit */}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled
                ? "cursor-not-allowed bg-white"
                : "bg-green-500 hover:bg-green-600",
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0 ? "text-gray-300" : "text-white",
                )}
              />
            )}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400">
          Created by{' '}
          <a
            href="https://github.com/cwbcode"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black font-medium"
          >
            @cwbcode
          </a>{' '}and{' '}
          <a
            href="https://github.com/Suspence00"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black font-medium"
          >
            @suspence00
          </a>
        </p>
      </div>
    </main>
  );
}
