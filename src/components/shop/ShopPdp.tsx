"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export type ShopPdpImage = {
  src: StaticImageData;
  alt: string;
  fit?: "contain" | "cover";
};

type ShopPdpProps = {
  title: string;
  price: string;
  lede: string;
  features: string[];
  gallery: ShopPdpImage[];
  sizes?: string[];
  details: string;
};

export function ShopPdp({
  title,
  price,
  lede,
  features,
  gallery,
  sizes,
  details,
}: ShopPdpProps) {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(sizes?.[0] ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const many = gallery.length > 1;

  const add = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const cycle = () => {
    if (!many) return;
    setActive((i) => (i + 1) % gallery.length);
  };

  const shots = gallery.map((img, i) => (
    <Image
      key={img.alt}
      src={img.src}
      alt={i === active ? img.alt : ""}
      fill
      sizes="(min-width: 1024px) 520px, calc(100vw - 3rem)"
      placeholder="blur"
      className={`vv-pdp-shot${img.fit === "cover" ? " is-cover" : ""}${
        i === active ? " is-active" : ""
      }`}
    />
  ));

  return (
    <div className="vv-pdp home-rise" style={{ ["--i" as string]: 3 }}>
      <div className="vv-pdp-gallery">
        {many ? (
          <div className="vv-pdp-thumbs">
            {gallery.map((img, i) => (
              <button
                key={img.alt}
                type="button"
                aria-pressed={i === active}
                aria-label={`View ${img.alt}`}
                className={`vv-pdp-thumb${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="72px"
                  placeholder="blur"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}

        {many ? (
          <button
            type="button"
            className="vv-pdp-stage"
            onClick={cycle}
            aria-label={`View next photograph of ${title}`}
          >
            {shots}
          </button>
        ) : (
          <div className="vv-pdp-stage">{shots}</div>
        )}
      </div>

      <div className="vv-pdp-buy">
        <p className="vv-pdp-brand">Vavva</p>
        <h1 className="vv-pdp-title">{title}</h1>
        <p className="vv-pdp-price">{price}</p>

        {sizes?.length ? (
          <div className="vv-pdp-field">
            <p className="vv-pdp-label">
              Size <span>{size}</span>
            </p>
            <div className="vv-pdp-sizes" role="group" aria-label="Size">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`vv-pdp-size${s === size ? " is-active" : ""}`}
                  aria-pressed={s === size}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="vv-pdp-field">
          <p className="vv-pdp-label" id="qty-label">
            Quantity
          </p>
          <div className="vv-pdp-qty" role="group" aria-labelledby="qty-label">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={qty <= 1}
              onClick={() => setQty((n) => Math.max(1, n - 1))}
            >
              −
            </button>
            <span aria-live="polite">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={qty >= 9}
              onClick={() => setQty((n) => Math.min(9, n + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className="vv-pdp-cta-bar">
          <button
            type="button"
            className="vv-pdp-cta"
            onClick={add}
            aria-live="polite"
          >
            {added ? "Added" : `Add to cart — ${price}`}
          </button>
        </div>
        <p className="vv-pdp-ship">
          Please allow 1–2 weeks for items to ship.
        </p>

        <p className="vv-pdp-lede">{lede}</p>

        <ul className="vv-pdp-features">
          {features.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <div className="vv-pdp-accordions">
          <details>
            <summary>
              Details <span aria-hidden>+</span>
            </summary>
            <p>{details}</p>
          </details>
          <details>
            <summary>
              Shipping <span aria-hidden>+</span>
            </summary>
            <p>
              Ships from New York. Please allow 1–2 weeks. You will get a
              note when it leaves.
            </p>
          </details>
          <details>
            <summary>
              Returns <span aria-hidden>+</span>
            </summary>
            <p>
              Unworn items, 14 days. Write to us on Instagram if something
              is wrong with the piece.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
