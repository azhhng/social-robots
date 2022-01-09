import React, { useEffect, useRef } from 'react'
import dialogue from './Act5B.json';
import './Ending1.css';

function Ending1() {

    var dialogueJSON = useRef(dialogue);

    useEffect(() => {
        var user_variables = {};
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
                box.style.color = developer_color;
                box.style.textAlign = "center";

            });

        var player_color = "#fff";
        var developer_color = "#F0280F";
        var slash_color = "#FF9D14"

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

                else if ("delete-slasher" === dialogueJSON.current.children[0].response) {
                    let questionBox = document.getElementById('question-box');
                    let responseBox = document.getElementById('response-box');

                    questionBox.style.display = "block";
                    questionBox.value = "> Just type in slasher.delete() and they'll disappear...forever."
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

                            if (responseBox.value === "") {
                                responseBox.placeholder = "> Are you getting cold feet?";
                            }

                            else if (responseBox.value === "slasher.delete()") {

                                console.log("slasher deleted")
                                document.getElementById('slash').style.display = "none";

                                let box1 = document.getElementById('prompt-box1');
                                let box2 = document.getElementById('prompt-box2');
                                let box3 = document.getElementById('prompt-box3');

                                dialogueJSON.current = dialogueJSON.current.children[0];
                                box1.value = dialogueJSON.current.children[0].text.replace("player_name", user_variables["player_name"]);
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
                else {

                    let box = document.getElementById('prompt-box2');
                    box.style.display = "inline-block";
                    // change color and robot to match speaker

                    if (dialogueJSON.current.children[0].speaker === "Player") {
                        box.style.color = player_color;
                        box.style.textAlign = "right";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Developer") {
                        box.style.color = developer_color;
                        box.style.textAlign = "center";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Slash") {
                        document.getElementById('slash').style.display = "block";
                        box.style.color = slash_color;
                        box.style.textAlign = "left";
                    }


                    box.value = dialogueJSON.current.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);
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

                else {
                    let box = document.getElementById('prompt-box3');
                    box.style.display = "inline-block";

                    if (dialogueJSON.current.children[0].speaker === "Player") {
                        box.style.color = player_color;
                        box.style.textAlign = "right";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Developer") {
                        box.style.color = developer_color;
                        box.style.textAlign = "center";
                    }
                    else if (dialogueJSON.current.children[0].speaker === "Slash") {
                        box.style.color = slash_color;
                        document.getElementById('slash').style.display = "block";

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
                    if (dialogueJSON.current.children[0].speaker === "Player") {
                        box1.style.color = player_color;
                        box1.style.textAlign = "right";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Developer") {
                        box1.style.color = developer_color;
                        box1.style.textAlign = "center";
                    }

                    else if (dialogueJSON.current.children[0].speaker === "Slash") {
                        box1.style.color = slash_color;
                        document.getElementById('slash').style.display = "block";

                        box1.style.textAlign = "left";
                    }

                    box1.value = dialogueJSON.current.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);
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
        // if they erase
        var developer_color = "#F0280F";

        let box1 = document.getElementById('prompt-box1');
        let box2 = document.getElementById('prompt-box2');
        let box3 = document.getElementById('prompt-box3');

        dialogueJSON.current = dialogueJSON.current.children[0].children[1];

        if (dialogueJSON.current.speaker === "Developer") {
            box1.style.color = developer_color;
            box1.style.textAlign = "center";
        }

        box1.value = dialogueJSON.current.text
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
        // if they refuse to erase
        var developer_color = "#F0280F";

        let box1 = document.getElementById('prompt-box1');
        let box2 = document.getElementById('prompt-box2');
        let box3 = document.getElementById('prompt-box3');

        dialogueJSON.current = dialogueJSON.current.children[0].children[0];

        if (dialogueJSON.current.speaker === "Developer") {
            box1.style.color = developer_color;
            box1.style.textAlign = "center";
        }

        box1.value = dialogueJSON.current.text
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

        <div className="ending1-container">
            <div className="developer-npc">
                <h3>&nbsp;&nbsp;___________</h3>
                <h3>&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\</h3>
                <h3>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;|&nbsp;&nbsp;👁️&nbsp;&nbsp;👁️&nbsp;&nbsp;|</h3>
                <h3>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ʖ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp; ͜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</h3>
                <h3>&nbsp;&nbsp;-----------</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|</h3>
                <h3>&nbsp;-------------</h3>
                <h3>/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\</h3>
                <h3>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|</h3>
                <h3>|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|</h3>
                <h3>|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|</h3>
                <h3>|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|</h3>
                <h3>&nbsp;&nbsp;-----------</h3>
                <h3>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>-------&nbsp;-------</h3>

            </div>

            <div className="slasher-robot" id="slash" style={{ display: "none" }}>
                <h3>\\\\\\\\\\\\\\\\\\\</h3>
                <h3>\&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;\</h3>
                <h3>\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;︵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\</h3>
                <h3>\\\\\\\\\\\\\\\\\\\</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;\\\\\\\\\\\</h3>
                <h3>&nbsp;&nbsp;&nbsp;(\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\)</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;\\\\\\\\\\\</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~~</h3>
            </div>
            <div className="dialogue-box">
                <textarea className="NPC-box" id="prompt-box1" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box2" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box3" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="user-box" style={{ display: "none" }} id="question-box" spellCheck="false" defaultValue="> What do you say?"></textarea>
                <textarea className="user-box" style={{ display: "none" }} id="response-box" spellCheck="false" placeholder='> '></textarea>
                <button id="choice1" onClick={() => choice1()} style={{ display: "none" }}> I can't.</button>
                <button id="choice2" onClick={() => choice2()} style={{ display: "none" }}>Fine.</button>
            </div>
        </div >
    )
}

export default Ending1
