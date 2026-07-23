import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { apiCreateReview } from "../../../api/authApi";
import BasicRating from "./Rating";

const UserReview = ({ product, onReviewSubmitted }) => {
  const { isAuthenticated, getAccessToken } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setReviewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return toast.error("Please enter a review.");

    if (!isAuthenticated) {
      toast.info("Please sign in to submit a review.");
      navigate("/signin");
      return;
    }

    const token = getAccessToken();
    if (!token) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("product", product?.id);
      formData.append("rating", rating);
      formData.append("comment", reviewText.trim());
      formData.append("review", reviewText.trim());

      if (reviewImage) {
        formData.append("image", reviewImage);
      }

      const { ok, data } = await apiCreateReview(token, formData);

      if (ok) {
        toast.success("Review submitted successfully!");
        setReviewText("");
        setRating(5);
        if (onReviewSubmitted && data) {
          onReviewSubmitted(data);
        }
      } else {
        const msg =
          data?.detail ||
          data?.review?.[0] ||
          data?.non_field_errors?.[0] ||
          "Failed to submit review. Please try again.";
        toast.error(msg);
      }
    } catch {
      toast.error("An error occurred while submitting your review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 overflow-hidden rounded-3xl border bg-white shadow-xl shadow-gray-200/60 p-6 md:p-8 border-primary">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="product-review"
            className="mb-3 border-b-2 pb-2 block w-fit border-primary font-bold text-2xl text-gray-950"
          >
            Add Your Review
          </label>

          <h3 className="font-bold text-xl mt-6 text-gray-900">Overall Rating</h3>

          {/* Rating */}
          <BasicRating value={rating} setValue={setRating} />

          <textarea
            id="product-review"
            name="review"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share details of your experience with this product..."
            className="min-h-24 mt-4 w-full resize-y rounded-xl border border-gray-300 bg-white px-5 py-4 text-sm leading-6 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/15"
          />

          {/* Photo Upload Option */}
          <div className="mt-4">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Attach Photo (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer transition border border-gray-300">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <div className="relative w-14 h-14 rounded-xl border overflow-hidden shadow-sm">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setReviewImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl cursor-pointer bg-primary hover:bg-primary/90 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition duration-200 flex items-center gap-2 disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit Product Review"
          )}
        </button>
      </form>
    </section>
  );
};

export default UserReview;
