import React, { Suspense } from 'react';
import LoadCooking from './LoadCooking';

const fetchCook = async () => {
    const res = await fetch("/public/Json/Cooking/cooking.json")
    return res.json()
}
const FetchCooking = () => {

    const promise = fetchCook()
    return (
        <div>
            <Suspense>
                <LoadCooking promise={promise}></LoadCooking>
            </Suspense>
        </div>
    );
};

export default FetchCooking;