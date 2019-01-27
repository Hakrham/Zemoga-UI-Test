import { persons } from './requests.js';
import './person-info.js';
window.addEventListener('load', () => {
    fetchSurveys();
});

function fetchSurveys() {
    fetch(persons)
        .then((x) => {
            return x.json();
        })
        .then((json) => {
            for (const person of json) {
                const el = document.createElement('person-info');
                el.obj = person;
                document.querySelector('.sectionGrid').appendChild(el);
            }
        });
}