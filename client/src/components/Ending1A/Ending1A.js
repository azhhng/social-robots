import React, { useEffect } from 'react'
import dialogue from './Act5BA.json';

function Ending1A() {

    useEffect(() => {
        var user_variables = {};
        var checkpoint = 0;
        var dialogueJSON = dialogue;

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

                dialogueJSON = dialogue;

                console.log("check point is " + checkpoint)
                box.value = dialogueJSON.text.replace("player_name", user_variables.player_name).replace("robot_name", user_variables.robot_name);
                box.style.height = "1px";
                box.style.height = box.scrollHeight + "px";

                // change color and robot to match speaker
                box.style.color = bear_color;
                box.style.textAlign = "left";
            });

        var player_color = "#fff";
        var bear_color = "#00E0A9";

        let box = document.getElementById('prompt-box1');
        let len = box.value.length;

        box.focus();
        box.setSelectionRange(len, len);
        console.log(dialogueJSON);

        document.getElementById('prompt-box1').addEventListener('keypress', function (e) {
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

                    let box = document.getElementById('prompt-box2');
                    box.style.display = "inline-block";
                    // change color and robot to match speaker

                    if (dialogueJSON.children[0].speaker === "Player") {
                        box.style.color = player_color;
                        box.style.textAlign = "right";
                    }

                    else if (dialogueJSON.children[0].speaker === "Bear") {
                        box.style.color = bear_color;
                        box.style.textAlign = "left";
                    }

                    box.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);
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


                    if (dialogueJSON.children[0].speaker === "Bear") {
                        box.style.color = bear_color;
                        box.style.textAlign = "left";
                    }

                    box.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);

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

                    if (dialogueJSON.children[0].speaker === "Bear") {
                        box1.style.color = bear_color;
                        box1.style.textAlign = "left";
                    }

                    else if (dialogueJSON.children[0].speaker === "Player") {
                        box1.style.color = player_color;
                        box1.style.textAlign = "right";
                    }

                    box1.value = dialogueJSON.children[0].text.replace("player_name", user_variables["player_name"]).replace("robot_name", user_variables.robot_name);
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
        <div className="orientation-container">

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
            <div className="dialogue-box">
                <textarea className="NPC-box" id="prompt-box1" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box2" maxLength="1" spellCheck="false" defaultValue=""></textarea>
                <textarea className="NPC-box" style={{ display: "none" }} id="prompt-box3" maxLength="1" spellCheck="false" defaultValue=""></textarea>
            </div>
        </div >
    )
}

export default Ending1A
