import React, { useState } from 'react';
import { CARDS } from '../../constants/cards';

import "./HandCards.css";

const allowDrop = event => event.preventDefault();

const SETUP = 1;
const SELECTING = 2;
const SHORT_RESTING = 3;
const LONG_RESTING = 4;

let dragItem;
let dragSource;

const defaultSetup = {
    melee: CARDS.melee.map(card => card),
    ranged: CARDS.ranged.map(card => card),
    // hand: [...CARDS.melee.map(card => card), ...CARDS.ranged.map(card => card)],
    inPlayOne: [],
    inPlayTwo: [],
    discard: [],
    burned: [],
    notInPlay: [],
    toBeBurned: [],
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export const HandCards = (props) => {
    const existingSetup = window.localStorage.getItem("setup");

    const [cardZones, setCardZones] = useState(existingSetup ? JSON.parse(existingSetup) : defaultSetup);
    const [gameState, setGameState] = useState(SETUP);
    const [redrawn, setRedrawn] = useState(false);

    const Row = ({zone, isDragTarget = false, showTooltip = false, label = ""}) => (
        <div className="Hand-Row" { ...(isDragTarget ? {
            onDragOver: allowDrop,
            onDrop: () => completeDrag(zone)
        } : {})}>
            {label || zone}
            <div className="Hand-Row-dropCol">
                {cardZones[zone].map(card => (
                    <div key={card} className="Hand-card">
                        <img alt="card" draggable className="Hand-card-image" key={card} src={card} onDragStart={() => beginDrag(card, zone)} />
                        { showTooltip && <img alt="card" draggable className="Hand-card-tooltip" key={'tt'+card} src={card} onDragStart={() => beginDrag(card, zone)} /> }
                    </div>
                ))}
            </div>
        </div>
    )

    const beginDrag = (card, row) => {
        dragItem = card;
        dragSource = row;
    }

    const completeDrag = (dragTarget) => {
        if (dragSource && dragSource !== dragTarget) {
            setCardZones({
                ...cardZones,
                [dragSource]: cardZones[dragSource].filter(i => i !== dragItem),
                [dragTarget]: [...cardZones[dragTarget], dragItem]
            });
        }
    }

    const confirmSetup = () => {
        window.localStorage.setItem("setup", JSON.stringify(cardZones));
        setGameState(SELECTING);
    }

    const shortRest = () => {
        setGameState(SHORT_RESTING);
        burnRandom();
    }

    const longRest = () => {
        setGameState(LONG_RESTING);
    }

    const redraw = () => {
        burnRandom();
        setRedrawn(true);
    }

    const burnRandom = () => {
        const discard = [...cardZones.discard];
        const toBurn = getRandomInt(discard.length);
        const toBeBurned = discard.splice(toBurn, 1);
        discard.push(...cardZones.toBeBurned);

        setCardZones({
            ...cardZones,
            toBeBurned,
            discard,
        });
    }

    const finishRest = () => {
        setGameState(SELECTING);
        setRedrawn(false);

        const ranged = cardZones.discard.filter(i => CARDS.ranged.includes(i));
        const melee = cardZones.discard.filter(i => CARDS.melee.includes(i));

        setCardZones({
            ...cardZones,
            melee: [...cardZones.melee, ...melee],
            ranged: [...cardZones.ranged, ...ranged],
            burned: [...cardZones.burned, ...cardZones.toBeBurned],
            discard: [],
            toBeBurned: [],
        });
    }

    return (
        <div>
            <div className="Hand-wrapper">
                <Row zone='inPlayOne' isDragTarget />
                <Row zone='inPlayTwo' isDragTarget />
                <div className="Hand-buttonZone">
                    { gameState === SETUP && <button className="Hand-actionLink" disabled={!(cardZones.melee.length === 7 && cardZones.ranged.length === 7)} onClick={() => confirmSetup()}>Confirm Setup</button> }
                    { gameState === SELECTING && <button className="Hand-actionLink" disabled={!cardZones.discard.length} onClick={() => shortRest()}>Short Rest</button> }
                    { gameState === SELECTING && <button className="Hand-actionLink" disabled={!cardZones.discard.length} onClick={() => longRest()}>Long Rest</button> }
                    { (gameState === SHORT_RESTING || gameState === LONG_RESTING) && <button className="Hand-actionLink" disabled={!cardZones.toBeBurned.length} onClick={() => finishRest()}>Confirm Rest</button> }
                    { (gameState === SHORT_RESTING) && <button className="Hand-actionLink" disabled={redrawn} onClick={() => redraw()}>Redraw</button> }
                </div>
            </div>
            <div className="Hand-wrapper">
                <Row zone='melee' isDragTarget showTooltip />
                <Row zone='ranged' isDragTarget showTooltip />
                { gameState === SETUP && <Row zone='notInPlay' isDragTarget showTooltip /> }
                { gameState !== SETUP && <Row zone='discard' isDragTarget showTooltip /> }
                { gameState === SELECTING && <Row zone='burned' isDragTarget showTooltip /> }
                { (gameState === SHORT_RESTING || gameState === LONG_RESTING) && <Row zone='toBeBurned' isDragTarget showTooltip /> }
            </div>
        </div>
    )
}
