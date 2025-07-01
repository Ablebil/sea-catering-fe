import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I customize my meal plan?",
      answer:
        "Yes! All our meal plans can be customized based on your dietary preferences, allergies, and lifestyle needs. You can choose your preferred meal types and delivery days during the subscription process.",
    },
    {
      question: "How does delivery work?",
      answer:
        "We deliver fresh meals to your doorstep according to your selected schedule. You can choose delivery days that work best for you. Our delivery team ensures your meals arrive fresh and on time.",
    },
    {
      question: "What if I want to pause my subscription?",
      answer:
        "You can pause, modify, or cancel your subscription anytime through your dashboard with no additional fees. Simply log in to your account and manage your subscription settings.",
    },
    {
      question: "Are the ingredients organic?",
      answer:
        "We prioritize fresh, locally-sourced ingredients. Many of our ingredients are organic, and we clearly label all nutritional information for each meal plan.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and digital payment methods through our secure payment gateway powered by Midtrans.",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition duration-200 rounded-lg cursor-pointer"
            >
              <span className="font-semibold text-gray-900">
                {faq.question}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                  openFAQ === index ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {openFAQ === index && (
              <div className="px-6 pb-4 border-t border-gray-100">
                <p className="text-gray-700 pt-4">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
