import React, { use } from 'react';
import Honey from '../ProductHoney/Honey';

const LoadHoney = ({promiseHoney}) => {
    const data = use(promiseHoney)
    
    return (
        <div className='w-10/12 mx-auto'>
            <div className='flex items-center justify-between border-b mb-5'>
                <h1 className='font-bold text-2xl'>All Natural Honey</h1>
                <button className='font-bold text-sm underline underline-offset-4 text-orange-400 hover:text-black cursor-pointer'>VIEW ALL ITEMS</button>
            </div>
                <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                    {
                        data.map((allHoney,i) => <Honey key={i} honey={allHoney}></Honey>)
                    }
                </div>
        </div>
    );
};

export default LoadHoney;