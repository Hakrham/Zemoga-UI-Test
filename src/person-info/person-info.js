// import {} from './person-info.html';
import {
    setStats
} from '../requests.js';

class PersonInfo extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({
            mode: 'open'
        });
        // var template = this.root.getElementById('person-info');
        // console.log(template);           
    }

    connectedCallback() {
        this.setComponent(this._person);
        this.calculateBars();
        this.lastVote();
        this.addListeners();
    }

    addListeners() {
        let element;

        // Voting:
        element = this.root.querySelector('.vote');
        element.addEventListener('click', (e) => this.voting.call(this, e.target));

        // Style Radios:
        element = this.root.querySelectorAll('#voteUp, #voteDown');
        element.forEach(el => {
            el.addEventListener('change', () => this.radioParentStyle.call(this, element));
        });
        // element.addEventListener('click', () => this.voting.call(this, element));
    }

    voting(element) {
        const voteUp = this.root.getElementById('voteUp');
        if (element.innerHTML != 'Vote again')
            this.addVote(voteUp.checked, this._person);
        else this.changeSurveyInfo();
    }

    radioParentStyle(element) {
        element.forEach(el => {
            el.parentNode.classList.toggle('checked');
        });
    }

    calculateBars() {
        let goodVotes = this.root.querySelector('.goodVotes');
        let badVotes = this.root.querySelector('.badVotes');
        let percentage = Math.floor(this._person.stats.goodVotes * 100 /
            (this._person.stats.goodVotes + this._person.stats.badVotes));
        goodVotes.style.cssText = 'width: ' + percentage + '%';
        badVotes.style.cssText = 'left: ' + percentage + '%';
    }

    lastVote() {
        let thumbUp = this.root.querySelector('.lastVote .thumbUp');
        let thumbDown = this.root.querySelector('.lastVote .thumbDown');
        const show = 'display:flex;align-items:center;justify-content:center;'
        if (this._person.stats.lastVoteGood) {
            thumbDown.style.cssText = 'display: none';
            thumbUp.style.cssText = show;
        } else {
            thumbDown.style.cssText = show;
            thumbUp.style.cssText = 'display: none';
        }
    }

    addVote(voteUp, person) {
        if (voteUp) person.stats.goodVotes++;
        else person.stats.badVotes++;
        person.stats.lastVoteGood = voteUp;

        let options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        };

        fetch(setStats + person.id, options)
            .then(x => {
                return x.json();
            })
            .then(json => {
                this._person = json;
                this.render(json);
            });
    }

    render() {
        this.setPercerntages();
        this.calculateBars();
        this.lastVote();
        this.changeSurveyInfo();
    }

    changeSurveyInfo() {
        let button = this.root.querySelector('.vote');
        let info = this.root.querySelector('.description p');
        let thumbs = this.root.querySelectorAll('#voteUp, #voteDown');

        if (button.innerHTML == 'Vote again') {
            button.innerHTML = this._person.vote;
            info.innerHTML = this._person.description;
        } else {
            button.innerHTML = 'Vote again';
            info.innerHTML = 'Thank you for voting!';
        }

        thumbs.forEach(thumb => {
            thumb.parentNode.classList.toggle('noDisplay');
        });

    }

    setPercerntages() {
        const p = this.calcPercentages(this._person.stats.goodVotes, this._person.stats.badVotes);
        let pBars = this.root.querySelector('.percentageBar');
        pBars.innerHTML =
            `
                    <div class="goodVotes"></div>
                    <div class="badVotes"></div>
                    <div class="center">
                        <i class="icon-thumb-up"></i>
                        <div>${p.Good}%</div>
                    </div>
                    <div class="center">
                        <div>${p.Bad}%</div> <i class="icon-thumb-down"></i>
                    </div>
                `;
    }

    calcPercentages(goodVotes, badVotes) {
        const pGood = Math.floor(goodVotes * 100 /
            (goodVotes + badVotes));
        const pBad = 100 - pGood;
        return {
            'Good': pGood,
            'Bad': pBad
        }
    }

    setComponent(person) {
        const p = this.calcPercentages(person.stats.goodVotes, person.stats.badVotes);

        this.root.innerHTML = `
    
        <link rel="stylesheet" href="./src/fonts.css">
        <link rel="stylesheet" href="./src/person-info/person-info.css">
        <section class="gridElement">
            <div class="sectionImg">
                <img id="personImg" src="${person.img}" alt="${person.name}">
            </div>
            <div class="surveyInfo">
                <div class="surveyContainer bottom">
                    <div class="surveyGrid whiteColor">
                        <div class="lastVote bottom">
                            <span class="thumbUp center">
                                <i class="icon-thumb-up thumbIcon" id="thumbUp"></i>
                            </span>
                            <span class="thumbDown center">
                                <i class="icon-thumb-down thumbIcon" id="thumbDown"></i>
                            </span>
                        </div>
                        <div class="personName bottom"><span>${person.name}</span></div>
                        <div class="lastUpdate"><span><b>${person.lastUpdate.time}</b> ${person.lastUpdate.section}</span></div>
                        <div class="description top">
                            <p>${person.description}</p>
                        </div>
                        <div class="thumbUp center checked"><input type="radio" name="vote" value="voteUp" id="voteUp" checked><label for="voteUp"><i class="icon-thumb-up thumbIcon"></i></label></div>
                        <div class="thumbDown center"><input type="radio" name="vote" value="voteDown" id="voteDown"><label
                                for="voteDown"><i class="icon-thumb-down thumbIcon"></i></label></div>
                        <button class="vote">${person.vote}</button>
                        <div class="percentageBar">
                            <div class="goodVotes"></div>
                            <div class="badVotes"></div>
                            <div class="center">
                                <i class="icon-thumb-up"></i>
                                <div>${p.Good}%</div>
                            </div>
                            <div class="center">
                                <div>${p.Bad}%</div> <i class="icon-thumb-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div id="idPerson" class="noDisplay">${person.id}</div>
            `;

    }

    set person(person) {
        this._person = person;
    }
}

customElements.define('person-info', PersonInfo);
