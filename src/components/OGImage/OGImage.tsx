/* eslint-disable @next/next/no-img-element */

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
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "1200px",
        height: "630px",
        fontFamily: "Inter",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "728px",
          height: "630px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              marginBottom: "60px",
            }}
          >
            {name}
          </h1>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "normal",
              marginBottom: "16px",
              color: "#3E51F7",
            }}
          >
            {title
              ? title
              : "Designer und Entwickler mit Leidenschaft für gut gemachte, digitale Produkte."}
          </h2>

          {title && subtitle && (
            <p
              style={{
                fontSize: "32px",
                color: "grey",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <footer
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: "24px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style={{
                marginRight: "8px",
              }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <p>https://timoclasen.de</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style={{
                marginRight: "8px",
              }}
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
            <p>@timoclsn</p>
          </div>
        </footer>
      </div>
      <img
        src={image}
        alt="Image"
        style={{
          height: "630px",
          width: "460px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </section>
  );
}
