import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { LogOut, CheckCircle, AlertCircle, User } from 'lucide-react';

interface ProfileFormData {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  techStack: string;
  experience: number;
  available: boolean;
}

export function EmployeePage() {
  const { user, token, logout } = useAuth();

  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.preferred_username || '',
    email: user?.email || '',
    phoneNumber: '',
    role: '',
    techStack: '',
    experience: 0,
    available: true,
  });

  const [submitStatus, setSubmitStatus] =
    useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'experience'
          ? Number(value)
          : value,
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(
        'http://localhost:8081/employee/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit profile');
      }

      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Profile submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

 return (
    <div className="min-h-screen bg-gray-950">
      
      <header className="bg-gray-900 shadow-md border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-900 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl text-white">Employee Portal</h1>
              <p className="text-sm text-gray-400">{user?.preferred_username}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2 text-orange-400" />
            Logout
          </button>
        </div>
      </header>

     
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 bg-green-900 border border-green-700 rounded-lg p-4 flex items-start">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-green-300 mb-1">Profile Submitted Successfully!</h3>
              <p className="text-sm text-green-400">
                Your profile has been updated and is now visible to managers searching for talent.
              </p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 bg-red-900 border border-red-700 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-300 mb-1">Submission Failed</h3>
              <p className="text-sm text-red-400">
                There was an error submitting your profile. Please try again.
              </p>
            </div>
          </div>
        )}

        
        <div className="bg-gray-900 rounded-xl shadow-xl border border-gray-800 p-8 hover:shadow-2xl hover:border-orange-500 transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-2xl mb-2 text-white">Your Professional Profile</h2>
            <p className="text-gray-300">
              Complete your profile to be discoverable by managers looking for talent within the company.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm mb-2 text-gray-300">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm mb-2 text-gray-300">
                  Role / Designation *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="techStack" className="block text-sm mb-2 text-gray-300">
                Tech Stack / Skills *
              </label>
              <textarea
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                required
                rows={4}
                placeholder="e.g., React, TypeScript, Node.js, Python, AWS, Docker..."
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
              <p className="text-sm text-gray-400 mt-1">
                List your technical skills, programming languages, frameworks, and tools
              </p>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm mb-2 text-gray-300">
                Years of Experience *
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                max="50"
                step="0.5"
                placeholder="e.g., 5"
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-orange-600 border-gray-700 bg-gray-800 rounded focus:ring-orange-500"
              />
              <label htmlFor="availability" className="ml-3">
                <span className="block text-sm text-gray-300">
                  I am available for new opportunities
                </span>
                <span className="block text-sm text-gray-400">
                  Toggle this off if you're not currently looking for new projects or roles
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
