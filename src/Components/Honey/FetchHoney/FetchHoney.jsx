import React, { Suspense } from 'react';
import LoadHoney from '../LoadHoney/LoadHoney';

const fetchHoney = async () => {
    const res = await fetch("/public/Json/Honey/Honey.json")
    return res.json()
}

const FetchHoney = () => {
    const promiseHoney = fetchHoney()
    return (
        <div>
            <Suspense fallback={"Loading..."}>
                <LoadHoney promiseHoney={promiseHoney}></LoadHoney>
            </Suspense>
        </div>
    );
};

export default FetchHoney;