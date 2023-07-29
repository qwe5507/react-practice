import React, { useState, useEffect, useReducer, useCallback } from 'react';
import Table from "./Table";

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

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
                recentCell: [action.row, action.cell],
            };
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                recentCell: [-1, -1],
            };
        }
        default:
            return state;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('o');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O' });
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로줄 검사
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { //새로 줄 검사
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선 검사
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 대각선 검사
            win = true;
        }
        if (win) { // 승리시
            dispatch({ type: SET_WINNER, winner: turn}) // 현재 턴인 사람이 승리자
            dispatch({ type: RESET_GAME });
        } else {
            // 무승부 검사
            let all = true;
            tableData.forEach((row) => { // 칸이 다 차있는지 검사
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: SET_WINNER, winner: null});
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;