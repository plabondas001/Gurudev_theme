import React from "react";
import { MdOutlineStarOutline } from "react-icons/md";

const UserReview = () => {
  return (
    <section className="mt-12 overflow-hidden rounded-3xl border bg-white shadow-xl shadow-gray-200/60 p-8 border-primary">
      <form className="space-y-6">
        <div>
          <label
            htmlFor="product-review"
            className="mb-3 border-b-2 pb-2 block w-fit border-primary font-bold text-2xl text-gray-950"
          >
            Add Your Review
          </label>

          <h1 className="font-bold text-2xl mt-8">Overall Rating</h1>

          {/* rating */}
          <div className="rating">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-yellow-300"
              aria-label="1 star"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-yellow-300"
              aria-label="2 star"
              defaultChecked
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-yellow-300"
              aria-label="3 star"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-yellow-300"
              aria-label="4 star"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-yellow-300"
              aria-label="5 star"
            />
          </div>

          <textarea
            id="product-review"
            name="review"
            rows={4}
            placeholder="Example: Since I bought this a month ago, it has been used a lot. What I like best/what is worst about this product is ..."
            className="min-h-24 mt-8 w-full resize-y rounded-md border border-gray-200 bg-white px-5 py-4 text-sm leading-6 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <button
          type="submit"
          className="rounded-md cursor-pointer bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
        >
          Submit product review
        </button>
      </form>
    </section>
  );
};

export default UserReview;
