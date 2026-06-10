import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>About Us | Eductools</title>
        <meta name="description" content="Learn more about Eductools and our mission for Philippine education." />
      </Helmet>

      <div className="prose prose-base md:prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-li:text-base-content/80">
        <h1 className="text-primary mb-6">About Us</h1>
        
        <p className="lead text-xl font-medium text-base-content">
          Eductools is a next-generation interactive educational platform designed specifically for Philippine Grades 7-10 science students.
        </p>

        <h2>Our Mission</h2>
        <p>
          We believe that complex scientific concepts shouldn't be trapped in static textbook diagrams. 
          Our mission is to democratize high-quality, interactive STEM education by aligning cutting-edge web technologies 
          with the Philippine Department of Education's MATATAG K-10 curriculum.
        </p>

        <h2>Why We Built This</h2>
        <p>
          During our research across public schools, we noticed a persistent "definition drift." Students could memorize 
          formulas like $F = ma$ or $P_1V_1 = P_2V_2$, but struggled to intuitively grasp what those formulas meant in the real world. 
          Eductools bridges this gap. By decoupling rigorous mathematical "Deep Dives" from interactive, gamified 3D visualizers, 
          we allow students to <em>feel</em> the physics before they calculate it.
        </p>

        <h2>What Makes Us Different?</h2>
        <ul>
          <li><strong>Localization:</strong> We use local contexts (like "Tumbang Preso" for projectile motion and "Jeepneys" for Newton's laws) to make science relatable.</li>
          <li><strong>Performance:</strong> Built as a Progressive Web App (PWA), Eductools can work completely offline, addressing internet connectivity issues in remote schools.</li>
          <li><strong>Rigorous Math:</strong> We don't dumb down the science. Our LaTeX-enabled deep dives provide institutional-grade dissections of every variable.</li>
        </ul>

        <h2>Get Involved</h2>
        <p>
          Eductools is continuously evolving. We are always looking for educators, developers, and students to help us build the next great interactive module. 
          If you have ideas or feedback, please <Link to="/contact">contact us</Link>.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
