import React from 'react';
import { TECHS, createTechDefaults } from '../../constants/techs';
import ColoursBar from '../ColoursBar/ColoursBar';

import "./TechGrid.css";

const ROW_LABELS = {
    unsorted: "Unsorted",
    unavailable: "Unavailable",
    a: "Good",
    b: "OK",
    c: "Suboptimal",
    d: "Useless",
};

const allowDrop = event => event.preventDefault();

const Row = ({isDragTarget, label = "", leftComponent, rightComponent, onDragInto}) => (
    <div className="TechGrid-Row" { ...(isDragTarget ? {
        onDragOver: allowDrop,
        onDrop: onDragInto
    } : {})}>
        <div className="TechGrid-Row-dropCol" >{leftComponent}</div>
        <div className="TechGrid-Row-label">{label}</div>
        <div className="TechGrid-Row-dropCol">{rightComponent}</div>
    </div>
)

export class TechGrid extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedColours: {
                left: null,
                right: null
            },
            techSorting: createTechDefaults(),
            dragItem: -1
        }
    }

    setSelectedColour = (side, colour) => {
        this.setState({ 
            selectedColours: {
                ...this.state.selectedColours,
                [side]: colour
            }
        });
    }

    beginDrag = (index, row) => {
        this.setState({
            dragItem: index,
            dragSource: row
        });
    }

    completeDrag = (dragTarget) => {
        if (this.state.dragSource && this.state.dragSource !== dragTarget) {
            const techSorting = {
                ...this.state.techSorting,
                [this.state.dragSource]: this.state.techSorting[this.state.dragSource].filter(i => i !== this.state.dragItem),
                [dragTarget]: [...this.state.techSorting[dragTarget], this.state.dragItem]
            };

            this.setState({
                techSorting
            })
        }
    }

    render() {
        const rows = Object.entries(ROW_LABELS).map(([rowKey, rowLabel]) => {
            const leftTechs = TECHS.TIER3
                .reduce((filteredTechs, tech, index) => {
                    if (
                        tech.colours.includes(this.state.selectedColours.left) &&
                        this.state.techSorting[rowKey].includes(index)
                    ) {
                        const newTech = <img key={index} className="TechGrid-tech" src={tech.image} draggable={true} onDragStart={() => this.beginDrag(index, rowKey)} />;
                        return [...filteredTechs, newTech];
                    }
                    return filteredTechs;
                }, [])
            const rightTechs = TECHS.TIER3
                .reduce((filteredTechs, tech, index) => {
                    if (
                        tech.colours.includes(this.state.selectedColours.right) &&
                        this.state.techSorting[rowKey].includes(index)
                    ) {
                        const newTech = <img key={index} className="TechGrid-tech" src={tech.image} draggable={true} onDragStart={() => this.beginDrag(index, rowKey)} />;
                        return [...filteredTechs, newTech];
                    }
                    return filteredTechs;
                }, [])

            return <Row
                key={rowKey}
                isDragTarget={true}
                leftComponent={<>{leftTechs}</>}
                rightComponent={<>{rightTechs}</>}
                label={rowLabel}
                onDragInto={() => this.completeDrag(rowKey)}
            />;
        });


        return (
            <div>
                <Row
                    isDragTarget={false}
                    leftComponent={<ColoursBar onColourChange={(colour) => this.setSelectedColour("left", colour)} />}
                    rightComponent={<ColoursBar onColourChange={(colour) => this.setSelectedColour("right", colour)} />}
                    label={"Colours for comparison"}
                />
                {rows}
            </div>
        )
    }
}
