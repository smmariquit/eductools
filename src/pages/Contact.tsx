import { Helmet } from 'react-helmet-async';
import { Mail } from 'lucide-react';

const EMAIL = 'semariquit@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('EduVisualsPH — ')}`;

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>Contact Us | EduVisualsPH</title>
        <meta name="description" content="Get in touch with Simonee Mariquit about EduVisualsPH — bugs, feedback, or classroom ideas." />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 prose prose-base md:prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80">
          <h1 className="text-primary mb-6">Contact Us</h1>
          <p className="lead text-xl">
            Questions, bug reports, and classroom feedback are welcome. I read every email.
          </p>
          
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Technical Support</h3>
              <p className="mt-0">
                Encountered an issue with a simulation or offline mode?{' '}
                <a href={MAILTO}>Email me</a> with the tool name and what happened.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Educator Feedback</h3>
              <p className="mt-0">
                Are you a teacher using EduVisualsPH in class?{' '}
                <a href={MAILTO}>Email me</a> about topics you wish had a visualizer.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[400px]">
          <div className="card bg-base-200 border border-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-2">Email us</h2>
              <p className="text-base-content/70 mb-4">
                Fastest way to reach me. I read every message.
              </p>

              <a href={MAILTO} className="btn btn-primary gap-2">
                <Mail className="w-5 h-5" />
                Email us
              </a>

              <div className="mt-4">
                <span className="text-sm text-base-content/60">Or copy our address:</span>
                <p className="mt-1 font-mono text-sm select-all bg-base-100 border border-base-300 rounded-lg px-3 py-2 break-all">
                  {EMAIL}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
