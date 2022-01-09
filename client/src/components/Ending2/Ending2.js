import React, { useEffect } from 'react'
import dialogue from './Act5A.json';

function Ending2() {

    useEffect(() => {
        var user_variables = {};
        var dialogueJSON = dialogue;

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

        var jagger_color = "#B0AA68";
        var player_color = "#fff";
        var bear_color = "#00E0A9";
        var robot_color = "#da73ff";
        var slash_color = "#FF9D14";

        let box = document.getElementById('prompt-box1');
        let len = box.value.length;

        box.focus();
        box.setSelectionRange(len, len);

        document.getElementById('prompt-box1').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log(dialogueJSON)


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
                    let box = document.getElementById('prompt-box2');
                    box.style.display = "inline-block";
                    // change color and robot to match speaker
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

                    else if (dialogueJSON.children[0].speaker === "Robot") {
                        box.style.color = robot_color;
                        box.style.textAlign = "left";
                    }

                    else if (dialogueJSON.children[0].speaker === "Slash") {
                        box.style.color = slash_color;
                        box.style.textAlign = "left";
                    }

                    box.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);;
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
                    let box = document.getElementById('prompt-box3');
                    box.style.display = "inline-block";

                    // change color and robot to match speaker
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

                    else if (dialogueJSON.children[0].speaker === "Robot") {
                        box.style.color = robot_color;
                        box.style.textAlign = "left";
                    }

                    else if (dialogueJSON.children[0].speaker === "Slash") {
                        box.style.color = slash_color;
                        box.style.textAlign = "left";
                    }

                    box.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);;

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

                    else if (dialogueJSON.children[0].speaker === "Robot") {
                        box1.style.color = robot_color;
                        box1.style.textAlign = "left";
                    }

                    else if (dialogueJSON.children[0].speaker === "Slash") {
                        box1.style.color = slash_color;
                        box1.style.textAlign = "left";
                    }

                    box1.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);;
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

    })

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
            </div>
            <div className="player-robot" id="player-robot">
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
        </div >
    )
}

export default Ending2
