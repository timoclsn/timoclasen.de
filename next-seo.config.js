const title = 'Timo Clasen';
const description =
    'Timo Clasen ist Informationsdesigner aus Esslingen am Neckar und Geschäftsführer bei Codeatelier. Erfahre hier mehr über alles was er so macht und trete in Kontakt.';
const url = 'https://timoclasen.de/';

const SEO = {
    title,
    description,
    canonical: url,
    openGraph: {
        type: 'website',
        locale: 'de',
        url: 'url',
        title,
        description
    },
    twitter: {
        handle: '@timoclsn',
        site: '@timoclsn',
        cardType: 'summary_large_image'
    }
};

export default SEO;
