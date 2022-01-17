import {Dropdown} from "react-bootstrap";
import React from "react";

export function Filter({ handleSelect }) {
    return (
        <Dropdown onSelect={handleSelect} className="m-3">
            <Dropdown.Toggle variant="secondary" style={{background: "#8d9db6", border: "none"}} id="dropdown-basic" className="filterbutton">
                Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="">All</Dropdown.Item>
                <Dropdown.Item eventKey="event">Event</Dropdown.Item>
                <Dropdown.Item eventKey="question">Question</Dropdown.Item>
                <Dropdown.Item eventKey="promotion">Promotion</Dropdown.Item>
                <Dropdown.Item eventKey="miscellaneous">Miscellaneous</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}