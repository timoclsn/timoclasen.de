import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import readingTime from "reading-time";
import "server-only";
import { z } from "zod";
import { queryContent } from "../../lib/content";

export const metadata = async (slug: string) => {
  const response = await queryContent(
    `{
      pageCollection(where: {slug: "${slug}"}, limit: 1, preview: false) {
        items {
          title
          slug
          description
        }
      }
    }`,
    z.object({
      data: z.object({
        pageCollection: z.object({
          items: z.array(
            z.object({
              title: z.string(),
              slug: z.string(),
              description: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  return response.data.pageCollection.items[0];
};

export const image = async (title: string) => {
  const response = await queryContent(
    `{
      assetCollection(where: {title: "${title}"}, limit: 1, preview: false) {
        items {
          url
          description
        }
      }
    }`,
    z.object({
      data: z.object({
        assetCollection: z.object({
          items: z.array(
            z.object({
              url: z.string().url(),
              description: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  return response.data.assetCollection.items[0];
};

export const person = async () => {
  const response = await queryContent(
    `{
      personCollection(where: {name: "Timo Clasen"}, limit: 1, preview: false) {
        items {
          cvText
          imagesCollection {
            items {
              url
              description
            }
          }
          profileImageCollection {
            items {
              url
              description
            }
          }
          linkCollection
        }
      }
    }`,
    z.object({
      data: z.object({
        personCollection: z.object({
          items: z.array(
            z.object({
              cvText: z.string(),
              imagesCollection: z.object({
                items: z.array(
                  z.object({
                    url: z.string(),
                    description: z.string(),
                  }),
                ),
              }),
              profileImageCollection: z.object({
                items: z.array(
                  z.object({
                    url: z.string(),
                    description: z.string(),
                  }),
                ),
              }),
              linkCollection: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  return response.data.personCollection.items[0];
};

export const textSnippet = async (title: string) => {
  const response = await queryContent(
    `{
      textSnippetCollection(where: {title: "${title}"}, limit: 1, preview: false) {
        items {
          content
        }
      }
    }`,
    z.object({
      data: z.object({
        textSnippetCollection: z.object({
          items: z.array(
            z.object({
              content: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  return response.data.textSnippetCollection.items[0].content;
};

export const blogPosts = async () => {
  const response = await queryContent(
    `{
      blogPostCollection(order: [date_DESC], preview: false) {
        items {
          sys {
            id
            publishedVersion
          }
          title
          summary
          subtitle
          slug
          date
          text
        }
      }
    }`,
    z.object({
      data: z.object({
        blogPostCollection: z.object({
          items: z.array(
            z.object({
              sys: z.object({
                id: z.string(),
                publishedVersion: z.number().nullable(),
              }),
              title: z.string(),
              summary: z.string(),
              subtitle: z.string(),
              slug: z.string(),
              date: z.string(),
              text: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  return response.data.blogPostCollection.items.map((blogPost) => {
    const readingTimeObj = readingTime(blogPost.text);
    return {
      ...blogPost,
      readingTime: Math.ceil(readingTimeObj.minutes),
      dateFormatted: format(parseISO(blogPost.date), "dd. MMMM yyyy", {
        locale: de,
      }),
    };
  });
};

export const blogPost = async (slug: string) => {
  const response = await queryContent(
    `{
    blogPostCollection(where: {slug: "${slug}"}, limit: 1, preview: false) {
      items {
        sys {
          publishedVersion
        }
        title
        subtitle
        slug
        date
        author {
          name
          username
          profileImageCollection {
            items {
              url
              description
            }
          }
        }
        summary
        text
      }
    }
  }`,
    z.object({
      data: z.object({
        blogPostCollection: z.object({
          items: z.array(
            z.object({
              sys: z.object({
                publishedVersion: z.number().nullable(),
              }),
              title: z.string(),
              subtitle: z.string(),
              slug: z.string(),
              date: z.string(),
              author: z.object({
                name: z.string(),
                username: z.string(),
                profileImageCollection: z.object({
                  items: z.array(
                    z.object({
                      url: z.string().url(),
                      description: z.string(),
                    }),
                  ),
                }),
              }),
              summary: z.string(),
              text: z.string(),
            }),
          ),
        }),
      }),
    }),
  );

  const blogPost = response.data.blogPostCollection.items[0];

  const readingTimeObj = readingTime(blogPost.text);

  return {
    ...blogPost,
    author: {
      ...blogPost.author,
      name: blogPost.author.name,
      username: blogPost.author.username,
      image: blogPost.author.profileImageCollection.items[1],
    },
    readingTime: Math.ceil(readingTimeObj.minutes),
    dateFormatted: format(parseISO(blogPost.date), "dd. MMMM yyyy", {
      locale: de,
    }),
  };
};

export const cvEntries = async () => {
  const response = await queryContent(
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

  return response.data.cvEntryCollection.items;
};
