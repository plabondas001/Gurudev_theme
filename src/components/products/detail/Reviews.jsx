import React from 'react';
import { FaStar } from 'react-icons/fa';

const Reviews = ({ product }) => {
    const reviews = product?.reviews || [];
    const rating = Number(product?.rating || 0);
    const reviewCount = product?.reviews_count || reviews.length;
    const roundedRating = rating.toFixed(1);

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
                        {reviews.map((review, index) => (
                            <article
                                key={`review-${index}`}
                                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                            >
                                <div className="flex items-start gap-4">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="h-14 w-14 shrink-0 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-gray-100"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <h3 className="truncate text-base font-bold text-gray-900">
                                                    {review.name}
                                                </h3>
                                                {review.role && (
                                                    <p className="mt-0.5 text-sm font-medium text-gray-500">
                                                        {review.role}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex shrink-0 items-center gap-0.5 text-primary">
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <FaStar key={starIndex} size={13} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm leading-6 text-gray-600">
                                            {review.review}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
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
        </section>
    );
};

export default Reviews;
