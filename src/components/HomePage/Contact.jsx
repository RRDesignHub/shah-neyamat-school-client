import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., sending the form data to an API or email)
    console.log(formData);
  };

  return (
    <section className="bg-green-50 py-8 lg:py-16" id="contact">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl md:text-4xl font-bold mb-2 text-green-800">
        আমাদের সাথে যোগাযোগ করুন
        </h2>
       <div className='divider mt-0 mb-2'></div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="max-sm:flex items-center gap-2 mb-6">
            <label htmlFor="name" className="block text-sm md:text-lg text-gray-800 mb-2">
              নাম
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-1 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="max-sm:flex items-center gap-2 mb-6">
            <label htmlFor="email" className="block text-sm md:text-lg text-gray-800 mb-2">
            ইমেইল
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-1 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="max-sm:flex gap-2 mb-6">
            <label
              htmlFor="message"
              className="block text-sm md:text-lg text-gray-800 mb-2"
            >
              বার্তা
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-1 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-sm max-sm:rounded-md py-1 md:btn bg-green-800 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            বার্তা পাঠান
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
