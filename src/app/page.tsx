const INSTAGRAM = "https://www.instagram.com/casavavva/";
const NYC = "https://en.wikipedia.org/wiki/New_York_City";

export default function HomePage() {
  return (
    <main className="flex min-h-dvh w-full flex-col bg-[#E8E8E8] antialiased">
      <div className="mx-auto flex w-full max-w-[360px] flex-1 flex-col justify-center px-1 py-16">
        <header className="text-[15px] font-medium leading-[1.4] tracking-[-0.015em]">
          <p
            className="home-rise m-0 text-black/90"
            style={{ ["--i" as string]: 0 }}
          >
            Casa Vavva is a private members club based in{" "}
            <a
              href={NYC}
              target="_blank"
              rel="noopener noreferrer"
              className="bio-link"
            >
              New York City
            </a>
            . You must be 21 or under to enter.
          </p>

          <p
            className="home-rise mt-6 mb-0 text-black/45"
            style={{ ["--i" as string]: 1 }}
          >
            A Vavva{" "}
            <span className="ipa" lang="el">
              [vaˈvˌvːa]
            </span>
            ; evokes a sense of beauty, peace, and abundance according to
            ancient Greek philosophy.
          </p>
        </header>

        <footer
          className="home-rise mt-8"
          style={{ ["--i" as string]: 2 }}
        >
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            insta
          </a>
        </footer>
      </div>
    </main>
  );
}
