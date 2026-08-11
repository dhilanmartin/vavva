"use client";

/* A rounded media slot — video, with a still fallback.
   ===========================================================================

   THE CLIP: a skylight aperture running a full day-to-night light cycle,
   supplied by D as a 6.9MB GIF and re-encoded to public/media/studio-loop.*.

   WHY IT IS PING-PONGED, which is the one thing to understand before
   re-cutting it. The source does not loop and cannot be made to: it is a
   one-way progression, opening on a midday blue sky in a white room and
   ending on a night sky with the room lit amber. Measured, first frame
   against last, the seam was a mean difference of 81/255 with a max of 254 —
   a hard cut to a completely different image every 2.8 seconds.

   So the encode plays it forward and then backwards. That is not a trick to
   hide a bad seam, it is what the subject already is: the return leg reads as
   a sunrise, and a skylight going day → night → day is the piece. The
   reversed half has its first and last frames dropped so neither the
   turnaround nor the wrap shows a duplicated frame; the seam is now 3/255,
   which is h.264 quantisation noise rather than a cut.

   WHY <video> AND NOT THE GIF. A GIF is capped at 256 colours, cannot be
   hardware-decoded, holds every frame uncompressed in memory, and cannot be
   paused. The source banded visibly across the sky gradient, which is most of
   the frame. Re-encoded, the same footage is 371KB as VP9 and 943KB as h.264
   against the GIF's 6.9MB — and VP9 is listed first, so most browsers take
   the 371KB.

   Re-cutting it, if the footage changes:
     ffmpeg -i in.gif -filter_complex \
       "[0:v]format=yuv420p,fps=24,scale=800:450:flags=lanczos,split[a][b];\
        [b]reverse,select='between(n\,1\,N-2)',setpts=N/24/TB[r];\
        [a][r]concat=n=2:v=1[v]" -map "[v]" -crf 23 -movflags +faststart out.mp4

   The cycle is 5.4s. If that reads as too busy behind the copy, slowing it is
   one filter — `setpts=2.0*PTS` — not a re-shoot.

   THE FOUR ATTRIBUTES THAT MAKE AUTOPLAY WORK, none of them optional:
     muted        browsers block autoplay with sound, silently
     playsInline  without it iOS Safari takes the video fullscreen on play
     loop         it is ambient, so it should not stop and hold a last frame
     poster       what is painted before the first frame decodes

   No controls, and no `preload="auto"`: this is wallpaper, not a film. It is
   also aria-hidden — an ambient loop carries no information, and announcing
   it as "video" to a screen reader is noise. Give it a real <figcaption> if
   it ever carries meaning, and drop the aria-hidden at the same time.

   REDUCED MOTION is why this is a client component rather than a plain server
   one. CSS cannot pause a video — `animation: none` does nothing to decoded
   frames — so the only honest way to respect the preference is to not mount
   the <video> at all and paint the poster instead. An autoplaying loop that
   cannot be stopped is precisely the thing that media query exists for.

   `useSyncExternalStore` rather than useState + useEffect, because that is
   exactly what this is: subscribing to a value that lives outside React and
   can change on its own. It gives the server snapshot (false → video) for
   free, so there is no hydration mismatch, and toggling the OS setting
   updates the page without a reload. The useEffect version also trips
   react-hooks/set-state-in-effect, correctly. */

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function MediaFrame({
  aspect = "16 / 9",
  className = "",
  poster = "/media/studio-loop.jpg",
  sources = [
    { src: "/media/studio-loop.webm", type: "video/webm" },
    { src: "/media/studio-loop.mp4", type: "video/mp4" },
  ],
}: {
  aspect?: string;
  className?: string;
  poster?: string;
  sources?: { src: string; type: string }[];
}) {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const still = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    // Server snapshot: assume motion is fine, so the markup React sends and
    // the markup it first hydrates to are the same. The swap, if any, happens
    // on the client's first real read.
    () => false,
  );

  return (
    <div
      aria-hidden
      className={`vv-media ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {still ? (
        // alt="" not a description: the wrapper is already aria-hidden, and a
        // decorative image needs an empty alt rather than a missing one.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" />
      ) : (
        /* Source order is preference order — the browser takes the first type
           it can play, so VP9 goes first and h.264 is the fallback, not the
           other way round. */
        <video autoPlay muted loop playsInline poster={poster}>
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </div>
  );
}
