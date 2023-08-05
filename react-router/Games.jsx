import React from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import GameMatcher from "./GameMatcher";

const Games = () => {

    return (
        <BrowserRouter>
            <Link to="/game/number-baseball?hello=asd">숫자야구</Link>
            &nbsp;
            <Link to="/game/rock-scissors-paper">가위바위보</Link>
            &nbsp;
            <Link to="/game/lotto-generator">로또생성기</Link>
            <div>
                <Routes>
                    <Route path="/" element={<GameMatcher/>}></Route>
                    <Route path="/game/*" element={<GameMatcher/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
};

export default Games;