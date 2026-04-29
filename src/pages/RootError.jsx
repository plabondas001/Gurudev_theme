import React from 'react';
import { useRouteError, Link } from 'react-router';
import { AlertCircle, Home } from 'lucide-react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const RootError = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-orange-50 p-6 rounded-full mb-6">
                    <AlertCircle className="text-orange-500" size={48} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {error.status === 404 ? "Page Not Found" : "Oops! Something went wrong"}
                </h1>
                <p className="text-gray-600 max-w-md mb-8">
                    {error.statusText || error.message || "We apologize for the inconvenience. Our team has been notified and we're working to fix the issue."}
                </p>
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all transform hover:scale-105"
                >
                    <Home size={20} />
                    Back to Homepage
                </Link>
            </main>
            <Footer />
        </div>
    );
};

export default RootError;
