import React, {useCallback, useState} from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
    const [showParagraph, setShowParagraph] = useState(false);

    console.log('APP RUNNING');

    // If we know, that the function should never change - we could store it with useCallback()
    // Dependencies are the same, as for useEffect() hook
    const toggleParagraphHandler = useCallback(() => {
        setShowParagraph((prevShowParagraph) => !prevShowParagraph);
        // Empty dependencies tells us that function should always be the same and never reevelaueted
    }, []);

    return (
        <div className="app">
            <h1>Hi there!</h1>
            {/*  React memo only works for primitive values, so if you use memo for DemoOutput with `false`
      than the memo will work, but if you use link to a func in Button - that will not work*/}
            <DemoOutput show={false}/>
            <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
        </div>
    );
}

export default App;
