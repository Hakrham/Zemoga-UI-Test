import { getPersons, getStats } from './requests.js';
import './person-info.js';
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
                //fecthStats(person);
            }
        });
}

// function fecthStats (person) {
//     fetch(getStats + person.id)
//         .then(x => {
//             return x.json();
//         })
//         .then(stats => {
//             setStats(stats[0]);
//         });
// }

function createElement(person) {
    // console.log(person);
    const el = document.createElement('person-info');
    el.id = 'person-info-'+person.id;
    el.person = person;
    document.querySelector('.sectionGrid').appendChild(el);
}

function closeInfo (){
    this.parentNode.style.cssText = 'display: none';
}

// function setStats(stats) {
//     // console.log(stats);
//     const el = document.getElementById('person-info-' + stats.idPerson);
//     el.stats = stats;
// }