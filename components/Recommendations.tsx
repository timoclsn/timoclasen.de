"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Loader, Send } from "react-feather";

import { Button } from "./Button";

export function Recommendations() {
  const [message, setMessage] = useState("");
  const [serverState, setServerState] = useState({
    submitting: false,
    submitted: false,
    error: false,
  });

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setServerState({ submitting: true, submitted: false, error: false });

    const response = await fetch("https://formspree.io/f/xleoyqpj", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setServerState({
        submitting: false,
        submitted: true,
        error: false,
      });
      form.reset();
      setMessage("");
    } else {
      const data = await response.json();

      setServerState({
        submitting: false,
        submitted: true,
        error: data.error,
      });
    }
  }

  const inputStyles =
    "block w-full p-4 text-base bg-light dark:bg-dark rounded-xl placeholder-dark dark:placeholder-light placeholder-opacity-60 dark:placeholder-opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight dark:focus-visible:ring-highlight-dark";

  return (
    <div className="rounded-3xl bg-dark bg-opacity-10 px-6 py-12 dark:bg-light dark:bg-opacity-10 xl:px-12 xl:py-20">
      <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
        Empfehlung
      </h2>
      <p className="mb-8">
        Du kennst einen Podcast, der auf meiner Liste fehlt und in den ich
        unbedingt mal reinhören muss? Schick mir gerne deine Empfehlung!
      </p>
      <form
        className="flex flex-col space-y-4 sm:space-y-8"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="sr-only">Nachricht</span>
          <textarea
            onChange={onChange}
            value={message}
            id="message"
            name="message"
            className={inputStyles}
            placeholder="Welchen Podcast (und warum) möchstest du empfehlen?"
            aria-label="Welchen Podcast (und warun) möchstest du empfehlen?"
            rows={4}
          ></textarea>
        </label>
        <label className="w-full">
          <span className="sr-only">URL</span>
          <input
            id="url"
            name="url"
            type="url"
            className={inputStyles}
            placeholder="Podcast Website (optional)"
            aria-label="Podcast Website (optional)"
          />
        </label>
        <div className="flex space-x-4 sm:space-x-8">
          <label className="w-full">
            <span className="sr-only">Name</span>
            <input
              id="name"
              name="name"
              type="text"
              className={inputStyles}
              placeholder="Dein Name (optional)"
              aria-label="Dein Name (optional)"
            />
          </label>
          <label className="w-full">
            <span className="sr-only">E-Mail</span>
            <input
              id="email"
              name="email"
              type="email"
              className={inputStyles}
              placeholder="Deine E-Mail (optional)"
              aria-label="Deine E-Mail (optional)"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={serverState.submitting || !message}>
            {serverState.submitting ? (
              <Loader className="animate-spin" />
            ) : (
              <Send />
            )}
            Empfehlung senden
          </Button>
        </div>
        <div className="mx-auto">
          {serverState.submitted &&
            (serverState.error ? (
              <p>{serverState.error}</p>
            ) : (
              <p>Danke für die Empfehlung – ich höre mal rein!</p>
            ))}
        </div>
      </form>
    </div>
  );
}
