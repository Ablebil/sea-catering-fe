import { ContactInfo, ContactForm } from "../components";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our meal plans or need support? We're here to
            help! Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
