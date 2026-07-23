import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Maximize2 } from 'lucide-react';

const Reviews = ({ product }) => {
    const reviews = product?.reviews || [];
    const rating = Number(product?.rating || 0);
    const reviewCount = product?.reviews_count || reviews.length;
    const roundedRating = rating.toFixed(1);
    const [selectedModalImage, setSelectedModalImage] = useState(null);

    return (
        <section className="mt-12 overflow-hidden rounded-3xl border bg-white shadow-xl shadow-gray-200/60 border-primary">
            <div className="flex flex-col gap-6 border-b border-gray-100 bg-gray-50/70 p-6 md:flex-row md:items-center md:justify-between md:p-8">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl border-b-2 pb-2 border-primary w-fit">
                        Customer Reviews
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                        Real experiences from customers who used this product.
                    </p>
                </div>

                <div className="w-full rounded-2xl border border-primary/10 bg-white p-5 shadow-sm md:w-auto md:min-w-56">
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black leading-none text-gray-900">
                            {roundedRating}
                        </span>
                        <span className="pb-1 text-sm font-semibold text-gray-500">/ 5</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-primary">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                size={16}
                                className={index < Math.round(rating) ? 'text-primary' : 'text-gray-300'}
                            />
                        ))}
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                        Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                    </p>
                </div>
            </div>

            <div className="p-6 md:p-8">
                {reviews.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2">
                        {reviews.map((review, index) => {
                            const name = review.customer_name || review.name || review.user_name || review.user?.full_name || "Verified Customer";
                            const commentText = review.comment || review.review || review.text || review.content || "";
                            let avatar = review.customer_avatar || review.user?.avatar || null;

                            if (avatar && typeof avatar === "string" && avatar.startsWith("/")) {
                                avatar = `http://localhost:8002${avatar}`;
                            }

                            const reviewRating = Number(review.rating || 5);
                            const initial = name ? name.charAt(0).toUpperCase() : "U";

                            // Collect attached product photos if present
                            const reviewImages = [];
                            if (Array.isArray(review.images) && review.images.length > 0) {
                                review.images.forEach((imgObj) => {
                                    let url = typeof imgObj === "string" ? imgObj : imgObj?.image;
                                    if (url) {
                                        if (url.startsWith("/")) url = `http://localhost:8002${url}`;
                                        reviewImages.push(url);
                                    }
                                });
                            } else if (review.image && typeof review.image === "string" && !review.image.includes("avatar")) {
                                let url = review.image;
                                if (url.startsWith("/")) url = `http://localhost:8002${url}`;
                                reviewImages.push(url);
                            }

                            return (
                                <article
                                    key={review.id || `review-${index}`}
                                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                                >
                                    <div className="flex items-start gap-4">
                                        {avatar ? (
                                            <img
                                                src={avatar}
                                                alt={name}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                                                }}
                                                className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-gray-100"
                                            />
                                        ) : null}

                                        {/* Avatar Fallback Circle */}
                                        <div className={`h-12 w-12 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-lg border-2 border-white shadow-md ring-1 ring-gray-100 ${avatar ? "hidden" : ""}`}>
                                            {initial}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <h3 className="truncate text-base font-bold text-gray-900">
                                                        {name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 font-medium">
                                                        {review.created_at ? new Date(review.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Verified Buyer"}
                                                    </p>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-0.5 text-primary">
                                                    {[...Array(5)].map((_, starIndex) => (
                                                        <FaStar
                                                            key={starIndex}
                                                            size={14}
                                                            className={starIndex < Math.round(reviewRating) ? "text-primary" : "text-gray-300"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Body: Left Image Thumbnails, Right Review Text */}
                                            <div className="mt-4 flex flex-wrap sm:flex-nowrap items-start gap-4">
                                                {/* Left: Attached Review Photos */}
                                                {reviewImages.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 shrink-0">
                                                        {reviewImages.map((imgUrl, i) => (
                                                            <div
                                                                key={i}
                                                                onClick={() => setSelectedModalImage(imgUrl)}
                                                                className="relative group cursor-pointer overflow-hidden rounded-xl border border-gray-200 shadow-sm"
                                                            >
                                                                <img
                                                                    src={imgUrl}
                                                                    alt="Review attachment"
                                                                    className="w-20 h-20 object-cover transition-transform duration-200 group-hover:scale-105"
                                                                />
                                                                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                                                    <Maximize2 size={16} />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Right: Actual Review Text */}
                                                <div className="flex-1 min-w-0">
                                                    {commentText.trim() ? (
                                                        <p className="text-sm leading-relaxed text-gray-800 font-medium">
                                                            {commentText}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                        <h3 className="text-lg font-bold text-gray-900">No reviews yet</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Customer reviews will appear here once buyers share their feedback.
                        </p>
                    </div>
                )}
            </div>

            {/* Modal for full screen review image preview */}
            {selectedModalImage && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setSelectedModalImage(null)}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedModalImage(null)}
                        className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-gray-300 transition-colors cursor-pointer"
                        aria-label="Close image preview"
                    >
                        ✕
                    </button>
                    <img
                        src={selectedModalImage}
                        alt="Review attachment preview"
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl bg-white p-2"
                    />
                </div>
            )}
        </section>
    );
};

export default Reviews;
