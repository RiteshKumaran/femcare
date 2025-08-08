import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, HeartPulse, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <Navbar />
      <section
        id="hero"
        className="relative overflow-hidden pt-16 md:pt-20 lg:pt-24"
      >
        <div className="container mx-auto px-4 py-16 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-pink-900 sm:text-5xl md:text-6xl">
                AI-Powered Women's Health Platform
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                SheEvolves combines AI disease prediction, menstrual tracking,
                emotional support, and community connection to provide
                comprehensive women's healthcare in one platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                    Get Started
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pink-200 text-pink-700 hover:bg-pink-100"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative lg:pl-8">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="overflow-hidden animate-float">
                  <img
                    src="/female.png"
                    alt="Women's health illustration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block">
          <svg
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
            className="text-pink-100"
          >
            <defs>
              <pattern
                id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-pink-100"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 hidden lg:block">
          <svg
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
            className="text-purple-100"
          >
            <defs>
              <pattern
                id="de316486-4a29-4312-bdfc-fbce2132a2c2"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-purple-100"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c2)"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-pink-800 sm:text-4xl">
              Comprehensive AI-Driven Healthcare
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Early detection, personalized tracking, and emotional support -
              all powered by advanced AI technology for better women's health
              outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Modified Feature Cards */}
            <div className="bg-pink-50 rounded-xl p-8 transition-transform duration-300 hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mb-6">
                <HeartPulse className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-pink-900 mb-3">
                AI Disease Prediction
              </h3>
              <p className="text-gray-600">
                Early detection of breast & cervical cancer and PCOS risks using
                AI analysis of medical history and lifestyle data.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-8 transition-transform duration-300 hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                Smart Menstrual Tracking
              </h3>
              <p className="text-gray-600">
                Personalized cycle predictions and health insights for better
                menstrual health management.
              </p>
            </div>

            <div className="bg-rose-50 rounded-xl p-8 transition-transform duration-300 hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-rose-900 mb-3">
                Emotional AI Chatbot
              </h3>
              <p className="text-gray-600">
                24/7 emotional support and mental health assistance through our
                AI-powered chatbot.
              </p>
            </div>

            <div className="bg-fuchsia-50 rounded-xl p-8 transition-transform duration-300 hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-fuchsia-100 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-fuchsia-600" />
              </div>
              <h3 className="text-xl font-semibold text-fuchsia-900 mb-3">
                Community Connect
              </h3>
              <p className="text-gray-600">
                Join our Clubhouse-style platform for health discussions,
                networking, and community support.
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-8 transition-transform duration-300 hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-pink-900 mb-3">
                Early Detection
              </h3>
              <p className="text-gray-600">
                Proactive health monitoring and risk assessment for timely
                medical intervention.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-8 transition-transform duration-300 hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <HeartPulse className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                Holistic Care
              </h3>
              <p className="text-gray-600">
                Comprehensive approach combining physical health, mental
                wellbeing, and community support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Updated content */}
      <section
        id="testimonials"
        className="py-16 bg-gradient-to-b from-white to-pink-50"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-pink-800 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              See how SheEvolves is transforming women's healthcare through AI
              and community support.
            </p>
          </div>

          {/* Updated testimonials with relevant experiences */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-pink-200 flex items-center justify-center mr-4">
                  <span className="text-pink-700 font-semibold">RP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Rachel P.</h4>
                  <p className="text-sm text-gray-500">
                    Early Detection Success
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "SheEvolves's AI detection system helped identify my PCOS early,
                allowing me to start treatment before complications arose."
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center mr-4">
                  <span className="text-purple-700 font-semibold">SK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah K.</h4>
                  <p className="text-sm text-gray-500">Mental Health Support</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The emotional AI chatbot has been my 24/7 companion, helping me
                manage anxiety and connect with others facing similar
                challenges."
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-rose-200 flex items-center justify-center mr-4">
                  <span className="text-rose-700 font-semibold">MP</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Maya P.</h4>
                  <p className="text-sm text-gray-500">Community Member</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The community platform has connected me with amazing women. We
                share experiences and support each other through health
                challenges."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated messaging */}
      <section id="contact" className="py-16 bg-pink-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-900 sm:text-4xl mb-6">
              Take Control of Your Health Journey
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Join SheEvolves today and experience the power of AI-driven
              healthcare, personalized tracking, and community support - all in
              one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                  Create an Account
                </Button>
              </Link>
              <Link href="/signin">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Update company name and links */}
      <footer id="footer" className="bg-pink-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
            <div>
              <h3 className="text-lg font-semibold mb-4">SheEvolves</h3>
              <p className="text-pink-200">
                Empowering women through AI-driven healthcare and community
                support.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-pink-200 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-pink-200 hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-pink-200 hover:text-white transition-colors"
                  >
                    Testimonials
                  </a>
                </li>

                <li>
                  <a
                    href="#contact"
                    className="text-pink-200 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-pink-800 mt-12 pt-8 text-center text-pink-300">
            <p>© {new Date().getFullYear()} SheEvolves. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
