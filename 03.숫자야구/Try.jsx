import React, {memo, useState} from 'react';

const Try = memo(({ tryInfo }) => {
    const [result, setResult] = useState(tryInfo.result);
    console.log('try 재랜더링');

    const onClick = () => {
        setResult('1');
    };

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{result}</div>
        </li>
    )
});
Try.displayName='Try';

export default Try;