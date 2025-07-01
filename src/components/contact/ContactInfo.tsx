import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: "Phone",
      content: "08123456789",
      description: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: "Email",
      content: "info@seacatering.id",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: "Office",
      content: "Jakarta, Indonesia",
      description: "Visit us for a consultation",
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "Working Hours",
      content: "Mon - Fri: 8:00 AM - 6:00 PM",
      description: "Weekend support available",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-900 mb-6">Get in Touch</h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Whether you have questions about our meal plans, need help with your
        subscription, or want to provide feedback, our team is ready to assist
        you. Choose the most convenient way to reach us below.
      </p>

      <div className="space-y-6">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-green-100"
          >
            <div className="bg-green-100 text-green-600 rounded-full p-3 flex-shrink-0">
              {info.icon}
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-1">
                {info.title}
              </h3>
              <p className="text-gray-900 font-medium mb-1">{info.content}</p>
              <p className="text-sm text-gray-600">{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
