import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const HelpFaq = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>Help & FAQs | Eductools</title>
        <meta name="description" content="Frequently Asked Questions and Help center for Eductools." />
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
                Each visualizer features an interactive canvas and a control panel. You can usually click, drag, or zoom inside the canvas (especially for 3D modules). 
                Use the sliders on the control panel to modify variables (like Temperature, Mass, or Speed) in real-time and observe the effects instantly.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" /> 
            <div className="collapse-title text-xl font-medium">
              Can I use Eductools offline?
            </div>
            <div className="collapse-content text-base-content/80"> 
              <p>
                Yes! Eductools is built as a Progressive Web App (PWA). If you are using a modern browser (like Chrome or Safari), 
                you can "Install" or "Add to Homescreen". Once installed, the interactive modules and articles are cached on your device, 
                allowing you to use the core visualizers even without an internet connection.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200 border border-base-300">
            <input type="radio" name="faq-accordion" /> 
            <div className="collapse-title text-xl font-medium">
              Is Eductools free?
            </div>
            <div className="collapse-content text-base-content/80"> 
              <p>
                Yes, Eductools is completely free for students and educators. We support the platform through non-intrusive advertising 
                and potential future sponsorships to keep the core educational tools universally accessible.
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
                We appreciate your keen eye! Scientific rigor is our top priority. Please <Link to="/contact">contact us</Link> immediately 
                with the name of the visualizer and a brief description of the error so we can fix it.
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
                We systematically analyze the DepEd K-10 Science curriculum and build visualizers directly targeting the most difficult 
                learning competencies (e.g., Gas Laws in Grade 10, Projectile Motion in Grade 9).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-info/10 border border-info/30 p-6 rounded-xl">
          <h3 className="mt-0 text-info font-bold">Still need help?</h3>
          <p className="mb-0">
            If you have a question that isn't answered here, feel free to reach out via our <Link to="/contact" className="link-info font-bold">Contact Page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpFaq;
