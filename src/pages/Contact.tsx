import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate network request
    setTimeout(() => setStatus('success'), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>Contact Us | Eductools</title>
        <meta name="description" content="Get in touch with the Eductools team for support, feedback, or partnerships." />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 prose prose-base md:prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80">
          <h1 className="text-primary mb-6">Contact Us</h1>
          <p className="lead text-xl">
            We'd love to hear from you. Whether you have a question about our visualizers, found a bug, or want to explore a partnership, our inbox is open.
          </p>
          
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Technical Support</h3>
              <p className="mt-0">Encountered an issue with a simulation or the PWA offline mode? Let us know the details and we'll fix it.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Educator Feedback</h3>
              <p className="mt-0">Are you a teacher using Eductools in your classroom? Tell us what curriculum topics you need visualizers for next!</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[400px]">
          <div className="card bg-base-200 border border-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Send a Message</h2>
              
              {status === 'success' ? (
                <div className="alert alert-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Thanks for reaching out! We'll get back to you soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Your Name</span>
                    </label>
                    <input type="text" placeholder="Juan Dela Cruz" className="input input-bordered w-full" required />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email Address</span>
                    </label>
                    <input type="email" placeholder="juan@example.com" className="input input-bordered w-full" required />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Subject</span>
                    </label>
                    <select className="select select-bordered w-full" required defaultValue="">
                      <option value="" disabled>Select a topic</option>
                      <option value="support">Technical Support / Bug</option>
                      <option value="feedback">Educational Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Message</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-32" placeholder="How can we help?" required></textarea>
                  </div>

                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                      {status === 'submitting' ? <span className="loading loading-spinner"></span> : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
