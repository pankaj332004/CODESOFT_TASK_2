import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const LegalPages = ({ type = 'privacy' }) => {
  const isPrivacy = type === 'privacy';

  return (
    <PageContainer maxWidth="840px" className="qm-legal-page">
      <div className="qm-legal-card">
        <div className="qm-legal-header">
          {isPrivacy ? <ShieldCheck size={36} className="qm-legal-icon" /> : <FileText size={36} className="qm-legal-icon" />}
          <h1 className="qm-legal-title">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h1>
          <p className="qm-legal-updated">Last Updated: September 2026</p>
        </div>

        <div className="qm-legal-content">
          {isPrivacy ? (
            <>
              <section>
                <h3>1. Information We Collect</h3>
                <p>
                  We collect information you provide directly to us when you create an account, create quizzes, take quizzes, or communicate with us. This includes your name, email address, password hash, and quiz attempt answers.
                </p>
              </section>

              <section>
                <h3>2. How We Use Your Information</h3>
                <p>
                  We use your information to provide, maintain, and improve our services, including calculating scores, tracking your progress on the dashboard, displaying leaderboards, and preventing fraud.
                </p>
              </section>

              <section>
                <h3>3. Data Protection & Security</h3>
                <p>
                  We implement robust security measures including password encryption and secure JSON Web Tokens (JWT) to safeguard your personal credentials. We do not sell or rent your personal information to third parties.
                </p>
              </section>

              <section>
                <h3>4. Your Rights</h3>
                <p>
                  You have the right to access, update, or delete your account information at any time from your account settings or by contacting our support team.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h3>1. Acceptance of Terms</h3>
                <p>
                  By accessing and using QuizMaker, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h3>2. User Responsibilities & Content</h3>
                <p>
                  Users may create and share quizzes on various topics. You agree not to upload content that is harmful, abusive, harassing, infringing on copyright, or violates applicable educational standards.
                </p>
              </section>

              <section>
                <h3>3. Intellectual Property</h3>
                <p>
                  All software code, illustrations, icons, and branding of QuizMaker remain the intellectual property of QuizMaker. You retain ownership of the quiz content you author.
                </p>
              </section>

              <section>
                <h3>4. Service Modifications</h3>
                <p>
                  We reserve the right to modify or discontinue any part of the service with or without notice to ensure quality, maintenance, and platform integrity.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default LegalPages;
