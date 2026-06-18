import { Link } from 'react-router-dom';
import AdUnit from '../components/AdUnit';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  const fullTitle = 'Privacy Policy & Data Processing Agreement | EduVisualsPH';
  const description = 'EduVisualsPH privacy policy compliant with the Philippine Data Privacy Act of 2012 (RA 10173). Learn how we protect your data.';
  const ogImageUrl = `https://eductools.ph/api/og?title=${encodeURIComponent('Privacy Policy')}&desc=${encodeURIComponent(description.slice(0, 100))}`;

  return (
    <div className="w-full">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EduVisualsPH" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>
      <div className="mb-6">
        <Link to="/" className="btn btn-outline btn-sm">&larr; Back to Home</Link>
      </div>

      <article className="prose lg:prose-xl max-w-none text-base-content">
        <h1 className="text-primary">Privacy Policy &amp; Data Processing Agreement</h1>
        <p className="text-base-content/60 text-sm">
          <strong>Effective Date:</strong> June 10, 2026 &nbsp;|&nbsp; 
          <strong>Last Updated:</strong> June 10, 2026
        </p>

        <div className="alert alert-info shadow-sm not-prose mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>This document complies with the <strong>Philippine Data Privacy Act of 2012 (Republic Act No. 10173)</strong> and its Implementing Rules and Regulations (IRR).</span>
        </div>

        {/* ─── SECTION 1 ─── */}
        <h2>1. Who We Are</h2>
        <p>
          <strong>EduVisualsPH</strong> ("we", "us", "our") is a free, web-based educational platform that provides interactive Science, Technology, Engineering, and Mathematics (STEM) visualizers aligned with the Philippine Department of Education (DepEd) <strong>MATATAG Curriculum</strong>. The platform is designed to supplement formal classroom instruction in Philippine basic education (K-12).
        </p>
        <p>
          EduVisualsPH is independently developed and is <strong>not officially affiliated with, endorsed by, or operated by the Department of Education (DepEd)</strong>. It is offered as a supplementary learning resource.
        </p>

        {/* ─── SECTION 2 ─── */}
        <h2>2. Scope of This Policy</h2>
        <p>This Privacy Policy and Data Processing Agreement ("DPA") applies to all users of the EduVisualsPH website and Progressive Web App (PWA), including:</p>
        <ul>
          <li>Students (including minors under 18 years of age)</li>
          <li>Teachers and educators</li>
          <li>Parents and guardians</li>
          <li>General public visitors</li>
        </ul>
        <p>This policy covers all data processing activities conducted through the EduVisualsPH platform, whether accessed via desktop browser, mobile browser, or the installed PWA.</p>

        {/* ─── SECTION 3 ─── */}
        <h2>3. Legal Basis for Data Processing</h2>
        <p>We process personal data under the following legal bases as defined by <strong>RA 10173 (Data Privacy Act of 2012)</strong>:</p>
        <ul>
          <li><strong>Legitimate Interest (Section 12(f)):</strong> We process anonymized analytics data to improve the educational quality and performance of the platform.</li>
          <li><strong>Consent (Section 12(a)):</strong> Where applicable, we obtain consent before collecting any personally identifiable information. For minors (below 18 years old), consent of a parent or guardian is required.</li>
        </ul>

        {/* ─── SECTION 4 ─── */}
        <h2>4. What Data We Collect</h2>
        <p>EduVisualsPH is designed with a <strong>privacy-first, data-minimization</strong> approach. We collect the absolute minimum data necessary to operate and improve the platform.</p>

        <h3>4.1. Data We <u>DO</u> Collect</h3>
        <div className="overflow-x-auto not-prose mb-6">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Data Type</th>
                <th>Purpose</th>
                <th>Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Anonymized Usage Analytics</strong></td>
                <td>Understanding which visualizers are most used, page load performance, and general traffic patterns to prioritize development.</td>
                <td>Aggregated, non-identifiable. Retained for up to 12 months.</td>
              </tr>
              <tr>
                <td><strong>Device/Browser Metadata</strong></td>
                <td>Screen size, browser type, and OS version to optimize for the hardware profiles common in Philippine public schools (e.g., DepEd Digi-Ed tablets).</td>
                <td>Anonymized at collection. No personal identifiers stored.</td>
              </tr>
              <tr>
                <td><strong>Language &amp; Theme Preferences</strong></td>
                <td>Storing your selected language (English/Filipino) and theme (Light/Dark) so the app remembers your preference.</td>
                <td>Stored locally on your device via <code>localStorage</code>. Never transmitted to any server.</td>
              </tr>
              <tr>
                <td><strong>PWA Offline Cache</strong></td>
                <td>Enabling the app to work without internet using a Service Worker.</td>
                <td>Stored locally on your device. Cleared when you uninstall the PWA or clear browser data.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>4.2. Data We <u>DO NOT</u> Collect</h3>
        <div className="not-prose mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Full names or any personally identifiable information (PII)',
              'Email addresses',
              'Student ID numbers or LRN (Learner Reference Numbers)',
              'Grades, scores, or academic performance data',
              'IP addresses (our analytics tool anonymizes these)',
              'Geolocation data beyond country-level estimation',
              'Photos, videos, or biometric data',
              'Any data from minors without parental consent',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-base-200 border border-base-300 rounded-lg text-sm">
                <span className="text-error font-bold shrink-0">✕</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 5 ─── */}
        <h2>5. Third-Party Services</h2>
        <p>We use the following third-party services. Each operates under its own privacy policy:</p>

        <div className="overflow-x-auto not-prose mb-6">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Service</th>
                <th>Purpose</th>
                <th>Data Shared</th>
                <th>Privacy Policy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>PostHog (Analytics)</strong></td>
                <td>Anonymous product analytics for understanding usage patterns.</td>
                <td>Anonymized page views, feature usage. No PII.</td>
                <td><a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="link link-primary">posthog.com/privacy</a></td>
              </tr>
              <tr>
                <td><strong>Google AdSense (Advertising)</strong></td>
                <td>Displaying contextual advertisements to sustain free access to the platform.</td>
                <td>Google may use cookies for ad personalization per their policies. Users may opt out of personalized ads.</td>
                <td><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link link-primary">policies.google.com/privacy</a></td>
              </tr>
              <tr>
                <td><strong>Vercel (Hosting)</strong></td>
                <td>Web hosting and content delivery network (CDN) for the platform.</td>
                <td>Standard server access logs (anonymized IP, user agent).</td>
                <td><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="link link-primary">vercel.com/legal/privacy-policy</a></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ─── SECTION 6 ─── */}
        <h2>6. Cookies and Tracking Technologies</h2>
        <p>EduVisualsPH uses the following types of cookies and local storage mechanisms:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for PWA service worker functionality and user preference storage (theme, language). These cannot be disabled without breaking core functionality.</li>
          <li><strong>Analytics Cookies:</strong> PostHog may set cookies for session tracking. These are anonymized and contain no PII.</li>
          <li><strong>Advertising Cookies:</strong> Google AdSense may set cookies for ad delivery and personalization. You may manage your ad preferences at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</li>
        </ul>

        {/* ─── SECTION 7 ─── */}
        <h2>7. Rights of Data Subjects</h2>
        <p>Under RA 10173, you have the following rights:</p>
        <div className="overflow-x-auto not-prose mb-6">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Right</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Right to be Informed</strong></td>
                <td>You are entitled to know the scope and nature of processing (this document fulfills this right).</td>
              </tr>
              <tr>
                <td><strong>Right to Access</strong></td>
                <td>You may request access to any data we hold about you.</td>
              </tr>
              <tr>
                <td><strong>Right to Erasure / Blocking</strong></td>
                <td>You may request deletion or blocking of your data. Since we collect minimal anonymized data, this is typically fulfilled by clearing your browser's local storage.</td>
              </tr>
              <tr>
                <td><strong>Right to Damages</strong></td>
                <td>You are entitled to compensation for any damages sustained from inaccurate, incomplete, outdated, or unauthorized processing.</td>
              </tr>
              <tr>
                <td><strong>Right to Object</strong></td>
                <td>You may object to processing of your personal data. Contact us at the address below.</td>
              </tr>
              <tr>
                <td><strong>Right to Data Portability</strong></td>
                <td>You may obtain a copy of your data in a standard electronic format.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ─── SECTION 8 ─── */}
        <h2>8. Protection of Minors</h2>
        <p>EduVisualsPH is designed for use in Philippine basic education (Kindergarten through Grade 12). We recognize that many of our users are minors.</p>
        <ul>
          <li>We <strong>do not</strong> knowingly collect any personally identifiable information from anyone, including minors.</li>
          <li>We <strong>do not</strong> require user accounts or registration of any kind.</li>
          <li>All interactive features are accessible without providing personal information.</li>
          <li>If we become aware that we have inadvertently collected personal data from a minor without parental consent, we will take immediate steps to delete such information.</li>
        </ul>

        {/* ─── SECTION 9 ─── */}
        <h2>9. Data Security Measures</h2>
        <p>We implement the following organizational and technical security measures:</p>
        <ul>
          <li><strong>Transport Layer Security (TLS):</strong> All data transmitted between your browser and our servers is encrypted via HTTPS.</li>
          <li><strong>No Server-Side Database:</strong> EduVisualsPH does not operate a user database. There is no centralized store of user information to breach.</li>
          <li><strong>Content Security Policy (CSP):</strong> We implement CSP headers to prevent cross-site scripting (XSS) attacks.</li>
          <li><strong>Regular Dependency Audits:</strong> We monitor and update our software dependencies to patch known vulnerabilities.</li>
        </ul>

        {/* ─── SECTION 10 ─── */}
        <h2>10. Data Breach Notification</h2>
        <p>In the unlikely event of a personal data breach, we will:</p>
        <ol>
          <li>Notify the <strong>National Privacy Commission (NPC)</strong> within 72 hours of becoming aware of the breach, as required by NPC Circular No. 16-03.</li>
          <li>Notify affected data subjects if the breach involves sensitive personal information or is likely to cause serious harm.</li>
          <li>Document the breach, its effects, and the remedial actions taken.</li>
        </ol>

        {/* ─── SECTION 11 ─── */}
        <h2>11. Cross-Border Data Transfers</h2>
        <p>Some third-party services (PostHog, Google, Vercel) may process data outside the Philippines. Such transfers are conducted in compliance with <strong>Section 21 of RA 10173</strong>, ensuring that adequate levels of data protection are maintained by these international service providers through their respective data protection agreements and certifications.</p>

        {/* ─── SECTION 12 ─── */}
        <h2>12. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any material changes will be communicated through a notice on our homepage. Continued use of the platform after changes constitutes acceptance of the revised policy.</p>

        {/* ─── SECTION 13 ─── */}
        <h2>13. Contact Information</h2>
        <p>For privacy-related inquiries, data subject access requests, or complaints, please contact:</p>
        <div className="not-prose bg-base-200 border border-base-300 rounded-xl p-6 mb-6">
          <div className="grid gap-3 text-sm">
            <div className="flex gap-2">
              <strong className="w-32 shrink-0">Entity:</strong>
              <span>EduVisualsPH</span>
            </div>
            <div className="flex gap-2">
              <strong className="w-32 shrink-0">Email:</strong>
              <span>semariquit@gmail.com</span>
            </div>
          </div>
        </div>

        <p>You may also file a complaint with the <strong>National Privacy Commission (NPC)</strong>:</p>
        <div className="not-prose bg-base-200 border border-base-300 rounded-xl p-6 mb-6">
          <div className="grid gap-3 text-sm">
            <div className="flex gap-2">
              <strong className="w-32 shrink-0">Website:</strong>
              <a href="https://www.privacy.gov.ph" target="_blank" rel="noopener noreferrer" className="link link-primary">www.privacy.gov.ph</a>
            </div>
            <div className="flex gap-2">
              <strong className="w-32 shrink-0">Email:</strong>
              <span>complaints@privacy.gov.ph</span>
            </div>
          </div>
        </div>

        {/* ─── SECTION 14 ─── */}
        <h2>14. Governing Law</h2>
        <p>This Privacy Policy is governed by and construed in accordance with the laws of the Republic of the Philippines, specifically:</p>
        <ul>
          <li><strong>Republic Act No. 10173</strong> — Data Privacy Act of 2012</li>
          <li><strong>Republic Act No. 10175</strong> — Cybercrime Prevention Act of 2012</li>
          <li><strong>NPC Circular No. 16-01</strong> — Rules of Procedure of the National Privacy Commission</li>
          <li><strong>NPC Circular No. 16-03</strong> — Personal Data Breach Management</li>
        </ul>

        <div className="divider"></div>
        <p className="text-sm text-base-content/50 italic">
          This document was last reviewed on June 10, 2026. EduVisualsPH is committed to protecting the privacy and rights of Filipino learners, educators, and their families.
        </p>
      </article>

      <div className="mt-8">
        <AdUnit slotId="3001" format="auto" />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
