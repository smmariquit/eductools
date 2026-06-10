import { Helmet } from 'react-helmet-async';

const TermsOfUse = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>Terms of Use | Eductools</title>
        <meta name="description" content="Terms of Use for Eductools." />
      </Helmet>

      <div className="prose prose-base md:prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-li:text-base-content/80">
        <h1 className="text-primary mb-2">Terms of Use</h1>
        <p className="text-sm text-base-content/50 mt-0 mb-8">Last Updated: June 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Eductools ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
          If you do not agree to abide by these terms, please do not use this Service.
        </p>

        <h2>2. Educational Purpose</h2>
        <p>
          Eductools is an interactive educational platform designed to supplement formal instruction. 
          The content, including but not limited to text, graphics, and interactive visualizers, is for informational and educational purposes only. 
          We strive for scientific accuracy but do not guarantee that all material is completely error-free.
        </p>

        <h2>3. User Conduct</h2>
        <p>
          You agree to use Eductools only for lawful purposes. You may not use the Service to:
        </p>
        <ul>
          <li>Interfere with or disrupt the performance of the website or servers.</li>
          <li>Attempt to gain unauthorized access to any portion of the site.</li>
          <li>Reproduce, duplicate, or copy our interactive source code without attribution.</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content, visualizers, algorithms, and deep dive documentation created for Eductools are the intellectual property of the developers, 
          unless otherwise stated (such as third-party open-source libraries like Three.js and React, which are governed by their respective licenses).
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Eductools makes no representations or warranties of any kind, 
          express or implied, regarding the operation of the Service or the information, content, or materials included.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
          By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
