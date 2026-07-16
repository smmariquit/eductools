import React, { useState } from 'react';

export interface YouTubeEmbedProps {
  /** The YouTube video id, e.g. "aircAruvnKk". */
  id: string;
  /** Accessible, descriptive title for the video. */
  title: string;
  /** Who made it, shown as attribution, e.g. "3Blue1Brown". */
  creator?: string;
  /** Optional start time in seconds. */
  start?: number;
}

/**
 * Privacy-friendly, click-to-play YouTube embed. Shows only a thumbnail until
 * the reader clicks, then loads the iframe from youtube-nocookie.com. This keeps
 * the page fast and sets no YouTube cookies until the reader opts in.
 *
 * Import: `import { YouTubeEmbed } from '../../components/content'`.
 * Use it to let an authoritative figure explain a concept in their own words.
 */
export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ id, title, creator, start }) => {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}` : ''}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ''}`;
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <figure className="not-prose my-8">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-base-300 bg-base-300 shadow-sm">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${title}`}
          >
            <img
              src={thumb}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-base-100/90 shadow-lg transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-primary" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-base-content/70">
        {title}
        {creator && <span className="text-base-content/50"> — {creator}</span>}
        <span className="block text-xs">
          <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline text-[color:var(--link)]">
            Watch on YouTube
          </a>
        </span>
      </figcaption>
    </figure>
  );
};

export default YouTubeEmbed;
