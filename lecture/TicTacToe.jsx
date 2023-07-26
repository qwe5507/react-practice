import React, { useState, useReducer, useCallback } from 'react';
import Table from "./Table";

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

const reducer = (state, action) => { // state를 어떻게 변경할지 작성
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 직접 변경하면 안된다.
            return { // setState처럼 새로운 객체를 리턴해야 함
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL:
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결, 불변성을 위해 tr도 스프레드 문법으로 새로 생성 해줘야 함
            tableData[action.row][action.cell] = state.turn; // 현재 turn이 O 또는 X은 값이 cell에 들어감
            return {
                ...state,
                tableData: tableData,
            };
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('o');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;