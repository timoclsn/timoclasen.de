"use client";

import { Loader, Send } from "lucide-react";
import { useAction } from "../../lib/serverActions/client";
import { Button } from "../../design-system/Button";
import { addRecommendation } from "./actions";

export const errorStyles =
  "absolute left-0 bottom-0 -mb-6 text-red-700 text-sm slide-in-from-top-full duration-100 ease-in-out fade-in animate-in";

const inputStyles =
  "block w-full p-4 text-base bg-light dark:bg-dark rounded-xl placeholder-dark dark:placeholder-light placeholder-opacity-60 dark:placeholder-opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight dark:focus-visible:ring-highlight-dark";

export const Recommendations = () => {
  const { runAction, isRunning, error, validationErrors, isSuccess } =
    useAction(addRecommendation);

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
        action={(formData) => {
          console.log(formData.get("url"));
          runAction({
            message: String(formData.get("message")),
            url: formData.get("url") ? String(formData.get("url")) : undefined,
            name: formData.get("name")
              ? String(formData.get("name"))
              : undefined,
            email: formData.get("email")
              ? String(formData.get("email"))
              : undefined,
          });
        }}
      >
        <label className="relative">
          <span className="sr-only">Nachricht</span>
          <textarea
            id="message"
            name="message"
            className={inputStyles}
            placeholder="Welchen Podcast (und warum) möchstest du empfehlen?"
            aria-label="Welchen Podcast (und warun) möchstest du empfehlen?"
            aria-describedby="message-error"
            rows={4}
            required
          ></textarea>
          {validationErrors?.message && (
            <div id="message-error" aria-live="polite">
              <p className={errorStyles}>{validationErrors.message[0]}</p>
            </div>
          )}
        </label>
        <label className="relative w-full">
          <span className="sr-only">URL</span>
          <input
            id="url"
            name="url"
            type="url"
            className={inputStyles}
            placeholder="Podcast Website (optional)"
            aria-label="Podcast Website (optional)"
            aria-describedby="url-error"
          />
          {validationErrors?.url && (
            <div id="url-error" aria-live="polite">
              <p className={errorStyles}>{validationErrors.url[0]}</p>
            </div>
          )}
        </label>
        <div className="flex space-x-4 sm:space-x-8">
          <label className="relative w-full">
            <span className="sr-only">Name</span>
            <input
              id="name"
              name="name"
              type="text"
              className={inputStyles}
              placeholder="Dein Name (optional)"
              aria-label="Dein Name (optional)"
              aria-describedby="name-error"
            />
            {validationErrors?.name && (
              <div id="name-error" aria-live="polite">
                <p className={errorStyles}>{validationErrors.name[0]}</p>
              </div>
            )}
          </label>
          <label className="relative w-full">
            <span className="sr-only">E-Mail</span>
            <input
              id="email"
              name="email"
              type="email"
              className={inputStyles}
              placeholder="Deine E-Mail (optional)"
              aria-label="Deine E-Mail (optional)"
              aria-describedby="email-error"
            />
            {validationErrors?.email && (
              <div id="email-error" aria-live="polite">
                <p className={errorStyles}>{validationErrors.email[0]}</p>
              </div>
            )}
          </label>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isRunning}>
            {isRunning ? <Loader className="animate-spin" /> : <Send />}
            Empfehlung senden
          </Button>
        </div>
        <div className="mx-auto">
          {isSuccess && <p>Danke für die Empfehlung – ich höre mal rein!</p>}
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
};
