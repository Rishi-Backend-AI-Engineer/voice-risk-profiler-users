import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen" style={{
      fontFamily: 'Poppins, sans-serif',
      background: `linear-gradient(135deg, #205c79 0%, #1a4d66 100%)`,
      color: '#333'
    }}>
      {/* Google Fonts Import */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Archivo+Black&display=swap" rel="stylesheet" />
      
      <div className="max-w-4xl mx-auto py-10 px-5">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-white text-5xl font-black mb-3" style={{
            fontFamily: 'Archivo Black, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Privacy Policy
          </h1>
          <p className="text-white opacity-90 text-xl font-light">
            Voice Analysis Risk Profiler
          </p>
        </div>

        {/* Main Content */}
        <div className="rounded-3xl p-10 shadow-2xl mb-8" style={{
          background: `linear-gradient(135deg, #f07d24 0%, #f69f1c 100%)`
        }}>
          
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              Introduction
            </h2>
            <p className="text-white leading-relaxed mb-4">
              Voice Analysis Risk Profiler ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our voice analysis platform and related services.
            </p>
            <p className="text-white leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              Information We Collect
            </h2>
            
            <h3 className="text-white text-xl font-semibold mb-3 mt-5">
              Voice and Audio Data
            </h3>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed">Audio recordings and voice samples submitted for analysis</li>
              <li className="mb-2 leading-relaxed">Voice patterns, tone, pitch, and speech characteristics</li>
              <li className="mb-2 leading-relaxed">Vocal stress indicators and emotional markers</li>
              <li className="mb-2 leading-relaxed">Analysis results and risk assessment scores</li>
            </ul>

            <h3 className="text-white text-xl font-semibold mb-3 mt-5">
              Personal Information
            </h3>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed">Name, email address, and contact information</li>
              <li className="mb-2 leading-relaxed">Account credentials and authentication data</li>
              <li className="mb-2 leading-relaxed">Organization details and job title</li>
              <li className="mb-2 leading-relaxed">Billing and payment information</li>
            </ul>

            <h3 className="text-white text-xl font-semibold mb-3 mt-5">
              Technical Information
            </h3>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed">IP addresses and device identifiers</li>
              <li className="mb-2 leading-relaxed">Browser type and operating system</li>
              <li className="mb-2 leading-relaxed">Usage patterns and platform interactions</li>
              <li className="mb-2 leading-relaxed">Log files and system performance data</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              How We Use Your Information
            </h2>
            <p className="text-white leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed"><strong>Voice Analysis:</strong> Process audio data to detect potential security threats, fraud attempts, and risk indicators</li>
              <li className="mb-2 leading-relaxed"><strong>Platform Improvement:</strong> Enhance our AI algorithms and improve service accuracy</li>
              <li className="mb-2 leading-relaxed"><strong>Account Management:</strong> Provide customer support and manage user accounts</li>
              <li className="mb-2 leading-relaxed"><strong>Security:</strong> Protect against unauthorized access and maintain platform integrity</li>
              <li className="mb-2 leading-relaxed"><strong>Compliance:</strong> Meet legal obligations and regulatory requirements</li>
              <li className="mb-2 leading-relaxed"><strong>Communications:</strong> Send important updates, notifications, and service-related messages</li>
            </ul>
          </div>

          {/* Highlight Box */}
          <div className="bg-white bg-opacity-20 text-white p-5 rounded-xl my-5 font-medium border-2 border-white border-opacity-30">
            <strong>Important:</strong> We do not sell, rent, or trade your personal information to third parties for marketing purposes. Your voice data is processed solely for security analysis and is deleted immediately after processing.
          </div>

          {/* Data Sharing */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              Data Sharing and Disclosure
            </h2>
            <p className="text-white leading-relaxed mb-4">
              We may share your information only in the following limited circumstances:
            </p>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed"><strong>Service Providers:</strong> Trusted third-party companies that assist in platform operations</li>
              <li className="mb-2 leading-relaxed"><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li className="mb-2 leading-relaxed"><strong>Security Protection:</strong> To protect our rights, prevent fraud, or address security issues</li>
              <li className="mb-2 leading-relaxed"><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset transfers</li>
              <li className="mb-2 leading-relaxed"><strong>Consent:</strong> When you explicitly authorize us to share specific information</li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              Data Security
            </h2>
            <p className="text-white leading-relaxed mb-5">
              We implement comprehensive security measures to protect your information:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
              <div className="bg-white bg-opacity-15 p-5 rounded-xl border-l-4 border-white">
                <h4 className="text-white font-semibold mb-3">Encryption</h4>
                <p className="text-white opacity-90">All data is encrypted using AES-256 encryption both in transit and at rest</p>
              </div>
              <div className="bg-white bg-opacity-15 p-5 rounded-xl border-l-4 border-white">
                <h4 className="text-white font-semibold mb-3">Access Controls</h4>
                <p className="text-white opacity-90">Multi-factor authentication and role-based access controls for all systems</p>
              </div>
              <div className="bg-white bg-opacity-15 p-5 rounded-xl border-l-4 border-white">
                <h4 className="text-white font-semibold mb-3">Monitoring</h4>
                <p className="text-white opacity-90">24/7 security monitoring and intrusion detection systems</p>
              </div>
              <div className="bg-white bg-opacity-15 p-5 rounded-xl border-l-4 border-white">
                <h4 className="text-white font-semibold mb-3">Audits</h4>
                <p className="text-white opacity-90">Regular security audits and penetration testing by third-party experts</p>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              Data Retention
            </h2>
            <p className="text-white leading-relaxed mb-4">
              We retain different types of data for varying periods:
            </p>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed"><strong>Voice Recordings:</strong> Processed and deleted immediately (not stored)</li>
              <li className="mb-2 leading-relaxed"><strong>Analysis Results:</strong> Retained for 12 months for service improvement</li>
              <li className="mb-2 leading-relaxed"><strong>Account Information:</strong> Retained during active service plus 2 years</li>
              <li className="mb-2 leading-relaxed"><strong>Usage Logs:</strong> Retained for 6 months for security and troubleshooting</li>
              <li className="mb-2 leading-relaxed"><strong>Billing Records:</strong> Retained as required by applicable tax and accounting laws</li>
            </ul>
          </div>

          {/* Privacy Rights */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              Your Privacy Rights
            </h2>
            <p className="text-white leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed"><strong>Access:</strong> Request access to your personal data and analysis results</li>
              <li className="mb-2 leading-relaxed"><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
              <li className="mb-2 leading-relaxed"><strong>Erasure:</strong> Request deletion of your personal data</li>
              <li className="mb-2 leading-relaxed"><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li className="mb-2 leading-relaxed"><strong>Objection:</strong> Object to certain types of data processing</li>
              <li className="mb-2 leading-relaxed"><strong>Restriction:</strong> Request limitation of processing under certain circumstances</li>
            </ul>
            <p className="text-white leading-relaxed">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </div>

          {/* Cookies and Tracking */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              Cookies and Tracking
            </h2>
            <p className="text-white leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed">Maintain your login session and preferences</li>
              <li className="mb-2 leading-relaxed">Analyze platform usage and performance</li>
              <li className="mb-2 leading-relaxed">Provide personalized user experience</li>
              <li className="mb-2 leading-relaxed">Ensure security and prevent fraud</li>
            </ul>
            <p className="text-white leading-relaxed">
              You can control cookie settings through your browser, but this may affect platform functionality.
            </p>
          </div>

          {/* International Data Transfers */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              International Data Transfers
            </h2>
            <p className="text-white leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure adequate protection through:
            </p>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed">Standard Contractual Clauses approved by regulatory authorities</li>
              <li className="mb-2 leading-relaxed">Adequacy decisions by relevant data protection authorities</li>
              <li className="mb-2 leading-relaxed">Appropriate technical and organizational security measures</li>
            </ul>
          </div>

          {/* Updates to Policy */}
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-4 pb-2 border-b-4 border-white">
              Updates to This Policy
            </h2>
            <p className="text-white leading-relaxed mb-4">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
            </p>
            <ul className="ml-5 mb-4 text-white">
              <li className="mb-2 leading-relaxed">Posting the updated policy on our platform</li>
              <li className="mb-2 leading-relaxed">Sending email notifications to registered users</li>
              <li className="mb-2 leading-relaxed">Displaying prominent notices within the application</li>
            </ul>
            <p className="text-white leading-relaxed">
              Your continued use of our services after any changes constitutes acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-white bg-opacity-20 text-white p-8 rounded-2xl border-2 border-white border-opacity-30">
            <h3 className="text-white text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="leading-relaxed mb-4">
              If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact us:
            </p>
            <p className="mb-2"><strong>Email:</strong> privacy@voiceanalysisrisk.com</p>
            <p className="mb-2"><strong>Phone:</strong> +1 (555) 789-0123</p>
            <p className="mb-2"><strong>Address:</strong> 456 Security Boulevard, Suite 789, Innovation District, CA 94102</p>
            <p className="mb-4"><strong>Data Protection Officer:</strong> dpo@voiceanalysisrisk.com</p>
            <p className="text-sm opacity-90">
              We typically respond to privacy inquiries within 48 hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white opacity-70 text-sm">
          <p>Last Updated: July 2, 2025 | © 2025 Voice Analysis Risk Profiler. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;