import { Link } from 'react-router-dom';
import { Users, Brain, Shield, Zap } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-8xl md:text-5xl mb-6 text-orange-400">
            OrgBrain.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A powerful internal platform connecting employees with opportunities through AI-powered talent discovery.
          </p>
          
          <Link
            to="/login"
            className="inline-block bg-orange-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-orange-500 transition-colors shadow-lg hover:shadow-3xl"
          >
            Login with Company Account
          </Link>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-xl p-8 shadow-xl border border-gray-800 hover:shadow-2xl hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl text-orange-400">For Employees</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Build your professional profile and make yourself discoverable for new opportunities within the company.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Zap className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Submit your skills and expertise</span>
              </li>
              <li className="flex items-start">
                <Zap className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Update your availability status</span>
              </li>
              <li className="flex items-start">
                <Zap className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Showcase your tech stack</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl p-8 shadow-xl border border-gray-800 hover:shadow-2xl hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl text-orange-400">For Managers</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Discover the right talent for your projects using AI-powered search and natural language queries.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Zap className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Chat with AI assistant</span>
              </li>
              <li className="flex items-start">
                <Zap className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Find employees by skills</span>
              </li>
              <li className="flex items-start">
                <Zap className="w-5 h-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Filter by availability</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 bg-gray-900 rounded-xl p-6 border border-orange-600">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-orange-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg mb-2 text-orange-400">Secure Authentication</h3>
              <p className="text-gray-300">
                This platform uses Keycloak for enterprise-grade authentication and authorization. 
                All access is controlled based on your company roles and permissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
