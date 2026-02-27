import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const TermsOfService: React.FC = () => {
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

        <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-slate-100' : 'text-blue-900'}`}>Terms of Service</h1>
        <p className={`mb-12 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className={`space-y-10 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services provided by Traceable Health Inc. ("we," "our," or "us"),
              you agree to be bound by these Terms of Service. If you do not agree to these terms, please
              do not use our services.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>2. Description of Services</h2>
            <p>
              Traceable Health provides validated EHR intelligence tools and services designed to help
              healthcare professionals and organizations extract, validate, and utilize clinical data.
              Our services are subject to change and may be updated from time to time.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>3. User Responsibilities</h2>
            <p className="mb-3">When using our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information when creating an account or contacting us</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use our services only for lawful purposes and in compliance with applicable regulations</li>
              <li>Not attempt to gain unauthorized access to our systems or other users' data</li>
              <li>Not use our services to transmit harmful, offensive, or illegal content</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>4. Intellectual Property</h2>
            <p>
              All content, features, and functionality of our services — including but not limited to text,
              graphics, logos, software, and algorithms — are the exclusive property of Traceable Health Inc.
              and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>5. Data and Privacy</h2>
            <p>
              Your use of our services is also governed by our{' '}
              <Link to="/privacy" className={`underline ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-800'}`}>
                Privacy Policy
              </Link>
              , which describes how we collect, use, and protect your information. By using our services,
              you consent to the practices described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>6. Disclaimer of Warranties</h2>
            <p>
              Our services are provided "as is" and "as available" without warranties of any kind, either
              express or implied. We do not warrant that our services will be uninterrupted, error-free,
              or completely secure. Our tools are designed to assist healthcare professionals and should
              not replace professional medical judgment.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Traceable Health Inc. shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including but not limited
              to loss of data, profits, or goodwill, arising out of or related to your use of our services.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>8. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our services at any time, with
              or without cause, and with or without notice. Upon termination, your right to use our
              services will immediately cease.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>9. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the
              State of Illinois, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>10. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify you of
              significant changes by posting the updated terms on this page. Your continued use of our
              services after any changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{' '}
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
