import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

interface TestimonialFormProps {
  onSubmit: (formData: FormData) => void;
  isSubmitting: boolean;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!imageFile) {
      setError("Image is required.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    if (rating > 0) formData.append("rating", String(rating));
    formData.append("photo", imageFile);

    onSubmit(formData);

    setName("");
    setMessage("");
    setRating(0);
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h3 className="text-xl font-semibold text-green-800">Leave a Review</h3>

      {error && (
        <p className="text-red-600 font-medium text-sm -mt-2">{error}</p>
      )}

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full border rounded px-3 py-2"
      />

      <div>
        <label className="block mb-1 font-medium">Rating:</label>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              onClick={() => setRating(i + 1)}
              className={`w-6 h-6 cursor-pointer transition ${
                i < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Upload Image:</label>
        <label className="inline-block bg-gray-100 border border-gray-300 rounded px-4 py-2 cursor-pointer text-sm hover:bg-gray-200 transition">
          Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 h-32 object-cover rounded"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded cursor-pointer"
      >
        {isSubmitting ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
};

export default TestimonialForm;
