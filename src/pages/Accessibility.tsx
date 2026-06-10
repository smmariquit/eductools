import { Helmet } from 'react-helmet-async';

const Accessibility = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>Accessibility Statement | Eductools</title>
        <meta name="description" content="Accessibility Statement for Eductools." />
      </Helmet>

      <div className="prose prose-base md:prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-li:text-base-content/80">
        <h1 className="text-primary mb-2">Accessibility Statement</h1>
        <p className="text-sm text-base-content/50 mt-0 mb-8">Last Updated: June 2026</p>

        <p>
          At Eductools, we are committed to making educational technology accessible to everyone, 
          including individuals with disabilities. We strive to provide a seamless and inclusive learning 
          experience across all our interactive visualizers and content.
        </p>

        <h2>Our Commitment</h2>
        <p>
          We are actively working to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. 
          Because our platform relies heavily on interactive 3D WebGL (Canvas) elements to teach complex physics and chemistry, 
          ensuring perfect accessibility for screen readers on visualizer components is an ongoing technical challenge that we are continuously improving.
        </p>

        <h2>Features Implemented</h2>
        <ul>
          <li><strong>High Contrast Themes:</strong> Our dark and light modes are designed to meet contrast ratio standards for text readability.</li>
          <li><strong>Text Alternatives:</strong> Our "Deep Dive" MDX sections serve as comprehensive text alternatives, explaining the exact phenomena shown in the interactive canvases.</li>
          <li><strong>Keyboard Navigation:</strong> We ensure that all forms, navigation links, and standard interactive elements are fully accessible via keyboard.</li>
          <li><strong>Responsive Design:</strong> Eductools scales perfectly from mobile devices to desktop monitors, supporting browser zooming up to 200%.</li>
        </ul>

        <h2>Areas for Improvement</h2>
        <p>
          We recognize that some of our interactive 3D canvases (built with Three.js) currently lack robust semantic ARIA labels 
          for specific graphical events. We are actively researching ways to make Canvas-based scientific simulations more accessible to visually impaired students.
        </p>

        <h2>Feedback</h2>
        <p>
          We welcome your feedback on the accessibility of Eductools. If you encounter any barriers while using our platform, please reach out to us via our Contact page.
        </p>
      </div>
    </div>
  );
};

export default Accessibility;
