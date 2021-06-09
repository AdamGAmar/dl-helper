import React from 'react';
import './ColoursBar.css';
import { TECH_COLOURS } from '../../constants/techs';

const ColoursBar = ({ onColourChange }) => {
    return <span className="ColoursBar">
        {TECH_COLOURS.map((colour) => (
            <span key={colour} className={`ColoursBar-colour ColoursBar-colour--${colour}`} onClick={() => onColourChange(colour)} />
        ))}
    </span>
}

export default ColoursBar;
