import React, { use} from 'react';
import Honey from '../ProductHoney/Honey';
import Header from '../../Header/Header';

const LoadHoney = ({promiseHoney,handleCart}) => {
    const data = use(promiseHoney)

    return (
        <div className='w-11/12 md:w-10/12 mx-auto'>
            <div className='flex items-center justify-between border-b mb-4 md:mb-5 py-3'>
                <h1 className='font-bold text-lg md:text-2xl'>All Natural Honey</h1>
                <button className='font-bold text-xs md:text-sm underline underline-offset-4 text-[#fc6313] hover:text-black cursor-pointer transition'>VIEW ALL</button>
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