const title = 'Timo Clasen';
const description =
    'Timo Clasen ist Informationsdesigner aus Esslingen am Neckar. Er ist Geschäftsführer bei Codeatelier und in der digitalen Produktentwicklung zu Hause. Dort beschäftigt er sich mit Konzept, Design und Softwareentwicklung.';
const url = 'https://timoclasen.de';

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
