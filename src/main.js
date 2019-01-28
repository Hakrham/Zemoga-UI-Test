import { getPersons } from './requests.js';
import './person-info/person-info.js';
window.addEventListener('load', () => {
    fetchPerson();
    document.querySelector('.info .close').addEventListener('click', closeInfo);
});

function fetchPerson() {
    fetch(getPersons)
        .then(x => {
            return x.json();
        })
        .then(json => {
            for (const person of json) {
                createElement(person);
            }
        });
}

function createElement(person) {
    const el = document.createElement('person-info');
    el.id = 'person-info-'+person.id;
    el.person = person;
    document.querySelector('.sectionGrid').appendChild(el);
}

function closeInfo (){
    this.parentNode.style.cssText = 'display: none';
}