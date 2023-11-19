import Image from "next/image";
import { query } from "../../api/query";

export const CV = async () => {
  const cvEntries = await query.content.getCvEntries();

  return (
    <section className="mx-auto max-w-prose" id="cv">
      <h2 className="mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl xl:text-4xl">
        Stationen
      </h2>
      <ol className="space-y-6 sm:space-y-8">
        {cvEntries.map((entry, index) => (
          <li
            className="flex rounded-3xl bg-dark bg-opacity-10 p-4 dark:bg-light dark:bg-opacity-10"
            key={index}
          >
            <div className="flex-none">
              <Image
                className="block rounded-2xl"
                src={entry.company.image.url}
                quality={60}
                alt={entry.company.image.description}
                width={80}
                height={80}
              />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="mb-0.5 font-bold">{entry.title}</h3>
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
};
