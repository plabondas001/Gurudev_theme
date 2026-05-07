import React from 'react';

const UserReview = () => {
    return (
        <section className="mt-12 overflow-hidden rounded-3xl border bg-white shadow-xl shadow-gray-200/60 p-8 border-primary">
            <form className="space-y-6">
                <div>
                    <label htmlFor="product-review" className="mb-3 border-b-2 pb-2 block w-fit border-primary font-bold text-2xl text-gray-950">
                        Add Your Review
                    </label>
                    <textarea
                        id="product-review"
                        name="review"
                        rows={4}
                        placeholder="Example: Since I bought this a month ago, it has been used a lot. What I like best/what is worst about this product is ..."
                        className="min-h-24 w-full resize-y rounded-md border border-gray-200 bg-white px-5 py-4 text-sm leading-6 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label htmlFor="review-nickname" className="mb-3 block text-sm font-bold text-gray-950">
                            Name
                        </label>
                        <input
                            id="review-nickname"
                            name="nickname"
                            type="text"
                            placeholder="Example: bob27"
                            className="h-14 w-full rounded-md border border-gray-200 bg-white px-5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/15"
                        />
                    </div>

                    <div>
                        <label htmlFor="review-email" className="mb-3 block text-sm font-bold text-gray-950">
                            Email address
                        </label>
                        <input
                            id="review-email"
                            name="email"
                            type="email"
                            placeholder="Example: your@email.com"
                            className="h-14 w-full rounded-md border border-gray-200 bg-white px-5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/15"
                        />
                    </div>
                </div>

                <label className="flex items-start gap-3 text-sm font-semibold text-gray-950">
                    <input
                        type="checkbox"
                        name="terms"
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-200 text-primary focus:ring-primary"
                    />
                    <span>
                        I accept the{' '}
                        <a href="/terms" className="underline underline-offset-2 hover:text-primary">
                            terms and conditions
                        </a>
                    </span>
                </label>

                <p className="max-w-2xl text-sm font-medium leading-6 text-gray-950">
                    You will be able to receive emails in connection with this review (eg if others comment on your
                    review). All emails contain the option to unsubscribe. We can use the text and star rating from
                    your review in other marketing.
                </p>

                <button
                    type="submit"
                    className="rounded-md bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                >
                    Submit product review
                </button>
            </form>
        </section>
    );
};

export default UserReview;
