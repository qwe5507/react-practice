import React, { Component, createRef } from 'react';
import Try from './Try';
import TryClass from "./TryClass";

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseballClass extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1,3,5,7]
        tries: [], // push 쓰면 안 돼요
    };

    // 화살표 함수를 사용하지 않으면, 함수안에서 this를 사용하지 못한다.(엄격모드에서 undefined)
    // 그러면 constroctor를 사용해야 한다.(코드가 복잡해짐)
    // 왠만하면 화살표함수 (화살표 함수는 외부 this를 사용)
    onSubmitForm = (e) => {
        const { value, tries, answer } = this.state;
        e.preventDefault();
        if (value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런!' }],
                }
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
            this.inputRef.current.focus();
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { // 10번 이상 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                        value: '',
                    };
                });
                this.inputRef.current.focus();
            }
        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        });
    };

    // 클래스에서 Dom을 조작하기 위해 ref를 사용할 때는, creatRef()를 사용해도 되고 기존방식을 사용해도 된다.
    // createRef()를 사용하면, hooks의 useRef()와 비슷하게 current를 사용한다.
    inputRef = createRef(); // this.inputRef

    test = () => {
        this.setState({})
    }
    render() {
        console.log('NumberBaseballClass 재랜더링');
        const { result, value, tries } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
                </form>
                <div onClick={this.test}>시도: {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return (
                            <TryClass key={`${i + 1}차 시도 :`} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseballClass; // import NumberBaseball;