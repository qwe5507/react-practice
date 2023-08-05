import React, { Component } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router';
import NumberBaseball from "../03.숫자야구/NumberBaseballClass";
import RSP from "../05.가위바위보/RSPClass";
import Lotto from "../06.로또추첨기/LottoClass";

const GameMatcher = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // navigate(-1); 한 페이지 뒤로가기
    // navigate(-2); 두 페이지 뒤로가기
    let urlSearchParams = new URLSearchParams(location.search.slice(1)); // 쿼리스트링 추출
    console.log(location.search) // ?hello=asd
    console.log(urlSearchParams.get('hello'));
    console.log(urlSearchParams.get('name'));
    console.log(location);
    console.log(location.state); // testtest

    let test = () => {
        navigate('/game/number-baseball', {state: {test: 'testtest'}});
    }
    return (
        <>
            <Routes>
                <Route path="number-baseball" element={<NumberBaseball />} />
                <Route path="rock-scissors-paper" element={<RSP />} />
                <Route path="lotto-generator" element={<Lotto />} />
                <Route
                    path="*"
                    element={<div>
                        일치하는 게임이 없습니다.
                    </div>}
                />
            </Routes>
            <div onClick={test}>test</div>
        </>
    );
};

export default GameMatcher;