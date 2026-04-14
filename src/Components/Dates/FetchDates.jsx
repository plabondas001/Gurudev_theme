import React, { Suspense } from 'react';
import LoadDates from './LoadDates';

const fetchDates = async () => {
    const res = await fetch("/public/Json/Dates/dates.json")
    return res.json()
}

const FetchDates = () => {

    const promise = fetchDates()
    return (
        <div>
            <Suspense>
                <LoadDates promise={promise}></LoadDates>
            </Suspense>
        </div>
    );
};

export default FetchDates;