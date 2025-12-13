'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
    timeline: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: '',
        timeline: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Let's <span className="text-[#ffd700]">Connect</span>
          </h1>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl">
            Have a project in mind? Looking for a creative collaborator?
            Fill out the form below and I'll get back to you within 24-48 hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[#ffd700]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-gray-800 px-4 py-3 focus:border-[#ffd700] focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[#ffd700]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-gray-800 px-4 py-3 focus:border-[#ffd700] focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold mb-2 text-[#ffd700]">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-gray-800 px-4 py-3 focus:border-[#ffd700] focus:outline-none transition-colors"
                  >
                    <option value="">Select a project type</option>
                    <option value="commission">Art Commission</option>
                    <option value="branding">Branding & Identity</option>
                    <option value="design">Graphic Design</option>
                    <option value="illustration">Illustration</option>
                    <option value="consultation">Creative Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold mb-2 text-[#ffd700]">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-800 px-4 py-3 focus:border-[#ffd700] focus:outline-none transition-colors"
                  >
                    <option value="">Select a budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-plus">$25,000+</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-semibold mb-2 text-[#ffd700]">
                    Timeline
                  </label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-black border border-gray-800 px-4 py-3 focus:border-[#ffd700] focus:outline-none transition-colors"
                    placeholder="e.g., 2-3 months, ASAP, Flexible"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-[#ffd700]">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-black border border-gray-800 px-4 py-3 focus:border-[#ffd700] focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ffd700] text-black px-8 py-4 font-bold hover:bg-[#ffd700]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitted}
                >
                  {submitted ? 'Message Sent!' : 'Send Inquiry'}
                </button>

                {submitted && (
                  <p className="text-[#ffd700] text-center">
                    Thank you! I'll be in touch soon.
                  </p>
                )}
              </form>
            </div>

            <div className="space-y-8">
              <div className="border border-gray-800 p-8">
                <h2 className="text-2xl font-bold mb-4 text-[#ffd700]">
                  Get in Touch
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:hello@artist.com" className="text-gray-400 hover:text-[#ffd700] transition-colors">
                      hello@artist.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-400">New York, NY</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Response Time</h3>
                    <p className="text-gray-400">Within 24-48 hours</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-800 p-8">
                <h2 className="text-2xl font-bold mb-4 text-[#ffd700]">
                  Follow My Work
                </h2>
                <div className="space-y-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-[#ffd700] transition-colors"
                  >
                    Instagram →
                  </a>
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-[#ffd700] transition-colors"
                  >
                    Behance →
                  </a>
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-[#ffd700] transition-colors"
                  >
                    Dribbble →
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-[#ffd700] transition-colors"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>

              <div className="border border-gray-800 p-8 bg-gradient-to-br from-[#ffd700]/5 to-transparent">
                <h2 className="text-2xl font-bold mb-4 text-[#ffd700]">
                  Commission Process
                </h2>
                <ol className="space-y-3 text-gray-300 text-sm">
                  <li className="flex gap-3">
                    <span className="text-[#ffd700] font-bold">1.</span>
                    <span>Initial consultation to discuss your vision</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#ffd700] font-bold">2.</span>
                    <span>Proposal and quote based on scope</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#ffd700] font-bold">3.</span>
                    <span>Contract and 50% deposit to begin</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#ffd700] font-bold">4.</span>
                    <span>Concept development and revisions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#ffd700] font-bold">5.</span>
                    <span>Final delivery and remaining payment</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
