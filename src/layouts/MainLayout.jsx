import { Outlet } from 'react-router';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Brands from '../Components/brands/Brands';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default MainLayout;
