import Image from 'next/image';
import { Globe, Twitter } from 'react-feather';

interface Props {
  name: string;
  title?: string;
  subtitle?: string;
  image: string;
}

export function OGImage({ name, title, subtitle, image }: Props) {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '1200px',
        height: '630px',
      }}
    >
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '728px',
          height: '630px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '60px',
            }}
          >
            {name}
          </h1>
          {title ? (
            <h2
              style={{
                fontSize: '3rem',
                fontWeight: 'normal',
                marginBottom: '1rem',
                color: '#3E51F7',
              }}
            >
              {title}
            </h2>
          ) : (
            <p
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              <span style={{ color: '#3E51F7' }}>Designer</span> und
              <span style={{ color: '#3E51F7' }}>Entwickler</span> mit
              Leidenschaft für gut gemachte,{' '}
              <span style={{ fontWeight: 'bold' }}>digitale Produkte</span>.
            </p>
          )}

          {title && subtitle && (
            <p
              style={{
                fontSize: '2rem',
                color: 'grey',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <footer
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Globe
              style={{
                marginRight: '0.5rem',
              }}
            />
            <p>https://timoclasen.de</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Twitter
              style={{
                marginRight: '0.5rem',
              }}
            />
            <p>@timoclsn</p>
          </div>
        </footer>
      </div>
      <div
        style={{
          flex: 'none',
          width: '460px',
          height: '630px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Image"
          priority
          unoptimized
        />
      </div>
    </section>
  );
}
