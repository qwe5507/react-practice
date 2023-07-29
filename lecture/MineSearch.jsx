import React, { useReducer, createContext } from 'react';
import Table from "./Table";
import Form from "./Form";

const TableContext = createContext();

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <Form></Form>
            <div>{state.timer}</div>
            <Table></Table>
            <div>{state.result}</div>
        </>
    )
};

export default MineSearch;