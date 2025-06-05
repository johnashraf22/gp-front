import Navbar from '@/components/Navbar';

import React, { useState } from 'react';
import { Mail, Upload } from 'lucide-react';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    images: null as FileList | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Your message has been sent successfully! We will get back to you soon.');
    
    setFormData({
      name: '',
      email: '',
      message: '',
      images: null
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, images: e.target.files }));
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      

      <div className="container mx-auto px-4 py-12">
        {/* Our Services Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About Us
            </h1>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Our Services
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📚</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Used Books</h3>
                  <p className="text-gray-600">
                    We offer a wide selection of high-quality used books at affordable prices,
                    from classic novels to self-development and science books.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">👗</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Used Clothing</h3>
                  <p className="text-gray-600">
                    Trendy and elegant women's clothing in excellent condition,
                    carefully selected to ensure quality and affordability.
                  </p>
                </div>
              </div>

              <div className="text-center bg-[#F5F1E8] p-6 rounded-xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We aim to recycle cultural and fashion items in a sustainable and eco-friendly way,
                  offering high-quality products at reasonable prices. We believe that beauty and knowledge
                  should be accessible to everyone, and we strive to create a community that values
                  second-hand items and gives them a second life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-emerald-500 text-white p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p className="text-lg opacity-90">We're here to answer your questions</p>
              </div>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Contact Info */}
                <div className="bg-[#F5F1E8] p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-emerald-500 rounded-full p-3">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <a 
                        href="mailto:TheHiddenHaul@gmail.com"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        TheHiddenHaul@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-800 mb-3">Working Hours</h4>
                    <p className="text-gray-600">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Friday - Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Upload Images (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="images"
                        />
                        <label
                          htmlFor="images"
                          className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-emerald-200 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors"
                        >
                          <Upload size={20} className="mr-2" />
                          <span>Select Images</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg py-3 rounded-lg"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">The Hidden Haul</h3>
              <p className="text-gray-300 leading-relaxed">
                Your trusted marketplace for second-hand books and clothing. 
                Promoting sustainability while helping you discover unique treasures.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/about" className="block text-emerald-400">About Us</a>
                <a href="/books" className="block text-gray-300 hover:text-emerald-400 transition-colors">Books</a>
                <a href="/clothes" className="block text-gray-300 hover:text-emerald-400 transition-colors">Clothes</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <a 
                href="mailto:TheHiddenHaul@gmail.com"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                TheHiddenHaul@gmail.com
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 The Hidden Haul. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;