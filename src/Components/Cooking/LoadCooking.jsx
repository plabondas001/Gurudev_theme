import { ArrowRight } from 'lucide-react';
import React, { use } from 'react';
import Cooking from './Cooking';

const LoadCooking = ({ promise, handleCart }) => {
    const data = use(promise)
    return (
        <div className='w-11/12 md:w-10/12 mx-auto mt-6 md:mt-10'>
            <div className='flex items-center justify-between border-b mb-3 md:mb-4 py-3'>
                <h1 className='font-bold text-lg md:text-2xl'>Cooking Essentials</h1>
                <button className='flex items-center gap-1 md:gap-2 font-bold text-xs md:text-sm text-orange-400 cursor-pointer underline underline-offset-4 hover:text-black transition'>VIEW ALL
                    <ArrowRight size={16} className='hidden sm:block' />
                </button>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 mt-4 md:mt-5'>
                {
                    data.map((cook,i) => <Cooking key={i} cook={cook} handleCart={handleCart}></Cooking>)
                }
            </div>
        </div>
    );
};

export default LoadCooking;