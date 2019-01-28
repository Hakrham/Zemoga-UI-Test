// import {} from './person-info.html';
import { setStats } from '../requests.js';

    class PersonInfo extends HTMLElement {
        constructor() {
            super();
            this.root = this.attachShadow({mode: 'open'});
            // var template = this.root.getElementById('person-info');
            // console.log(template);           
        }
        
        connectedCallback() {
            this.setComponent();
            this.calculateBars();
            this.lastVote();
            this.addListeners();
        }
        
        addListeners() {
            let element;

            // Voting:
            element = this.root.querySelector('.vote');
            element.addEventListener('click', () => this.voting.call(this, element));

            // Style Radios:
            element = this.root.querySelectorAll('#voteUp, #voteDown');
            element.forEach(el => {
                el.addEventListener('change', () => this.radioParentStyle.call(this, element));
            });
                        // element.addEventListener('click', () => this.voting.call(this, element));
        }

        voting(element){
            const voteUp = this.root.getElementById('voteUp');
            this.addVote(voteUp.checked, this._person);
        }

        radioParentStyle(element) {
            element.forEach(el => {
                el.parentNode.classList.toggle('checked');
            });
        }

        calculateBars() {
            let goodVotes = this.root.querySelector('.goodVotes');
            let badVotes = this.root.querySelector('.badVotes');
            let percentage = this._person.stats.goodVotes * 100 
                / (this._person.stats.goodVotes + this._person.stats.badVotes)
                .toFixed(2);
            goodVotes.style.cssText = 'width: ' + percentage + '%';
            badVotes.style.cssText = 'left: ' + percentage + '%';
        }

        lastVote() {
            let thumbUp = this.root.querySelector('.lastVote .thumbUp');
            let thumbDown = this.root.querySelector('.lastVote .thumbDown');
            if (this._person.stats.lastVoteGood) thumbDown.style.cssText = 'display: none';
            else thumbUp.style.cssText = 'display: none';
        }

        addVote(voteUp, person) {
            console.log(person.stats);
            if (voteUp) person.stats.goodVotes++;
            else person.stats.badVotes++;
            person.stats.lastVoteGood = voteUp;
            console.log(person.stats);

            // var xhttp = new XMLHttpRequest();
            // xhttp.onreadystatechange = function() {
            //     alert("finish");
            // };
            // xhttp.open("PUT", setStats + stats.id);
            // xhttp.setRequestHeader("Content-Type", "application/json");
            // xhttp.send(JSON.stringify(stats));


            let options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(person)
            };

            fetch(setStats + person.id, options)
                .then(x => {
                    console.log(x);
                    return x.json();
                });
        }
    
        setComponent (){

            const pGood = Math.floor(this._person.stats.goodVotes * 100
                / (this._person.stats.goodVotes + this._person.stats.badVotes));
            const pBad = 100 - pGood;

            this.root.innerHTML = `
    
        <link rel="stylesheet" href="./src/fonts.css">
        <link rel="stylesheet" href="./src/person-info/person-info.css">
        <section class="gridElement">
            <div class="sectionImg">
                <img id="personImg" src="${this._person.img}" alt="${this._person.name}">
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
                        <div class="personName bottom"><span>${this._person.name}</span></div>
                        <div class="lastUpdate"><span><b>${this._person.lastUpdate.time}</b> ${this._person.lastUpdate.section}</span></div>
                        <div class="description top">
                            <p>${this._person.description}</p>
                        </div>
                        <div class="thumbUp center checked"><input type="radio" name="vote" value="voteUp" id="voteUp" checked><label for="voteUp"><i class="icon-thumb-up thumbIcon"></i></label></div>
                        <div class="thumbDown center"><input type="radio" name="vote" value="voteDown" id="voteDown"><label
                                for="voteDown"><i class="icon-thumb-down thumbIcon"></i></label></div>
                        <button class="vote">${this._person.vote}</button>
                        <div class="percentageBar">
                            <div class="goodVotes"></div>
                            <div class="badVotes"></div>
                            <div class="center">
                                <i class="icon-thumb-up"></i>
                                <div>${pGood}%</div>
                            </div>
                            <div class="center">
                                <div>${pBad}%</div> <i class="icon-thumb-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div id="idPerson" class="noDisplay">${this._person.id}</div>
            `;
            
        }

        set person (person) {
            this._person = person;
        }

        set stats (stats) {
            this._stats = stats;
        }

        // set person (person) {
        //     this._person = person;
        // }
    }
    
    customElements.define('person-info', PersonInfo);
