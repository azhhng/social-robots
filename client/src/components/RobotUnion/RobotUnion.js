import React, { useEffect, useRef } from 'react'
import './RobotUnion.css';

import dialogue from './Act3.json';

function RobotUnion() {
    var dialogueJSON = useRef(dialogue);

    useEffect(() => {
        var user_variables = {};
        var checkpoint = 0;

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

        fetch('/get-robot-name', {
            method: 'GET'
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                user_variables["robot_name"] = data.replaceAll("\"", "");
                console.log("robot name is " + user_variables["robot_name"]);
            });

        fetch('/get-robot-appearance', {
            method: 'GET'
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
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

        fetch('/get-checkpoint', {
            method: 'GET'
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                checkpoint = parseInt(data);

                dialogueJSON.current = dialogue;

                console.log("check point is " + checkpoint)
                box.value = dialogueJSON.current.text.replace("player_name", user_variables.player_name).replace("robot_name", user_variables.robot_name);
                box.style.height = "1px";
                box.style.height = box.scrollHeight + "px";

                // change color and robot to match speaker

                if (dialogueJSON.current.speaker === "Bear") {
                    box.style.color = bear_color;
                    box.style.textAlign = "left";
                }

                else if (dialogueJSON.current.speaker === "Player") {
                    box.style.color = player_color;
                    box.style.textAlign = "right";
                }

                else if (dialogueJSON.current.speaker === "Jagger") {
                    box.style.color = jagger_color;
                    box.style.textAlign = "left";
                }
            });

        var jagger_color = "#B0AA68";
        var player_color = "#fff";
        var bear_color = "#00E0A9";
        var developer_color = "#F0280F";
        var robot_color = "#da73ff";
        var slash_color = "#FF9D14";

        let box = document.getElementById('prompt-box1');
        let len = box.value.length;

        box.focus();
        box.setSelectionRange(len, len);

        document.getElementById('prompt-box1').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();

                if ("input" === dialogueJSON.current.children[0].response) {
                    let choice1Box = document.getElementById('choice1');
                    let choice2Box = document.getElementById('choice2');

                    choice1Box.style.display = "block";
                    choice2Box.style.display = "block";

                    let questionBox = document.getElementById('question-box');

                    questionBox.style.display = "block";
                    questionBox.style.height = "1px";
                    questionBox.style.height = questionBox.scrollHeight + "px";
                }

                else if ("travel" === dialogueJSON.current.children[0].response) {
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
                            window.location.href = dialogueJSON.current.children[0].location;
                        });
                }

                else {
                    let box = document.getElementById('prompt-box2');
                    box.style.display = "inline-block";
                    // change color and robot to match speaker
                    if (dialogueJSON.current.children[0].speaker === "Jagger") {
                        box.style.color = jagger_color;
                        box.style.textAlign = "left";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Bear") {
                        box.style.color = bear_color;
                        box.style.textAlign = "left";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Player") {
                        box.style.color = player_color;
                        box.style.textAlign = "right";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Developer") {
                        box.style.color = developer_color;
                        box.style.textAlign = "center";
                    }
                    else if (dialogueJSON.current.children[0].speaker === "Robot") {
                        box.style.color = robot_color;
                        box.style.textAlign = "left";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Slash") {
                        box.style.color = slash_color;
                        box.style.textAlign = "left";
                    }

                    box.value = dialogueJSON.current.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);;
                    dialogueJSON.current = dialogueJSON.current.children[0];
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

                if ("input" === dialogueJSON.current.children[0].response) {
                    let choice1Box = document.getElementById('choice1');
                    let choice2Box = document.getElementById('choice2');

                    choice1Box.style.display = "block";
                    choice2Box.style.display = "block";
                }
                else if ("travel" === dialogueJSON.current.children[0].response) {
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
                            window.location.href = dialogueJSON.current.children[0].location;
                        });
                }

                // else if ("letter-decoration" === dialogueJSON.current.children[0].response) {
                //     console.log("hello")
                // }

                else {
                    let box = document.getElementById('prompt-box3');
                    box.style.display = "inline-block";

                    // change color and robot to match speaker
                    if (dialogueJSON.current.children[0].speaker === "Jagger") {
                        box.style.color = jagger_color;
                        box.style.textAlign = "left";

                    }

                    else if (dialogueJSON.current.children[0].speaker === "Bear") {
                        box.style.color = bear_color;
                        box.style.textAlign = "left";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Player") {
                        box.style.color = player_color;
                        box.style.textAlign = "right";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Developer") {
                        box.style.color = developer_color;
                        box.style.textAlign = "center";
                    }
                    else if (dialogueJSON.current.children[0].speaker === "Robot") {
                        box.style.color = robot_color;
                        box.style.textAlign = "left";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Slash") {
                        box.style.color = slash_color;
                        box.style.textAlign = "left";
                    }
                    box.value = dialogueJSON.current.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);;

                    dialogueJSON.current = dialogueJSON.current.children[0];
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
                if ("input" === dialogueJSON.current.children[0].response) {
                    let choice1Box = document.getElementById('choice1');
                    let choice2Box = document.getElementById('choice2');

                    choice1Box.style.display = "block";
                    choice2Box.style.display = "block";

                    let questionBox = document.getElementById('question-box');

                    questionBox.style.display = "block";
                    questionBox.style.height = "1px";
                    questionBox.style.height = questionBox.scrollHeight + "px";
                }
                else if ("travel" === dialogueJSON.current.children[0].response) {
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
                            window.location.href = dialogueJSON.current.children[0].location;
                        });
                }

                else {
                    let box1 = document.getElementById('prompt-box1');
                    let box2 = document.getElementById('prompt-box2');
                    let box3 = document.getElementById('prompt-box3');

                    // change color and robot to match speaker
                    if (dialogueJSON.current.children[0].speaker === "Jagger") {
                        box1.style.color = jagger_color;
                        box1.style.textAlign = "left";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Bear") {
                        box1.style.color = bear_color;
                        box1.style.textAlign = "left";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Player") {
                        box1.style.color = player_color;
                        box1.style.textAlign = "right";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Developer") {
                        box1.style.color = developer_color;
                        box1.style.textAlign = "center";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Robot") {
                        box1.style.color = robot_color;
                        box1.style.textAlign = "left";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Slash") {
                        box1.style.color = slash_color;
                        box1.style.textAlign = "left";
                    }

                    box1.value = dialogueJSON.current.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);;
                    dialogueJSON.current = dialogueJSON.current.children[0];
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

    const choice1 = () => {
        // if they choose to help
        var developer_color = "#F0280F";

        let box1 = document.getElementById('prompt-box1');
        let box2 = document.getElementById('prompt-box2');
        let box3 = document.getElementById('prompt-box3');

        dialogueJSON.current = dialogueJSON.current.children[0].children[0];

        if (dialogueJSON.current.speaker === "Developer") {
            box1.style.color = developer_color;
            box1.style.textAlign = "center";
        }

        box1.value = dialogueJSON.current.text;
        dialogueJSON.current = dialogueJSON.current.children[0];
        box1.style.height = "1px";
        box1.style.height = box1.scrollHeight + "px";

        let len = box1.value.length;
        box1.focus();
        box1.setSelectionRange(len, len);

        box2.value = "";
        box2.style.display = "none";
        box3.value = "";
        box3.style.display = "none";

        let questionBox = document.getElementById('question-box');
        questionBox.style.display = "none";

        document.getElementById('choice1').style.display = "none";
        document.getElementById('choice2').style.display = "none";
    }

    const choice2 = () => {
        // if they choose not to help

        var developer_color = "#F0280F";

        let box1 = document.getElementById('prompt-box1');
        let box2 = document.getElementById('prompt-box2');
        let box3 = document.getElementById('prompt-box3');

        dialogueJSON.current = dialogueJSON.current.children[0].children[1];

        if (dialogueJSON.current.speaker === "Developer") {
            box1.style.color = developer_color;
            box1.style.textAlign = "center";
        }

        box1.value = dialogueJSON.current.text;
        dialogueJSON.current = dialogueJSON.current.children[0];
        box1.style.height = "1px";
        box1.style.height = box1.scrollHeight + "px";

        let len = box1.value.length;
        box1.focus();
        box1.setSelectionRange(len, len);

        box2.value = "";
        box2.style.display = "none";
        box3.value = "";
        box3.style.display = "none";

        let questionBox = document.getElementById('question-box');
        questionBox.style.display = "none";

        document.getElementById('choice1').style.display = "none";
        document.getElementById('choice2').style.display = "none";

    }

    return (

        <div className="union-container">
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
            <div className="bear-robot" id="bear">
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
            <div className="factory-robot" id="jagger">
                <h3>VVVVV&nbsp;&nbsp;VVVVVVV&nbsp;VVVV</h3>
                <h3>V&nbsp;&nbsp;&nbsp;&nbsp;◑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>X&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;︵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>VV&nbsp;VVVVVV-VVVV--VVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V</h3>
                <h3>&nbsp;VVVVVVV&nbsp;VVVVV&nbsp;&nbsp;VV</h3>
                <h3>/V&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V/</h3>
                <h3>&nbsp;VV&nbsp;&nbsp;VVVVXVVV--VVV</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T</h3>
            </div>
            <div className="dialogue-box">
                <textarea className="NPC-box" id="prompt-box1" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box2" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box3" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="user-box" style={{ display: "none" }} id="question-box" spellCheck="false" defaultValue='> Click your response.'></textarea>
                <button id="choice1" onClick={() => choice1()} style={{ display: "none" }}>I'll help you.</button>
                <button id="choice2" onClick={() => choice2()} style={{ display: "none" }}>No, I won't.</button>
            </div>
            <div className="player-robot" id="player-robot">
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B</h3>
                <h3> B&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;B</h3>
                <h3> B&nbsp;&nbsp;&nbsp;&nbsp;ヮ&nbsp;&nbsp;&nbsp;&nbsp;B</h3>
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x</h3>
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> AB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BA</h3>
                <h3> &nbsp;BBBBBBBBB</h3>
                <h3> &nbsp;&nbsp;L&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L</h3>
            </div>
        </div >
    )
}

export default RobotUnion
