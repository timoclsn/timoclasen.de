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
            <style jsx>{`
                .container {
                    cursor: pointer;
                    height: 453px;
                    margin-bottom: 48px;
                }
                a {
                    border-bottom: none;
                }
                a:hover {
                    border-bottom: none;
                }
                .text {
                    margin-top: -160px;
                    padding: 24px;
                    position: absolute;
                }
                h2 {
                    color: white;
                    font-size: 24px;
                    margin-bottom: 0;
                }
                h4 {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 16px;
                    font-weight: 500;
                    margin-top: 8px;
                }
            `}</style>
        </div>
    );
}

export default Post;
