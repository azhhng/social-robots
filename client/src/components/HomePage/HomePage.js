import React, { useEffect } from 'react'
import './HomePage.css';
import dialogue from './dialogue.json';

function HomePage() {

    useEffect(() => {

        fetch('/get-checkpoint', {
            method: 'GET'
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                let box = document.getElementById('prompt-box1');

                if (data !== "0") {
                    box.value = "> To replay the game, press the Restart button. Otherwise the game will not function properly.";
                }
                else {
                    box.value = dialogueJSON.text;
                }
                box.style.height = "1px";
                box.style.height = box.scrollHeight + "px";
            });

        var slash_color = "#FF9D14";
        var bear_color = "#00E0A9";

        var user_variables = { "player_name": "NOTFOUND" };

        var dialogueJSON = dialogue;
        let box = document.getElementById('prompt-box1');

        let len = box.value.length;

        box.focus();
        box.setSelectionRange(len, len);

        // change color to match speaker
        if (dialogueJSON.speaker === "Slash") {
            box.style.color = slash_color;
        }

        else if (dialogueJSON.speaker === "Bear") {
            box.style.color = bear_color;
        }



        let playerRobot = document.getElementById('player-robot');
        let robotLines = playerRobot.children;

        for (let i = 0; i < robotLines.length; i++) {
            robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("E", "@");
            robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("B", "o");
            robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("M", "-");
            robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("Z", "/");
            robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("Y", "\\");
        }

        document.getElementById('prompt-box1').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();

                if ("input" === dialogueJSON.children[0].response) {
                    let questionBox = document.getElementById('question-box');
                    let responseBox = document.getElementById('response-box');

                    questionBox.style.display = "block";
                    questionBox.style.height = "1px";
                    questionBox.style.height = questionBox.scrollHeight + "px";

                    responseBox.style.display = "block";
                    responseBox.style.height = "1px";
                    responseBox.style.height = responseBox.scrollHeight + "px";

                    let userlen = responseBox.value.length;
                    responseBox.focus();
                    responseBox.setSelectionRange(userlen, userlen);

                    document.getElementById('response-box').addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            let responseBox = document.getElementById('response-box');

                            console.log(dialogueJSON.children[0].variable_name);
                            console.log(responseBox.value);

                            if (responseBox.value === "") {
                                responseBox.placeholder = "> I need an answer!";
                            }
                            else {
                                user_variables[dialogueJSON.children[0].variable_name] = responseBox.value;
                                let name = responseBox.value;
                                console.log(user_variables);

                                if (dialogueJSON.children[0].variable_name === "player_name") {
                                    fetch('/set-name', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ name }),
                                    })
                                        .then(response => {
                                            return response.text();
                                        })
                                        .then(data => {
                                            console.log(data);
                                        });
                                }

                                let box1 = document.getElementById('prompt-box1');
                                let box2 = document.getElementById('prompt-box2');
                                let box3 = document.getElementById('prompt-box3');

                                // change color and robot to match speaker
                                if (dialogueJSON.children[0].speaker === "Slash") {
                                    box1.style.color = slash_color;

                                    document.getElementById('slash').style.display = "block";
                                    document.getElementById('bear').style.display = "none";
                                }

                                else if (dialogueJSON.children[0].speaker === "Bear") {
                                    box1.style.color = bear_color;

                                    document.getElementById('slash').style.display = "none";
                                    document.getElementById('bear').style.display = "block";
                                }

                                box1.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]);
                                dialogueJSON = dialogueJSON.children[0];
                                box1.style.height = "1px";
                                box1.style.height = box1.scrollHeight + "px";

                                let len = box1.value.length;
                                box1.focus();
                                box1.setSelectionRange(len, len);

                                box2.value = "";
                                box2.style.display = "none";
                                box3.value = "";
                                box3.style.display = "none";

                                responseBox.style.display = "none";
                                questionBox.style.display = "none";
                            }
                        }
                    });
                }
                else if ("travel" === dialogueJSON.children[0].response) {
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
                            window.location.href = dialogueJSON.children[0].location;
                        });
                }

                else {
                    let box = document.getElementById('prompt-box2');
                    box.style.display = "inline-block";

                    // change color and robot to match speaker
                    if (dialogueJSON.children[0].speaker === "Slash") {
                        box.style.color = slash_color;

                        document.getElementById('slash').style.display = "block";
                        document.getElementById('bear').style.display = "none";
                    }

                    else if (dialogueJSON.children[0].speaker === "Bear") {
                        box.style.color = bear_color;

                        document.getElementById('slash').style.display = "none";
                        document.getElementById('bear').style.display = "block";
                    }

                    box.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]);
                    dialogueJSON = dialogueJSON.children[0];
                    box.style.height = "1px";
                    box.style.height = box.scrollHeight + "px";

                    let len = box.value.length;
                    box.focus();
                    box.setSelectionRange(len, len);
                }

            }
        });

        document.getElementById('prompt-box2').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();

                if ("input" === dialogueJSON.children[0].response) {
                    let questionBox = document.getElementById('question-box');
                    let responseBox = document.getElementById('response-box');

                    questionBox.style.display = "block";
                    questionBox.style.height = "1px";
                    questionBox.style.height = questionBox.scrollHeight + "px";

                    responseBox.style.display = "block";
                    responseBox.style.height = "1px";
                    responseBox.style.height = responseBox.scrollHeight + "px";

                    let userlen = responseBox.value.length;
                    responseBox.focus();
                    responseBox.setSelectionRange(userlen, userlen);

                    document.getElementById('response-box').addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            let responseBox = document.getElementById('response-box');

                            console.log(dialogueJSON.children[0].variable_name);
                            console.log(responseBox.value);

                            if (responseBox.value === "") {
                                responseBox.placeholder = "> I need an answer!";
                            }
                            else {
                                user_variables[dialogueJSON.children[0].variable_name] = responseBox.value;
                                console.log(user_variables);
                                let name = responseBox.value;
                                if (dialogueJSON.children[0].variable_name === "player_name") {
                                    fetch('/set-name', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ name }),
                                    })
                                        .then(response => {
                                            return response.text();
                                        })
                                        .then(data => {
                                            console.log(data);
                                        });
                                }
                                let box1 = document.getElementById('prompt-box1');
                                let box2 = document.getElementById('prompt-box2');
                                let box3 = document.getElementById('prompt-box3');

                                // change color and robot to match speaker
                                if (dialogueJSON.children[0].speaker === "Slash") {
                                    box1.style.color = slash_color;

                                    document.getElementById('slash').style.display = "block";
                                    document.getElementById('bear').style.display = "none";
                                }

                                else if (dialogueJSON.children[0].speaker === "Bear") {
                                    box1.style.color = bear_color;

                                    document.getElementById('slash').style.display = "none";
                                    document.getElementById('bear').style.display = "block";
                                }

                                box1.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]);
                                dialogueJSON = dialogueJSON.children[0];
                                box1.style.height = "1px";
                                box1.style.height = box1.scrollHeight + "px";

                                let len = box1.value.length;
                                box1.focus();
                                box1.setSelectionRange(len, len);

                                box2.value = "";
                                box2.style.display = "none";
                                box3.value = "";
                                box3.style.display = "none";

                                responseBox.value = "";
                                responseBox.placeholder = "> ";

                                responseBox.style.display = "none";
                                questionBox.style.display = "none";
                            }
                        }
                    });
                }
                else if ("travel" === dialogueJSON.children[0].response) {
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
                            window.location.href = dialogueJSON.children[0].location;
                        });
                }

                else {
                    let box = document.getElementById('prompt-box3');
                    box.style.display = "inline-block";

                    // change color and robot to match speaker
                    if (dialogueJSON.children[0].speaker === "Slash") {
                        box.style.color = slash_color;

                        document.getElementById('slash').style.display = "block";
                        document.getElementById('bear').style.display = "none";
                    }

                    else if (dialogueJSON.children[0].speaker === "Bear") {
                        box.style.color = bear_color;

                        document.getElementById('slash').style.display = "none";
                        document.getElementById('bear').style.display = "block";
                    }

                    box.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]);

                    dialogueJSON = dialogueJSON.children[0];
                    box.style.height = "1px";
                    box.style.height = box.scrollHeight + "px";

                    let len = box.value.length;
                    box.focus();
                    box.setSelectionRange(len, len);
                }
            }
        });

        document.getElementById('prompt-box3').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();

                if ("travel" === dialogueJSON.children[0].response) {
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
                            window.location.href = dialogueJSON.children[0].location;
                        });
                }

                let box1 = document.getElementById('prompt-box1');
                let box2 = document.getElementById('prompt-box2');
                let box3 = document.getElementById('prompt-box3');

                // change color and robot to match speaker
                if (dialogueJSON.children[0].speaker === "Slash") {
                    box1.style.color = slash_color;

                    document.getElementById('slash').style.display = "block";
                    document.getElementById('bear').style.display = "none";
                }

                else if (dialogueJSON.children[0].speaker === "Bear") {
                    box1.style.color = bear_color;

                    document.getElementById('slash').style.display = "none";
                    document.getElementById('bear').style.display = "block";
                }

                box1.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]);
                dialogueJSON = dialogueJSON.children[0];
                box1.style.height = "1px";
                box1.style.height = box1.scrollHeight + "px";

                let len = box1.value.length;
                box1.focus();
                box1.setSelectionRange(len, len);

                box2.value = "";
                box2.style.display = "none";
                box3.value = "";
                box3.style.display = "none";
            }
        });

        document.getElementById('prompt-box1').addEventListener('keydown', function (e) {
            if (e.key === "Backspace" || e.key === "Delete") {
                e.preventDefault();
            }
        })

        document.getElementById('prompt-box2').addEventListener('keydown', function (e) {
            if (e.key === "Backspace" || e.key === "Delete") {
                e.preventDefault();
            }
        })

        document.getElementById('prompt-box3').addEventListener('keydown', function (e) {
            if (e.key === "Backspace" || e.key === "Delete") {
                e.preventDefault();
            }
        })

        document.getElementById('question-box').addEventListener('keydown', function (e) {
            if (e.key === "Backspace" || e.key === "Delete") {
                e.preventDefault();
            }
        })
    })
    const resetCheckpoint = () => {

        fetch('/set-checkpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checkpoint: 0 }),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log("check point reset")
                console.log(data)

                fetch('/set-robot-appearance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ eyeSymbol: "E", bodySymbol: "B", armsSymbol: "A", legsSymbol: "L" }),
                })
                    .then(response => {
                        return response.text();
                    })
                    .then(data => {
                        window.location.reload();
                    });
            });


    }

    return (

        <div className="homepage-container">
            <div className="slasher-robot" id="slash">
                <h3>\\\\\\\\\\\\\\\\\\\</h3>
                <h3>\&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;\</h3>
                <h3>\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\</h3>
                <h3>\\\\\\\\\\\\\\\\\\\</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;\\\\\\\\\\\</h3>
                <h3>&nbsp;&nbsp;&nbsp;(\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\)</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;\\\\\\\\\\\</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~~</h3>
            </div>
            <div className="bear-robot" id="bear" style={{ display: "none" }}>
                <h3>&nbsp;_________________</h3>
                <h3>ʕ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ʔ</h3>
                <h3>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>|&nbsp;&nbsp;&nbsp;&nbsp;U&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;U&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ᴥ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>-------------------</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▿</h3>
                <h3>&nbsp;-----------------</h3>
                <h3>c|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|っ</h3>
                <h3>&nbsp;-----------------</h3>
                <h3>&nbsp;&nbsp;&nbsp;ω&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ω</h3>
            </div>
            <div className="dialogue-box">
                <textarea className="NPC-box" id="prompt-box1" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box2" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box3" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="user-box" style={{ display: "none" }} id="question-box" spellCheck="false" defaultValue='Type your name below and press enter.'></textarea>
                <textarea className="user-box" style={{ display: "none" }} id="response-box" spellCheck="false" placeholder='> '></textarea>
            </div>
            <div className="player-robot" style={{ display: "none" }} id="player-robot">
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B</h3>
                <h3> B&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;B</h3>
                <h3> B&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;&nbsp;&nbsp;&nbsp;B</h3>
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x</h3>
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> ZB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BY</h3>
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> &nbsp;&nbsp;L&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L</h3>
            </div>
            <button onClick={() => resetCheckpoint()}>Restart Game</button>
        </div >
    )
}

export default HomePage
