import { useState } from 'react';
import { Loader, Send } from 'react-feather';

export default function Recommendations() {
    const [message, setMessage] = useState('');
    const [serverState, setServerState] = useState({
        submitting: false,
        submitted: false,
        error: false
    });

    function onChange(e) {
        setMessage(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        setServerState({ submitting: true, submitted: false, error: false });

        const response = await fetch('https://formspree.io/f/xleoyqpj', {
            method: 'POST',
            body: new FormData(form),
            headers: {
                Accept: 'application/json'
            }
        });

        if (response.ok) {
            setServerState({
                submitting: false,
                submitted: true,
                error: false
            });
            form.reset();
            setMessage('');
        } else {
            const data = await response.json();
            setServerState({
                submitting: false,
                submitted: true,
                error: data.error
            });
        }
    }

    const inputStyles =
        'w-full p-4 bg-light block text-base dark:bg-dark rounded-xl placeholder-dark dark:placeholder-light placeholder-opacity-60 dark:placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-highlight dark:focus:ring-highlight-dark';

    return (
        <div className="px-6 py-12 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-3xl xl:px-12 xl:py-20">
            <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
                Empfehlung
            </h2>
            <p className="mb-8">
                Du kennst einen Podcast, der auf meiner Liste fehlt und in den
                ich unbedingt mal reinhören muss? Schick mir gerne deine
                Empfehlung!
            </p>
            <form
                className="flex flex-col space-y-4 sm:space-y-8"
                onSubmit={handleSubmit}>
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
                        rows="4"></textarea>
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
                    <button
                        type="submit"
                        disabled={serverState.submitting || !message}
                        className="flex items-center justify-center w-full px-8 py-3 space-x-2 font-bold rounded-full sm:w-auto bg-highlight dark:bg-highlight-dark text-light dark:text-light hover:bg-opacity-90 dark:hover:bg-opacity-90 disabled:opacity-50 dark:disabled:opacity-50"
                        aria-label="Empfehlung senden">
                        {serverState.submitting ? (
                            <Loader size={20} className="animate-spin" />
                        ) : (
                            <Send size={20} />
                        )}
                        <span>Empfehlung senden</span>
                    </button>
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
