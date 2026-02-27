import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const PrivacyPolicy: React.FC = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-slate-950 text-slate-100 selection:bg-purple-400 selection:text-purple-900'
        : 'bg-white text-slate-900 selection:bg-blue-200 selection:text-blue-900'
    }`}>
      <Header />
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 transition-colors mb-8 text-sm font-medium ${
            isDark ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-slate-100' : 'text-blue-900'}`}>Privacy Policy</h1>
        <p className={`mb-12 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className={`space-y-10 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>1. Introduction</h2>
            <p>
              Traceable Health Inc. ("we," "our," or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>2. Information We Collect</h2>
            <p className="mb-3">We may collect information about you in a variety of ways, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, and other contact information you voluntarily provide when contacting us or using our services.</li>
              <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, operating system, pages visited, and the date and time of your visit.</li>
              <li><strong>Health Data:</strong> Any health-related data processed through our platform is handled in accordance with applicable regulations, including HIPAA where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
              <li>Monitor and analyze usage trends to improve user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your
              personal information against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet or electronic storage is 100% secure,
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>5. Third-Party Services</h2>
            <p>
              We may use third-party services that collect, monitor, and analyze data to improve our
              service. These third parties have their own privacy policies addressing how they use such
              information. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>6. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>7. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 13. We do not knowingly
              collect personal information from children under 13. If we become aware that we have
              collected personal data from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date. You are
              advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:traceablehealth@gmail.com" className={`underline ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-800'}`}>
                traceablehealth@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
