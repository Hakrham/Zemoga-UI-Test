class PersonInfo extends HTMLElement {

    constructor() {
        super();
        // this.root = this.attachShadow({mode: 'open'});
        // this.currentDocument = document.currentScript.ownerDocument;
        // setInterval(_ => console.log(this.person), 1000);
        // this.setComponent ({
        //     id: this.idPerson,
        //     title: this.title,
        //     author: this.author
        // });
    }

    connectedCallback() {
        this.setComponent(this.person);
        console.log('entro al connectedcallback');
    }

    setComponent (person){
        this.innerHTML = `
    
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
                    <div class="thumbUp center"><input type="checkbox" name="voteUp" id="voteUp"><label for="voteUp"><i class="icon-thumb-up thumbIcon"></i></label></div>
                    <div class="thumbDown center"><input type="checkbox" name="voteDown" id="voteDown"><label
                            for="voteDown"><i class="icon-thumb-down thumbIcon"></i></label></div>
                    <button class="vote">${person.vote}</button>
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
        `;
    }
    set person (person) {
        this.setComponent(person);
    }

    get idPerson () {
        return this.getAttribute('idPerson');
    }

    get title () {
        return this.getAttribute('title');        
    }

    get author () {
        return this.getAttribute('author');        
    }

}

customElements.define('person-info', PersonInfo);