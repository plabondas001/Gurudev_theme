import { ArrowRight } from 'lucide-react';
import React, { use } from 'react';
import Cooking from './Cooking';

const LoadCooking = ({ promise, handleCart }) => {
    const data = use(promise)
    return (
        <div className='w-10/12 mx-auto mt-10'>
            <div className='flex items-center justify-between border-b mb-3'>
                <h1 className='font-bold text-2xl'>Cooking Essentials</h1>
                <button className='flex items-center gap-2 font-bold text-sm text-orange-400 cursor-pointer underline underline-offset-4 hover:text-black'>VIEW ALL ITEMS
                    <ArrowRight size={20} />
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-5 gap-3 mt-5'>
                {
                    data.map((cook,i) => <Cooking key={i} cook={cook} handleCart={handleCart}></Cooking>)
                }
            </div>
        </div>
    );
};

export default LoadCooking;