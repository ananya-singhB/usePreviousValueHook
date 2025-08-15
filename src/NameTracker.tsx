import React, { useState } from 'react';
import usePreviousValue from './hooks/usePrevious';

const NameTracker: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [submittedName, setSubmittedName] = useState('');
    const [previousName, setPreviousName] = usePreviousValue<string>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPreviousName(submittedName);
        setSubmittedName(inputValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val != submittedName) {
            setInputValue(val)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
                id="name"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Your name"
            />

            <button type="submit">Submit</button>

            <p>Current name: {submittedName || 'N/A'}</p>
            <p>Previous name: {previousName || 'N/A'}</p>
        </form>
    );
};

export default NameTracker;
