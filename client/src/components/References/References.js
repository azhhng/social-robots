import React from 'react'
import './References.css';

function References() {
    var reference2Open = false;
    var reference3Open = false;
    var reference4Open = false;
    var reference6Open = false;

    const reference2 = () => {
        let box1 = document.getElementById('explanation2');

        if (reference2Open) {
            box1.style.display = "none";
            reference2Open = false;
            return;
        }
        reference2Open = true;
        box1.style.display = "block";
        box1.textContent = "This source argues for moral consideration for robots. Gerdes uses a human-based approach for morality and says that our treatment of robots, and even objects, reflect our own morals."
    }

    const reference3 = () => {

        let box1 = document.getElementById('explanation3');
        if (reference3Open) {
            box1.style.display = "none";
            reference3Open = false;
            return;
        }
        reference3Open = true;
        box1.style.display = "block";
        box1.textContent = "This paper talks about a study done about how people react to a vacuum cleaner that was given a personality. The participants were asked which values and personality types they would want their vacuum robot to have."
    }


    const reference4 = () => {

        let box1 = document.getElementById('explanation4');
        if (reference4Open) {
            box1.style.display = "none";
            reference4Open = false;
            return;
        }
        reference4Open = true;
        box1.style.display = "block";
        box1.textContent = "This article does a good overview on the current topic of whether robots have consciousness and the consequences of it. It goes through various ways of how a robot could qualify for consciousness such as Dehaene's C1 and C2 requirements. It then moves on to the current state of social robots and whether rights should be given to them."
    }

    const reference6 = () => {

        let box1 = document.getElementById('explanation6');
        if (reference6Open) {
            box1.style.display = "none";
            reference6Open = false;
            return;
        }
        reference6Open = true;
        box1.style.display = "block";
        box1.textContent = "This paper argues for there to be a shift in how we think about robots and rights. Instead of granting them rights, since their current form is not yet conscious, they ought to be given moral consideration."
    }

    return (
        <div className="references-container">
            <div className="references-robot" id="references">
                <h3>HHHHHHHHHHHHH</h3>
                <h3>H&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H</h3>
                <h3>H&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H</h3>
                <h3>H&nbsp;&nbsp;&nbsp;ㆆ&nbsp;&nbsp;&nbsp;ㆆ&nbsp;&nbsp;H</h3>
                <h3>H&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H</h3>
                <h3>H&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;H</h3>
                <h3>H&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H</h3>
                <h3>HHHHHHHHHHHHH</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;U</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;HHHHH</h3>
                <h3>&nbsp;&nbsp;&nbsp;[H&nbsp;&nbsp;&nbsp;H]</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;HHHHH</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|</h3>
                <h3>&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;--</h3>

            </div>

            <div className="about-information">
                <h4>Well hello there. I'm Long Johnny. Here are some of the references throughout the website. Click to see how they were used then click again to hide the description.</h4>
            </div>
            <div className="references-information" id="reference2" onClick={() => reference2()}>
                <h4>Gerdes, A. (2016). The issue of moral consideration in robot ethics. ACM SIGCAS Computers and Society, 45(3), 274–279. https://doi.org/10.1145/2874239.2874278</h4>
            </div>
            <div className="explanation-information" id="explanation2" style={{ display: "none" }}>
                <h4>placeholder</h4>
            </div>
            <div className="references-information" id="reference3" onClick={() => reference3()}>
                <h4>Hendriks, B., Meerbeek, B., Boess, S., Pauws, S., & Sonneveld, M. (2010). Robot vacuum cleaner personality and behavior. International Journal of Social Robotics, 3(2), 187–195. https://doi.org/10.1007/s12369-010-0084-5</h4>
            </div>
            <div className="explanation-information" id="explanation3" style={{ display: "none" }}>
                <h4>placeholder</h4>
            </div>
            <div className="references-information" id="reference4" onClick={() => reference4()}>
                <h4>Hildt, E. (2019). Artificial Intelligence: Does consciousness matter? Frontiers in Psychology, 10. https://doi.org/10.3389/fpsyg.2019.01535</h4>
            </div>
            <div className="explanation-information" id="explanation4" style={{ display: "none" }}>
                <h4>placeholder</h4>
            </div>
            <div className="references-information" id="reference6" onClick={() => reference6()}>
                <h4>Tavani, H. T. (2018). Can Social Robots qualify for moral consideration? reframing the question about robot rights. Information, 9(4), 73–89. https://doi.org/10.3390/info9040073</h4>
            </div>
            <div className="explanation-information" id="explanation6" style={{ display: "none" }}>
                <h4>placeholder</h4>
            </div>
        </div >
    )
}

export default References
