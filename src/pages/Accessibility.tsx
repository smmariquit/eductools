import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CrayonArt } from '../components/crayon';
import type { CrayonArtName } from '../components/crayon';

interface AccessExample {
  art: CrayonArtName;
  heading: string;
  body: string;
}

const examples: AccessExample[] = [
  {
    art: 'keyboard',
    heading: 'You can drive it without a mouse',
    body:
      'Every slider, toggle, button, and link is a real, plain control, so the Tab key walks you through a tool in order and Space or Enter flips it. When something is focused it gets a visible ring, so a kid steering by keyboard always knows where they are.',
  },
  {
    art: 'listen',
    heading: 'There is always a version you can read or hear',
    body:
      'The moving picture is only half of each tool. Every visualizer is paired with a written "Deep Dive" that says, in words, the same thing the animation is showing. Controls are labeled too, so a screen reader announces "Mass, 12 kilograms" instead of "slider, blank".',
  },
  {
    art: 'large-text',
    heading: 'Bump up the size and nothing breaks',
    body:
      'Text is set in relative units and the drawings scale right along with it, so when a teacher zooms the browser in for the back row, the page reflows and stays readable instead of chopping words off the edge.',
  },
  {
    art: 'contrast',
    heading: 'The colors are picked to be read, not just to look cute',
    body:
      'There is one theme, the crayon one, and the ink-on-cream body text and accent colors were chosen to clear the contrast bar for readable type. The "A" reads whether it sits on a dark patch or a light one.',
  },
  {
    art: 'reduced-motion',
    heading: 'We can hold still if motion bothers you',
    body:
      'If your device is set to reduce motion, the wiggles and draw-on effects stop, and a tool like the Solar System loads with its orbits frozen instead of spinning. Tools with sliders also include a Reset button when you need to start over.',
  },
  {
    art: 'alt-text',
    heading: 'Pictures get described, decorations stay quiet',
    body:
      'Content images carry alt text that says what they show. The little crayon doodles, like the ones on this page, are marked as decoration so a screen reader skips them instead of reading "squiggle, squiggle" out loud.',
  },
  {
    art: 'captions',
    heading: 'Videos wait for you, and you can read along',
    body:
      'When we hand off to an explainer video, it never autoplays. It waits for a click, carries a plain title, and links out to where its captions live, so you can read the words if you would rather not, or cannot, listen.',
  },
];

const Accessibility = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>Accessibility Statement | EduVisualsPH</title>
        <meta name="description" content="How EduVisualsPH tries to be usable by every student and teacher, with plain examples of what we mean by accessible." />
      </Helmet>

      <div className="prose prose-base md:prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-li:text-base-content/80">
        <h1 className="text-primary mb-2">Accessibility Statement</h1>
        <p className="text-sm text-base-content/50 mt-0 mb-8">Last Updated: June 2026</p>

        <p>
          I build these tools so a kid in a crowded classroom can see why a thing works, not just memorize that it does.
          That falls apart fast if the kid can't actually use the tool, so accessibility isn't a checkbox I bolt on at the
          end. It's part of the same job. This page is me showing my work: what we genuinely do today, in plain examples,
          and the parts I'm still figuring out.
        </p>

        <p>
          The honest summary is that the ordinary chrome of the site, the text, the controls, the navigation, is built to
          be usable by everyone, while the interactive canvases (the moving drawings themselves) are the hard part I'm
          still chipping away at. More on that below.
        </p>

        <h2>What "accessible" actually looks like here</h2>
        <p>
          Accessibility is one of those words that turns into mush if you leave it abstract, so here is what it means in
          this app, with a drawing of each so it's a real thing and not a slogan.
        </p>

        <div className="not-prose grid gap-5 sm:grid-cols-2 my-8">
          {examples.map((ex) => (
            <div
              key={ex.art}
              className="flex gap-4 items-start rounded-2xl border border-base-300 bg-base-200/40 p-5"
            >
              <CrayonArt name={ex.art} size={56} animate="draw" className="shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-semibold text-base-content mb-1 leading-snug">
                  {ex.heading}
                </h3>
                <p className="text-sm text-base-content/75 leading-relaxed m-0">{ex.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>What we're aiming for</h2>
        <p>
          The target is the Web Content Accessibility Guidelines, level AA. If you want the full reference it lives with
          the people who write it, the{' '}
          <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">
            W3C Web Accessibility Initiative
          </a>
          . I'd rather not recite clause numbers at you. The point of those guidelines, and the point here, is the same:
          if a student can see, hear, read, or operate something one way, there should be another way when that one
          doesn't fit them.
        </p>

        <h2>The part I'm still working on</h2>
        <p>
          Here's where I'll be straight with you. The interactive canvases are the weak spot. When a tool draws a planet
          looping around the sun or a wave rolling across the screen, a screen reader can't narrate that motion yet, the
          way it can read a paragraph. Most tools draw in plain 2D; the Solar System uses Three.js for its 3D orbits,
          but the accessibility gap is the same either way: a live, changing picture is genuinely hard to hand to someone
          who isn't looking at it.
        </p>
        <p>
          The workaround I ship today is the written Deep Dive that sits under every tool, explaining in words what the
          animation demonstrates. It's a real text alternative, not a placeholder. Making the canvases themselves announce
          what they're doing, step by step, is the next thing on the list, and I'd rather tell you it's not done than
          pretend it is.
        </p>

        <h2>Tell me where it breaks</h2>
        <p>
          If you hit a wall, a control you can't reach, text you can't read, a tool that fights your screen reader, that's
          a bug I want to know about, not a you problem. Send it through the{' '}
          <Link to="/contact">Contact page</Link> and tell me what you were trying to do and what got in the way. Real
          reports from real students and teachers are how this actually gets better.
        </p>
      </div>
    </div>
  );
};

export default Accessibility;
