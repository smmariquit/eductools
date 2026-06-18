import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const HelpFaq = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>Help & FAQs | EduVisualsPH</title>
        <meta name="description" content="Frequently Asked Questions and Help center for EduVisualsPH." />
      </Helmet>

      <div className="prose prose-base md:prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80">
        <h1 className="text-primary mb-8">Help & FAQs</h1>

        <div className="space-y-6">
          <div className="collapse collapse-plus bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" defaultChecked /> 
            <div className="collapse-title text-xl font-medium">
              How do I use the interactive visualizers?
            </div>
            <div className="collapse-content text-base-content/80"> 
              <p>
                Each tool has an interactive canvas and a control panel. Use sliders and buttons to change
                variables (temperature, mass, angle, and so on) and watch the drawing update. Most tools also
                include a written deep-dive below the canvas with the full explanation.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" /> 
            <div className="collapse-title text-xl font-medium">
              Can I use EduVisualsPH offline?
            </div>
            <div className="collapse-content text-base-content/80"> 
              <p>
                Yes! EduVisualsPH is built as a Progressive Web App (PWA). If you are using a modern browser (like Chrome or Safari), 
                you can "Install" or "Add to Homescreen". Once installed, the interactive modules and articles are cached on your device, 
                allowing you to use the core visualizers even without an internet connection.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" /> 
            <div className="collapse-title text-xl font-medium">
              Is EduVisualsPH free?
            </div>
            <div className="collapse-content text-base-content/80"> 
              <p>
                Yes, EduVisualsPH is free for students and teachers. The site is supported by advertising
                so the tools stay free to use.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" /> 
            <div className="collapse-title text-xl font-medium">
              I found a bug or a mathematical error. What should I do?
            </div>
            <div className="collapse-content text-base-content/80"> 
              <p>
                Please <Link to="/contact">contact me</Link> with the tool name and a short description
                of what looks wrong. Factual errors get treated like bugs.
              </p>
            </div>
          </div>
          
          <div className="collapse collapse-plus bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" /> 
            <div className="collapse-title text-xl font-medium">
              How does this map to the MATATAG curriculum?
            </div>
            <div className="collapse-content text-base-content/80"> 
              <p>
                Each tool is tagged to the MATATAG grade band it targets (see the tags on the home page).
                The curriculum guides in the{' '}
                <a href="https://github.com/smmariquit/eduvisualsph" target="_blank" rel="noopener noreferrer">GitHub repo</a>{' '}
                are the reference I use when deciding where a topic fits.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-base-200 border border-base-300 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 not-prose">
          <div>
            <div className="text-info font-bold text-lg">Still need help?</div>
            <div className="text-base-content/80 text-sm mt-1">
              If you have a question that isn't answered here, feel free to reach out.
            </div>
          </div>
          <Link to="/contact" className="btn btn-info btn-sm shrink-0">Contact Page</Link>
        </div>
      </div>
    </div>
  );
};

export default HelpFaq;
