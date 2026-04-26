import React, { use} from 'react';
import Honey from '../ProductHoney/Honey';
import Header from '../../Header/Header';
import { ArrowRight } from 'lucide-react';

const LoadHoney = ({promiseHoney,handleCart}) => {
    const data = use(promiseHoney)

    return (
        <div className='w-11/12 md:w-10/12 mx-auto'>
            <div className='flex items-center justify-between border-b mb-4 md:mb-5 py-3'>
                <h1 className='font-bold text-lg md:text-2xl'>All Products</h1>
                <button className='flex items-center gap-1 md:gap-2 font-bold text-xs md:text-sm text-[#31714f] cursor-pointer underline underline-offset-4 hover:text-black transition'>VIEW ALL
                    <ArrowRight size={16} className='hidden sm:block' />
                </button>
            </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5'>
                    {
                        data.map((allHoney,i) => <Honey handleCart={handleCart} key={i} honey={allHoney}></Honey>)
                    }
                </div>
        </div>
    );
};

export default LoadHoney;