import Image from "next/image";
import { z } from "zod";
import { queryContent } from "../lib/content";

export const CV = async () => {
  const cvEntriesData = await queryContent(
    `{
      cvEntryCollection(order: [order_DESC], preview: false) {
        items {
          title
          timespan
          company {
            name
            url
            image {
              url
              description
            }
          }
        }
      }
    }`,
    z.object({
      data: z.object({
        cvEntryCollection: z.object({
          items: z.array(
            z.object({
              title: z.string(),
              timespan: z.string(),
              company: z.object({
                name: z.string(),
                url: z.string().url(),
                image: z.object({
                  url: z.string().url(),
                  description: z.string(),
                }),
              }),
            }),
          ),
        }),
      }),
    }),
  );

  const entries = cvEntriesData.data.cvEntryCollection.items;

  return (
    <section className="mx-auto max-w-prose" id="cv">
      <h2 className="mb-6 text-2xl font-bold lg:mb-8 lg:text-3xl xl:text-4xl">
        Stationen
      </h2>
      <ol className="space-y-6 sm:space-y-8">
        {entries.map((entry, index) => (
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
