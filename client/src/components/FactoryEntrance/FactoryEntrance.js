import React, { useEffect } from 'react'
import './FactoryEntrance.css'
import dialogue from './entranceDialogue.json';
import dialogue2 from './entrance2Dialogue.json';
import dialogue3 from './entrance3Dialogue.json';

function FactoryEntrance() {

    useEffect(() => {
        var user_variables = { player_name: "NOTFOUND" };
        var dialogueJSON = dialogue;
        var checkpoint = 0;
        // test this
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
                checkpoint = parseInt(data);
                if (checkpoint === 1) {
                    box.style.color = bear_color;
                    box.style.textAlign = "left";
                }

                else if (checkpoint === 3) {
                    dialogueJSON = dialogue3;

                    box.style.color = jagger_color;
                    box.style.textAlign = "left";
                    document.getElementById('bear').style.display = "none";
                    document.getElementById('player-robot').style.display = "block";
                    fetch('/get-robot-appearance', {
                        method: 'GET'
                    })
                        .then(response => {
                            return response.text();
                        })
                        .then(data => {
                            console.log(data)
                            let robotLines = document.getElementById('player-robot').children;

                            var eye = data[2]
                            var body = data[6]
                            var arms = data[10]
                            var legs = data[14]

                            for (let i = 0; i < robotLines.length; i++) {
                                console.log(robotLines[i].textContent)
                                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("E", eye);
                                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("B", body);
                                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("A", arms);
                                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("L", legs);

                            }

                        });
                }

                else if (checkpoint === 5) {
                    dialogueJSON = dialogue2;

                    box.style.color = jagger_color;
                    box.style.textAlign = "left";
                    document.getElementById('bear').style.display = "none";
                    document.getElementById('jagger').style.display = "none";
                    document.getElementById('fake-jagger').style.display = "block";
                    document.getElementById('player-robot').style.display = "block";

                    fetch('/get-robot-appearance', {
                        method: 'GET'
                    })
                        .then(response => {
                            return response.text();
                        })
                        .then(data => {
                            console.log(data)
                            let robotLines = document.getElementById('player-robot').children;

                            var eye = data[2]
                            var body = data[6]
                            var arms = data[10]
                            var legs = data[14]

                            for (let i = 0; i < robotLines.length; i++) {
                                console.log(robotLines[i].textContent)
                                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("E", eye);
                                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("B", body);
                                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("A", arms);
                                robotLines[i].textContent = String(robotLines[i].textContent).replaceAll("L", legs);
                            }

                        });
                }

                console.log("check point is " + checkpoint)
                box.value = dialogueJSON.text.replace("player_name", user_variables.player_name);
                box.style.height = "1px";
                box.style.height = box.scrollHeight + "px";
            });

        var jagger_color = "#B0AA68";
        var player_color = "#fff";
        var bear_color = "#00E0A9";
        var developer_color = "#F0280F";
        var robot_color = "#da73ff";

        let box = document.getElementById('prompt-box1');
        let len = box.value.length;

        box.focus();
        box.setSelectionRange(len, len);

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

                                if (dialogueJSON.children[0].variable_name === "robot_name") {
                                    fetch('/set-robot-name', {
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
                                            console.log("done setting name")
                                        });
                                }

                                let box1 = document.getElementById('prompt-box1');
                                let box2 = document.getElementById('prompt-box2');
                                let box3 = document.getElementById('prompt-box3');

                                // change color and robot to match speaker
                                if (dialogueJSON.children[0].speaker === "Jagger") {
                                    box1.style.color = jagger_color;
                                    box1.style.textAlign = "left";

                                }

                                else if (dialogueJSON.children[0].speaker === "Bear") {
                                    box1.style.color = bear_color;
                                    box1.style.textAlign = "left";

                                }

                                else if (dialogueJSON.children[0].speaker === "Player") {
                                    box1.style.color = player_color;
                                    box1.style.textAlign = "right";

                                }

                                else if (dialogueJSON.children[0].speaker === "Developer") {
                                    box1.style.color = developer_color;
                                    box1.style.textAlign = "center";
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
                    // change color to match speaker
                    if (dialogueJSON.children[0].speaker === "Jagger") {
                        box.style.color = jagger_color;
                        box.style.textAlign = "left";

                    }

                    else if (dialogueJSON.children[0].speaker === "Bear") {
                        box.style.color = bear_color;
                        box.style.textAlign = "left";

                    }

                    else if (dialogueJSON.children[0].speaker === "Player") {
                        box.style.color = player_color;
                        box.style.textAlign = "right";

                    }

                    else if (dialogueJSON.children[0].speaker === "Developer") {
                        box.style.color = developer_color;
                        box.style.textAlign = "center";
                    }

                    else if (dialogueJSON.speaker === "Robot") {
                        box.style.color = robot_color;
                        box.style.textAlign = "left";
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
                                let name = responseBox.value;
                                console.log(user_variables);

                                if (dialogueJSON.children[0].variable_name === "robot_name") {
                                    fetch('/set-robot-name', {
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
                                            console.log("done setting name")
                                        });
                                }

                                let box1 = document.getElementById('prompt-box1');
                                let box2 = document.getElementById('prompt-box2');
                                let box3 = document.getElementById('prompt-box3');

                                // change color and robot to match speaker
                                // change color to match speaker
                                if (dialogueJSON.children[0].speaker === "Jagger") {
                                    box1.style.color = jagger_color;
                                    box1.style.textAlign = "left";

                                }

                                else if (dialogueJSON.children[0].speaker === "Bear") {
                                    box1.style.color = bear_color;
                                    box1.style.textAlign = "left";

                                }

                                else if (dialogueJSON.children[0].speaker === "Player") {
                                    box1.style.color = player_color;
                                    box1.style.textAlign = "right";

                                }

                                else if (dialogueJSON.children[0].speaker === "Developer") {
                                    box1.style.color = developer_color;
                                    box1.style.textAlign = "center";
                                }

                                else if (dialogueJSON.speaker === "Robot") {
                                    box1.style.color = robot_color;
                                    box1.style.textAlign = "left";
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

                    if (dialogueJSON.children[0].speaker === "Jagger") {
                        box.style.color = jagger_color;
                        box.style.textAlign = "left";

                    }

                    else if (dialogueJSON.children[0].speaker === "Bear") {
                        box.style.color = bear_color;
                        box.style.textAlign = "left";

                    }

                    else if (dialogueJSON.children[0].speaker === "Player") {
                        box.style.color = player_color;
                        box.style.textAlign = "right";

                    }

                    else if (dialogueJSON.children[0].speaker === "Developer") {
                        box.style.color = developer_color;
                        box.style.textAlign = "center";
                    }

                    else if (dialogueJSON.speaker === "Robot") {
                        box.style.color = robot_color;
                        box.style.textAlign = "left";
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

                else {
                    let box1 = document.getElementById('prompt-box1');
                    let box2 = document.getElementById('prompt-box2');
                    let box3 = document.getElementById('prompt-box3');

                    if (dialogueJSON.children[0].speaker === "Jagger") {
                        box1.style.color = jagger_color;
                        box1.style.textAlign = "left";

                    }

                    else if (dialogueJSON.children[0].speaker === "Bear") {
                        box1.style.color = bear_color;
                        box1.style.textAlign = "left";

                    }

                    else if (dialogueJSON.children[0].speaker === "Player") {
                        box1.style.color = player_color;
                        box1.style.textAlign = "right";

                    }

                    else if (dialogueJSON.children[0].speaker === "Developer") {
                        box1.style.color = developer_color;
                        box1.style.textAlign = "center";
                    }

                    else if (dialogueJSON.speaker === "Robot") {
                        box1.style.color = robot_color;
                        box1.style.textAlign = "left";
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

    return (
        <div className="factory-entrance-container">
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
            <div className="factory-robot" id="fake-jagger" style={{ display: "none" }}>
                <h3>VVVVVVVVVVVVVVVVVVV</h3>
                <h3>V&nbsp;&nbsp;&nbsp;&nbsp;^&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>V&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;‿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>VVVVVVVVVVVVVVVVVVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;VVVVVVVVVVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;/V&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V/</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;VVVVVVVVVVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--</h3>
            </div>
            <div className="player-robot" id="player-robot" style={{ display: "none" }}>
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
            <div className="dialogue-box">
                <textarea className="NPC-box" id="prompt-box1" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box2" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box3" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="user-box" style={{ display: "none" }} id="question-box" spellCheck="false" defaultValue='Type your robot name below and press enter.'></textarea>
                <textarea className="user-box" style={{ display: "none" }} id="response-box" spellCheck="false" placeholder='> '></textarea>
            </div>
            <div className="bear-robot" id="bear" >
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
        </div >
    )
}

export default FactoryEntrance
