import Image from 'next/image';

import type { CVEntry } from '../pages/ueber';

interface Props {
  entries: CVEntry[];
}

export function CV({ entries }: Props) {
  return (
    <section className="mx-auto max-w-prose" id="cv">
      <h2 className="mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl xl:text-4xl">
        Stationen
      </h2>
      <ol className="space-y-6 sm:space-y-8">
        {entries.map((entry, index) => (
          <li
            className="flex p-4 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-3xl"
            key={index}
          >
            <div className="flex-none">
              <Image
                className="rounded-2xl"
                src={entry.company.image.url}
                quality={60}
                alt={entry.company.image.description}
                layout="fixed"
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col justify-center ml-4">
              <h3 className="font-bold mb-0.5">{entry.title}</h3>
              <a
                href={entry.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline opacity-60"
              >
                {entry.company.name}
              </a>
              <p className="opacity-60">{entry.timespan}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
