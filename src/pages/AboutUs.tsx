import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Figure } from '../components/content/Figure';
import { images } from '../lib/images';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>About Us | EduVisualsPH</title>
        <meta name="description" content="Learn more about EduVisualsPH and our mission for Philippine education." />
      </Helmet>

      <div className="prose prose-base md:prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-li:text-base-content/80">
        <h1 className="text-primary mb-6">About Us</h1>
        
        <p className="lead text-xl font-medium text-base-content">
          EduVisualsPH is a free collection of interactive STEM tools for Philippine students, mostly Grades 7–10
          science and math, built to pair with the{' '}
          <a href="https://www.deped.gov.ph/matatag/" target="_blank" rel="noopener noreferrer">DepEd MATATAG</a>{' '}
          curriculum.
        </p>

        <h2>Why I built this</h2>
        <p>
          I run Python and machine-learning workshops for students around the country, and I kept hitting the same wall.
          A kid can recite that the area of a circle is <em>πr²</em> and still go quiet when I ask what happens if you
          double the radius. The formula got memorized; the idea behind it never landed. EduVisualsPH is my attempt to
          fix that: each tool lets you poke at one concept until it makes sense, and the written deep-dive underneath
          explains the math when you are ready for it.
        </p>

        <h2>Meet the maker</h2>
        <div className="flex flex-col sm:flex-row gap-6 items-start mt-6 not-prose">
          <div className="avatar shrink-0 mx-auto sm:mx-0">
            <div className="w-32 rounded-2xl ring-2 ring-base-300 shadow-md overflow-hidden">
              <Figure variant="avatar" src={images.team.author} alt="Simonee Ezekiel Mariquit" />
            </div>
          </div>
          <div className="text-base-content/80 space-y-4 text-base leading-relaxed">
            <p className="m-0">
              Hi! I'm Simonee Ezekiel Mariquit — online, most people call me Stimmie. I'm a
              Computer Science student at UP Los Baños and a DOST scholar, and I spend a lot of
              my time building things on the internet and running machine learning and Python
              workshops for students around the country. That's actually where EduVisualsPH comes
              from: I kept wishing Filipino students had science tools that show an idea instead
              of just defining it — so I started making them.
            </p>
            <p className="m-0">
              A few random things about me: I built the PC I still use today when I was 16, I
              daily-drive Fedora Linux, and I've gotten off at all 51 LRT and MRT stations in
              Metro Manila just to explore. When I'm not coding, I'm probably on a photowalk, at
              the gym, or over-analyzing a movie. If you want the fuller story, it's all at{' '}
              <a href="https://stimmie.dev" target="_blank" rel="noopener noreferrer">stimmie.dev</a>{' '}
              — and if this site helped you, don't be a stranger.
            </p>
          </div>
        </div>

        <h2>What you will find here</h2>
        <ul>
          <li><strong>Philippine context:</strong> Jeepneys for Newton's laws, tumbang preso for projectile motion, PAGASA wind signals for typhoons — the examples match the country students actually live in.</li>
          <li><strong>Works offline:</strong> The site is a Progressive Web App, so once a tool is cached it keeps working without a connection.</li>
          <li><strong>Sourced writeups:</strong> Every deep-dive cites primary references (OpenStax, LawPhil, agency pages) and ends with a numbered sources list you can check.</li>
        </ul>

        <h2>Open Source</h2>
        <p>
          EduVisualsPH is free and open source. The entire codebase, including every visualizer
          and deep-dive article, lives on{' '}
          <a href="https://github.com/smmariquit/eduvisualsph" target="_blank" rel="noopener noreferrer">GitHub</a>{' '}
          under the Apache License 2.0. We build in the open so teachers can verify how a simulation
          works, schools can self-host it, and developers can fix or extend it.
        </p>
        <p>
          Contributions are welcome, whether that is reporting a scientific inaccuracy, suggesting
          a new module, or opening a pull request. The{' '}
          <a href="https://github.com/smmariquit/eduvisualsph/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">contributing guide</a>{' '}
          explains the local setup, the writing and citation standards we hold articles to, and how
          to add a visualizer. Bundled educational content from third parties (for example PhET or
          CK-12) keeps its own license; see the README for details.
        </p>
        <p>
          EduVisualsPH is free and always will be. If it genuinely helped you or your students
          and you'd like to support a solo student-dev, you can buy me a kape (coffee) at{' '}
          <a href="https://kape.stimmie.dev" target="_blank" rel="noopener noreferrer">kape.stimmie.dev</a>{' '}
          — completely optional, no pressure.
        </p>

        <h2>Get involved</h2>
        <p>
          If you spot an error, want a new topic covered, or have classroom feedback,{' '}
          <Link to="/contact">email me</Link> or open an issue on GitHub.
        </p>

        <h2 id="editorial-policy" className="mt-16 text-3xl font-bold border-b border-base-300 pb-2 scroll-mt-24">Editorial standards</h2>
        
        <div className="flex flex-col gap-8 items-start mt-8 bg-base-200 p-8 rounded-2xl border border-base-300 shadow-sm not-prose">
          <div className="flex-1 text-base-content/80 text-sm md:text-base space-y-4">
            <p className="font-bold text-xl text-base-content">How I treat accuracy and sources</p>
            <p>
              I am one CS student building these tools and writing the articles. I am not DepEd, and I am not a
              peer-reviewed journal. What I can commit to is checking claims against primary sources, fixing mistakes
              when someone reports them, and keeping the interactive models honest about what they simplify.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4 text-base-content/90">
              <li><strong>Curriculum tags:</strong> Each tool is tagged to the MATATAG grade band it targets, using the curriculum guides in the repo as reference.</li>
              <li><strong>Cited writeups:</strong> Deep-dives link to OpenStax, LawPhil, agency pages, and similar primary sources, and every article ends with a numbered <code className="text-xs">Sources</code> block.</li>
              <li><strong>Tool vs. article:</strong> Sliders and buttons stay short; the long explanation lives in the deep-dive below the tool, not duplicated inside the canvas.</li>
              <li><strong>Corrections:</strong> Report a factual error through <Link to="/contact" className="link link-primary">Contact</Link> or GitHub and I will treat it as a bug, not a debate.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
