import React, { useEffect } from 'react'
import './RobotFactory.css';

function RobotFactory() {
    var eyeSymbol = "E";
    var bodySymbol = "B";
    var armsSymbol = "A";
    var legsSymbol = "L";
    var user_variables = {};

    useEffect(() => {
        fetch('/get-name', {
            method: 'GET'
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                user_variables["player_name"] = data.replaceAll("\"", "");
                console.log("name is " + user_variables["player_name"]);
            });

        fetch('/get-checkpoint', {
            method: 'GET'
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log(data)
            });

        let dialogueBox = document.getElementById('dialogue-box');
        let textAreas = dialogueBox.children;

        for (let i = 0; i < textAreas.length; i++) {
            textAreas[i].style.height = "1px";
            textAreas[i].style.height = textAreas[i].scrollHeight + "px";
        }
    })

    const check = () => {
        let robotLines = document.getElementById('player-robot').children;

        var eye = document.getElementById(`eyes-response-box`).value;
        var body = document.getElementById(`body-response-box`).value;
        var arms = document.getElementById(`arms-response-box`).value;
        var legs = document.getElementById(`legs-response-box`).value;

        if (eye === body || eye === arms || eye === legs || body === arms || body === legs || arms === legs) {
            document.getElementById(`prompt-box1`).value = "> Symbols must be unique from one another."

            document.getElementById(`eyes-response-box`).value = "";
            document.getElementById(`body-response-box`).value = "";
            document.getElementById(`arms-response-box`).value = "";
            document.getElementById(`legs-response-box`).value = "";
        }

        else {
            document.getElementById(`prompt-box1`).value = "> Hmm, not bad."
            for (let i = 0; i < robotLines.length; i++) {
                console.log(robotLines[i].textContent)
                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll(eyeSymbol, eye);
                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll(bodySymbol, body);
                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll(armsSymbol, arms);
                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll(legsSymbol, legs);
            }

            eyeSymbol = eye;
            bodySymbol = body;
            armsSymbol = arms;
            legsSymbol = legs;
        }

    }

    const done = () => {
        // send the eyeSymbol, bodySymbol, armsSymbol and legsSymbol
        // then advance player checkpoint
        // then move onto next page

        var eye = document.getElementById(`eyes-response-box`).value;
        var body = document.getElementById(`body-response-box`).value;
        var arms = document.getElementById(`arms-response-box`).value;
        var legs = document.getElementById(`legs-response-box`).value;

        eyeSymbol = eye;
        bodySymbol = body;
        armsSymbol = arms;
        legsSymbol = legs;

        if (eye === "") {
            eyeSymbol = "E"
        }

        if (body === "") {
            bodySymbol = "B"
        }

        if (arms === "") {
            armsSymbol = "A"
        }

        if (legs === "") {
            legsSymbol = "L"
        }

        fetch('/set-robot-appearance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eyeSymbol, bodySymbol, armsSymbol, legsSymbol }),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log(data)
                console.log({ eyeSymbol, bodySymbol, armsSymbol, legsSymbol })
                fetch('/advance-checkpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                })
                    .then(response => {
                        return response.text();
                    })
                    .then(data => {
                        window.location.href = "/factory-entrance"
                    });
            });
    }

    return (
        <div className="factory-container">
            <div className="factory-robot" id="jagger">
                <h3>VVVVVVVVVVVVVVVVVVV</h3>
                <h3>V&nbsp;&nbsp;&nbsp;&nbsp;◑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◑&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>V&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;︵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>VVVVVVVVVVVVVVVVVVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>&nbsp;VVVVVVVVVVVVVVVVV</h3>
                <h3>/V&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V/</h3>
                <h3>&nbsp;VVVVVVVVVVVVVVVVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;T</h3>
            </div>
            <div className="happy-robot" id="fake-jagger" style={{ display: "none" }}>
                <h3>VVVVVVVVVVVVVVVVVVV</h3>
                <h3>V&nbsp;&nbsp;&nbsp;&nbsp;◑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◑&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>V&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;︵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>VVVVVVVVVVVVVVVVVVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;VVVVVVVVVVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;/V&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V/</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;VVVVVVVVVVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--</h3>
            </div>
            <div className="player-robot" id="player-robot">
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B</h3>
                <h3> B&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;B</h3>
                <h3> B&nbsp;&nbsp;&nbsp;&nbsp;ヮ&nbsp;&nbsp;&nbsp;B</h3>
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x</h3>
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> AB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BA</h3>
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> &nbsp;&nbsp;L&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L</h3>
            </div>
            <div className="dialogue-box" id="dialogue-box">
                <textarea className="NPC-box" id="prompt-box1" maxLength="1" spellCheck="false" defaultValue="> Go ahead and set their appearance, click 'Check' to check the robot's appearance so far and 'Done' when you're done."></textarea>

                <textarea className="user-box" readOnly id="eyes-box" value='> Type a symbol for what the eyes should look like.'></textarea>
                <textarea className="response-box" maxLength="1" id="eyes-response-box" spellCheck="false" placeholder='> '></textarea>

                <textarea className="user-box" readOnly id="body-box" value='> Type a symbol for what the body should look like.'></textarea>
                <textarea className="response-box" maxLength="1" id="body-response-box" spellCheck="false" placeholder='> '></textarea>

                <textarea className="user-box" readOnly id="arms-box" value='> Type a symbol for what the arms should look like.'></textarea>
                <textarea className="response-box" maxLength="1" id="arms-response-box" spellCheck="false" placeholder='> '></textarea>

                <textarea className="user-box" id="legs-box" readOnly value='> Type a symbol for what the legs should look like.'></textarea>
                <textarea className="response-box" maxLength="1" id="legs-response-box" spellCheck="false" placeholder='> '></textarea>
            </div>
            <button id="check-button" onClick={() => check()}>Check</button>
            <button id="done-button" onClick={() => done()}>Done</button>
        </div >
    )
}

export default RobotFactory
