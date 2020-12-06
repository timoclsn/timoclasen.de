import Image from 'next/image';

function Post({ alt, date, image, title, url }) {
    return (
        <div className="container">
            <a href={url}>
                <Image
                    alt={alt}
                    src={`https:${image.fields.file.url}`}
                    width={500}
                    height={500}
                />
            </a>
            <div className="text">
                <h2>{title}</h2>
                <h4>{date}</h4>
            </div>
        </div>
    );
}

export default Post;
