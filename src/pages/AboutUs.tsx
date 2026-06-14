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
          formulas like <i>F = ma</i> or <i>P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub></i>, but struggled to intuitively grasp what those formulas meant in the real world. 
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

        <h2 id="editorial-policy" className="mt-16 text-3xl font-bold border-b border-base-300 pb-2 scroll-mt-24">Editorial Policy & E-E-A-T Guarantee</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-start mt-8 bg-base-200 p-8 rounded-2xl border border-base-300 shadow-sm not-prose">
          <div className="shrink-0 flex flex-col items-center gap-3 w-full md:w-auto">
            <div className="avatar">
              <div className="w-32 md:w-48 rounded-full ring-4 ring-primary ring-offset-base-200 ring-offset-4 shadow-xl">
                <img src="/team/author.jpg" alt="Simonee Ezekiel Mariquit - Lead Developer" />
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="font-bold text-xl text-base-content">Simonee Ezekiel Mariquit</div>
              <div className="text-xs font-extrabold text-primary uppercase tracking-widest mt-1">Lead Developer & Creator</div>
              <p className="text-sm text-base-content/70 mt-4 max-w-[250px] mx-auto leading-relaxed">
                Computer Science student at the University of the Philippines Los Baños (UPLB) and a scholar of the Department of Science and Technology (DOST).
              </p>
            </div>
          </div>
          
          <div className="flex-1 text-base-content/80 text-sm md:text-base space-y-4">
            <p className="font-bold text-xl text-base-content">Our Commitment to Educational Integrity</p>
            <p>
              At Eduvisuals, we understand that educational tools must meet the highest standards of scientific and mathematical accuracy. To survive and thrive in the modern web landscape, our content is strictly governed by <strong>E-E-A-T principles (Experience, Expertise, Authoritativeness, and Trustworthiness)</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4 text-base-content/90">
              <li><strong>Curriculum Alignment:</strong> Every visualizer and methodology deep-dive is explicitly cross-referenced with the Philippine Department of Education's latest MATATAG guidelines to ensure grade-level appropriateness.</li>
              <li><strong>Deterministic Data:</strong> Our programmatic SEO data (including public school statistics) is strictly sourced from authoritative government datasets and is routinely audited for accuracy. We do not use generative AI to fabricate local geographic or demographic data.</li>
              <li><strong>Subject Matter Experts:</strong> Our deep-dives—covering Physics, Biology, Earth Science, Chemistry, and Mathematics—are written and peer-reviewed by actual STEM educators and software engineers with verifiable academic backgrounds.</li>
              <li><strong>Zero Content Redundancy:</strong> We separate interactive logic from educational theory. Rather than bloating our interactive tools with generic text, we maintain deeply researched, centralized methodology pages.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
