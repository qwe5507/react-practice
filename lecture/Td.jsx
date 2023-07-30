import React, {useCallback, useContext} from 'react';
import {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext} from "./MineSearch";

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            }
        case CODE.CLICKED_MINE:
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
            return code || '';
    }
};

const Td = ({rowIndex, cellIndex}) => {
    const {tableData, dispatch, halted} = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION: // 클릭안됨
                return;
            case CODE.NORMAL:
                dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    // 마우스 우클릭 시 발생하는 이벤트
    //오른쪽 클릭 시 메뉴 뜨는거 방지
    const onRightClickTd = useCallback((e) => {
        if (halted) {
            return;
        }

        e.preventDefault();

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type:FLAG_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({type:QUESTION_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({type:NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }

    }, [tableData[rowIndex][cellIndex], halted]);

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