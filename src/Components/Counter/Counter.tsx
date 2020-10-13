import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addCount, removeCount} from "../../Store/Actions/actions"
import {CountState} from "../../Store/Reducers/reducer"

function Counter () {
    
    const count = useSelector<CountState, CountState["count"]>((state) => state.count);
    const dispatch = useDispatch();
    return (
        <section>
            <div> Count: {count}</div>
            <button onClick={() => dispatch(addCount())}>ADD COUNT</button>
            <button onClick={() => dispatch(removeCount())}>REMOVE COUNT</button>

        </section>
    )
}

export default Counter;
