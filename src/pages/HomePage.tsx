import { useNavigate } from 'react-router-dom';
import { Heart, Search, Shield, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { PetCard } from '../features/pet-inventory/components/PetCard';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const featuredPets = [
  {
    id: 1,
    name: 'Luna',
    species: 'Dog',
    breed: 'Golden Retriever Mix',
    age: 2,
    size: 'Medium',
    gender: 'FEMALE',
    photos: ['https://images.unsplash.com/photo-1631239465180-30fa6d4e9f39?w=400&h=400&fit=crop'],
    shelterName: 'Happy Tails Shelter'
  },
  {
    id: 2,
    name: 'Rocky',
    species: 'Cat',
    breed: 'Tabby Cat',
    age: 3,
    size: 'Small',
    gender: 'MALE',
    photos: ['https://images.unsplash.com/photo-1509205477838-a534e43a849f?w=400&h=400&fit=crop'],
    shelterName: 'Paws & Whiskers'
  },
  {
    id: 3,
    name: 'Bella',
    species: 'Dog',
    breed: 'Labrador Mix',
    age: 1,
    size: 'Large',
    gender: 'FEMALE',
    photos: ['https://images.unsplash.com/photo-1682448169828-039868860001?w=400&h=400&fit=crop'],
    shelterName: 'Happy Tails Shelter'
  },
  {
    id: 4,
    name: 'Oliver',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: 4,
    size: 'Small',
    gender: 'MALE',
    photos: ['https://images.unsplash.com/photo-1747114479883-8ce60945c665?w=400&h=400&fit=crop'],
    shelterName: 'Furry Friends Rescue'
  }
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="transparent" />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden min-h-screen flex items-center">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90">Trusted by 12,000+ families</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                    Find Your
                    <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 text-transparent bg-clip-text">
                      Perfect Match
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-blue-100/80 leading-relaxed max-w-lg">
                    Connect with loving pets waiting for their forever home. Start your adoption journey today.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => navigate('/pets')}
                    className="group px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Browse Available Pets
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => navigate('/test')}
                    className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/10 transition-all border border-white/20"
                  >
                    View HU Modules
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-6">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-slate-900"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-slate-900"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-slate-900"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">
                        +2k
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex gap-0.5 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-blue-200/70 text-xs">4.9/5 from 2,000+ reviews</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Image Section */}
              <div className="relative lg:block hidden">
                {/* Main Image Container */}
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-3xl blur-2xl"></div>

                  {/* Main Image */}
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-2 border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=700&h=700&fit=crop"
                      alt="Happy pets"
                      className="rounded-2xl w-full h-full object-cover shadow-2xl"
                    />
                  </div>

                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 max-w-xs">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">12,547</p>
                        <p className="text-sm text-gray-600">Successful Adoptions</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">+23% this month</p>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-400 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 fill-white" />
                      <div>
                        <p className="font-bold text-sm">500+ Shelters</p>
                        <p className="text-xs opacity-90">Verified Partners</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PetMatch?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We make pet adoption simple, safe, and rewarding for everyone involved
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Search className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Search</h3>
                <p className="text-gray-600 leading-relaxed">
                  Filter by breed, age, size, and location to find your perfect match quickly and easily.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Shelters</h3>
                <p className="text-gray-600 leading-relaxed">
                  All our partner shelters are verified and committed to animal welfare and responsible adoption.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Support & Care</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access to veterinary guidance and ongoing support throughout your adoption journey.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join a community of pet lovers and share experiences with fellow adopters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Pets Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Your New Best Friend</h2>
                <p className="text-xl text-gray-600">Featured pets waiting for a loving home</p>
              </div>
              <button 
                onClick={() => navigate('/pets')}
                className="px-6 py-3 text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group"
              >
                View All Pets
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  name={pet.name}
                  species={pet.species}
                  breed={pet.breed}
                  age={pet.age}
                  size={pet.size}
                  gender={pet.gender}
                  photos={pet.photos}
                  shelterName={pet.shelterName}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your journey to pet adoption in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Browse & Search</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Explore our database of available pets. Use filters to find animals that match your lifestyle and preferences.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-300"></div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Apply & Connect</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Submit your adoption application and connect directly with the shelter. We'll guide you through the process.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-300"></div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Welcome Home</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete the adoption process and bring your new family member home. Ongoing support is always available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from families who found their perfect companions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Mitchell', initials: 'SM', color: 'bg-blue-200 text-blue-700', text: '"Finding Max through PetMatch was the best decision we ever made. The process was smooth, and the shelter was incredibly supportive."' },
                { name: 'James Chen', initials: 'JC', color: 'bg-green-200 text-green-700', text: '"The team at PetMatch helped us find Luna, our perfect cat. The verification process gave us confidence, and the support has been amazing."' },
                { name: 'Emily Rodriguez', initials: 'ER', color: 'bg-purple-200 text-purple-700', text: '"As a first-time pet owner, I was nervous, but PetMatch made everything easy. Now I can\'t imagine life without Bella!"' }
              ].map((story, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">{story.text}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${story.color}`}>
                      {story.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{story.name}</p>
                      <p className="text-sm text-gray-500">Adopted Companion, 2024</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Thousands of pets are waiting for their forever home. Your perfect companion is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/pets')}
                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
              >
                Start Your Search
              </button>
              <button 
                onClick={() => navigate('/register-adopter')}
                className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all border-2 border-white"
              >
                Join as Adopter
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
