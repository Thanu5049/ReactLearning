import React from 'react';
import { ordered, restocked } from './icecreamSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
export const IcecreamView = () => {
    const numOfIcecreams = useSelector(state => state.icecream.numOfIcecreams)
    const dispatch = useDispatch();
    const [value, setValue] = useState(1);
    return (
        <div>
            <h2>Number of Icecreams -{numOfIcecreams} </h2>
            <button onClick={() => dispatch(ordered())}>Order Icecream</button>
            <input type='number' value={value} onChange={(e) => setValue(parseInt(e.target.value))} />
            <button onClick={() => dispatch(restocked(value))}>Restock Icecreams</button>
        </div>
    )
}