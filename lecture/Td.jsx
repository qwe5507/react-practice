import React, {useCallback, useContext} from 'react';
import {CLICK_MINE, CODE, OPEN_CELL, TableContext} from "./MineSearch";

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            }
        case CODE.OPENED:
            return {
                background: 'white',
            }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            }
        default:
            return {
                background: 'white',
            }
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return '';
    }
};

const Td = ({rowIndex, cellIndex}) => {
    const {tableData, dispatch} = useContext(TableContext);

    const onClickTd = useCallback(() => {
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
                return;
        }
    }, []);

    const onRightClickTd = useCallback(() => {
        // TODO 여기부터
    }, []);

    return (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])}
        onClick={onClickTd}
        onContextMenu={onRightClickTd}
        >
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    )
};

export default Td;