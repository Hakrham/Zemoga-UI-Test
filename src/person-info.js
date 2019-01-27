// import {} from './person-info.html';

    class PersonInfo extends HTMLElement {
        constructor() {
            super();
            // this.currentDocument = document.currentScript.ownerDocument;
            // setInterval(_ => console.log(this.person), 1000);
            // this.setComponent ({
            //     id: this.idPerson,
            //     title: this.title,
            //     author: this.author
            // });
            // var template = document.getElementById('person-info');
            // console.log(template);
            this.root = this.attachShadow({mode: 'open'});
            // this.root = document;
        }
        
        connectedCallback() {
            this.setComponent(this._person);
            this.root.querySelector('.vote').addEventListener('click', this.voting);
            // console.log(this.person);
        }
    
        voting(){
            console.log(this.obj);
        }
    
        setComponent (obj){
            console.log('setComponent' + obj);
            this.root.innerHTML = `
    
        <link rel="stylesheet" href="fonts.css">
        <link rel="stylesheet" href="person-info.css">
        <section class="gridElement">
            <div class="sectionImg">
                <img id="personImg" src="${obj.img}" alt="${obj.name}">
            </div>
            <div class="surveyInfo">
                <div class="surveyContainer bottom">
                    <div class="surveyGrid whiteColor">
                        <div class="lastVote bottom">
                            <span class="thumbUp center noDisplay">
                                <i class="icon-thumb-up thumbIcon" id="thumbUp"></i>
                            </span>
                            <span class="thumbDown center noDisplay">
                                <i class="icon-thumb-down thumbIcon" id="thumbDown"></i>
                            </span>
                        </div>
                        <div class="personName bottom"><span>${obj.name}</span></div>
                        <div class="lastUpdate"><span><b>${obj.lastUpdate.time}</b> ${obj.lastUpdate.section}</span></div>
                        <div class="description top">
                            <p>${obj.description}</p>
                        </div>
                        <div class="thumbUp center"><input type="checkbox" name="voteUp" id="voteUp"><label for="voteUp"><i class="icon-thumb-up thumbIcon"></i></label></div>
                        <div class="thumbDown center"><input type="checkbox" name="voteDown" id="voteDown"><label
                                for="voteDown"><i class="icon-thumb-down thumbIcon"></i></label></div>
                        <button class="vote">${obj.vote}</button>
                        <div class="percentageBar">
                            <div class="goodVotes"></div>
                            <div class="badVotes"></div>
                            <div class="center">
                                <i class="icon-thumb-up"></i>
                                <div>63%</div>
                            </div>
                            <div class="center">
                                <div>37%</div> <i class="icon-thumb-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div id="idPerson" class="noDisplay">${obj.id}</div>
            `;
            
        }

        set obj (obj) {
            console.log('set');
            this._person = obj;
        }

        // set person (person) {
        //     this._person = person;
        // }

        get person() {
            console.log('get');
            return this._person;
        }
    }
    
    customElements.define('person-info', PersonInfo);
