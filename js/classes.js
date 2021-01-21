'use strict';

import {deleteCard} from "./pass.js";
import {editCard} from "./pass.js";
import {Visit} from './Visit.js'

document.querySelector('.add-card-btn').addEventListener('click', (e) => {
    let doctor = document.querySelector('.choose-doctor').value;
    let lbl = document.getElementById('required');

    if (doctor === 'Cardiologist') {
        let name = document.querySelector('.cardiologist-name').value;
        let age = document.querySelector('.cardiologist-age').value;
        let target = document.querySelector('.cardiologist-target').value;
        let info = document.querySelector('.cardiologist-shortinfo').value;
        let urgent = document.querySelector('.cardiologist-urgent').value;
        let pressure = document.querySelector('.cardiologist-normalPreassure').value;
        let bwi = document.querySelector('.cardiologist-bwi').value;
        let diss = document.querySelector('.cardiologist-pastDesiases').value;

        if (
            name.length !== 0 &&
            age.length !== 0 &&
            target.length !== 0 &&
            info.length !== 0 &&
            urgent.length !== 0 &&
            pressure.length !== 0 &&
            bwi.length !== 0 &&
            diss.length !== 0
        ) {
            let v = new Visit(doctor, target, info, urgent, pressure, bwi, diss, age, name, '—');
            v.render();
            lbl.classList.add('dn');
        } else {
            lbl.classList.remove('dn');
        }
    }

    if (doctor === 'Therapist') {
        let name = document.querySelector('.therapist-name').value;
        let age = document.querySelector('.therapist-age').value;
        let target = document.querySelector('.therapist-target').value;
        let info = document.querySelector('.therapist-shortinfo').value;
        let urgent = document.querySelector('.therapist-urgent').value;
        let pressure = '—';
        let bwi = '—';
        let diss = '—';

        if (
            name.length !== 0 &&
            age.length !== 0 &&
            target.length !== 0 &&
            info.length !== 0 &&
            urgent.length !== 0
        ) {
            let v = new Visit(doctor, target, info, urgent, pressure, bwi, diss, age, name, '—');
            v.render();
            lbl.classList.add('dn');
        } else {
            lbl.classList.remove('dn');
        }
    }

    if (doctor === 'Dentist') {
        let name = document.querySelector('.dantist-name').value;
        let age = document.querySelector('.dantist-age').value;
        let target = document.querySelector('.dantist-target').value;
        let info = document.querySelector('.dantist-shortinfo').value;
        let urgent = document.querySelector('.dantist-urgent').value;
        let pressure = '—';
        let bwi = '—';
        let diss = '—';
        let lastVisit = document.querySelector('.dantist-data').value;

        if (
            name.length !== 0 &&
            age.length !== 0 &&
            target.length !== 0 &&
            info.length !== 0 &&
            urgent.length !== 0 &&
            pressure.length !== 0 &&
            bwi.length !== 0 &&
            diss.length !== 0
        ) {
            let v = new Visit(doctor, target, info, urgent, pressure, bwi, diss, age, name, lastVisit);
            v.render();
            lbl.classList.add('dn');
        } else {
            lbl.classList.remove('dn');
        }
    }

    quickSearch();
    showMore();
    editClick();
    cancelEditing();
    deleteClick();
    isEmptyTable();
});

export function showMore() {
    const b = document.querySelectorAll('.showMoreBtn');
    const c = document.querySelectorAll('.card-render');

    const targetDefault = document.querySelectorAll('.show-more-target');
    const infoDefault = document.querySelectorAll('.show-more-info');
    const urgentDefault = document.querySelectorAll('.show-more-urgent');
    const pressureDefault = document.querySelectorAll('.show-more-pressure');
    const bwiDefault = document.querySelectorAll('.show-more-iwt');
    const pastDisDefault = document.querySelectorAll('.show-more-pastDis');
    const ageDefault = document.querySelectorAll('.show-more-age');
    const lv = document.querySelectorAll('.show-more-lv');

    for (let i = 0; i < b.length; i++) {
        b[i].onclick = function (e) {
            c[i].classList.toggle('hw');

            targetDefault[i].classList.toggle('dn');
            infoDefault[i].classList.toggle('dn');
            urgentDefault[i].classList.toggle('dn');
            pressureDefault[i].classList.toggle('dn');
            bwiDefault[i].classList.toggle('dn');
            pastDisDefault[i].classList.toggle('dn');
            ageDefault[i].classList.toggle('dn');
            lv[i].classList.toggle('dn');
        }
    }

}

let currentClickedCard = 0;

export function editClick() {

    window.addEventListener('click', (e) => {
        const formCloned = document.querySelector('.cloned');
        const cards = [...document.querySelectorAll('.editBtn')];

        let list = e => cards.indexOf(e.target);

        if (e.target.classList.contains('editBtn')) {
            formCloned.classList.remove('dn');
            currentClickedCard = list(e);
        }

        if (e.target.classList.contains('done-card-btn')) {
            let doc = document.querySelectorAll('.doctor-type')[currentClickedCard];

            let name = document.querySelector('.name-edit').value;
            let age = document.querySelector('.age-edit').value;
            let target = document.querySelector('.target-edit').value;
            let info = document.querySelector('.info-edit').value;
            let urgent = document.querySelector('.urgent-edit').value;
            let pressure = document.querySelector('.pressure-edit').value;
            let bwi = document.querySelector('.bwi-edit').value;
            let diss = document.querySelector('.diss-edit').value;
            let date = document.querySelector('.date-edit').value;

            let nameEdited = document.querySelectorAll('.patient-name')[currentClickedCard];
            let ageEdited = document.querySelectorAll('.show-more-age')[currentClickedCard];
            let targetEdited = document.querySelectorAll('.show-more-target')[currentClickedCard];
            let infoEdited = document.querySelectorAll('.show-more-info')[currentClickedCard];
            let urgentEdited = document.querySelectorAll('.show-more-urgent')[currentClickedCard];
            let pressureEdited = document.querySelectorAll('.show-more-pressure')[currentClickedCard];
            let bwiEdited = document.querySelectorAll('.show-more-iwt')[currentClickedCard];
            let dissEdited = document.querySelectorAll('.show-more-pastDis')[currentClickedCard];
            let dateEdited = document.querySelectorAll('.show-more-lv')[currentClickedCard];

            nameEdited.textContent = 'Name: ' + editHelper(name, nameEdited);
            ageEdited.textContent = 'Age: ' + editHelper(age, ageEdited);
            targetEdited.textContent = 'Visit target: ' + editHelper(target, targetEdited);
            infoEdited.textContent = 'Visit short info: ' + editHelper(info, infoEdited);
            urgentEdited.textContent = 'Visit urgency: ' + editHelper(urgent, urgentEdited);
            pressureEdited.textContent = 'Normal preasure: ' + editHelper(pressure, pressureEdited);
            bwiEdited.textContent = 'BWI: ' + editHelper(bwi, bwiEdited);
            dissEdited.textContent = 'Past diseases: ' + editHelper(diss, dissEdited);
            dateEdited.textContent = 'Last visit date: ' + editHelper(date, dateEdited);

            fetch('http://cards.danit.com.ua/cards', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(json => {

                    editCard(
                        json[currentClickedCard].id,
                        doc.textContent,
                        targetEdited.textContent,
                        infoEdited.textContent,
                        urgentEdited.textContent,
                        pressureEdited.textContent,
                        bwiEdited.textContent,
                        dissEdited.textContent,
                        ageEdited.textContent,
                        nameEdited.textContent,
                        dateEdited.textContent,
                    );
                });
        }
    });
}

export function editHelper(edit, current) {
    let copy = current.textContent;

    if (edit === '') {
        current = copy.slice(copy.indexOf(':') + 2, copy.length);
    } else if (edit.length >= 1) {
        current = edit;
    }
    return current;
}

export function cancelEditing() {
    const cancel = document.querySelector('.cancel-editing-btn');
    const formCloned = document.querySelector('.cloned');

    cancel.onclick = function () {
        formCloned.classList.add('dn');
    }
}

export function deleteClick() {
    const delBtn = document.querySelectorAll('.deleteBtn');
    const card = document.querySelectorAll('.card-render');

    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener('click', (e) => {

            const cards = [...delBtn];

            let list = e => cards.indexOf(e.target);

            currentClickedCard = list(e);
            //alert(currentClickedCard);


            card[i].remove();
            isEmptyTable();
            fetch('http://cards.danit.com.ua/cards', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(json => {

                    //deleteCard(currentClickedCard);

                    deleteCard(json[i].id);
                });
            console.log(i)
        });
    }
}

window.addEventListener('click', (e) => {
    if (
        !e.target.classList.contains('cloned') &&
        !e.target.classList.contains('name-edit') &&
        !e.target.classList.contains('age-edit') &&
        !e.target.classList.contains('target-edit') &&
        !e.target.classList.contains('info-edit') &&
        !e.target.classList.contains('info-edit') &&
        !e.target.classList.contains('urgent-edit') &&
        !e.target.classList.contains('pressure-edit') &&
        !e.target.classList.contains('bwi-edit') &&
        !e.target.classList.contains('diss-edit') &&
        !e.target.classList.contains('date-edit') &&
        !e.target.classList.contains('w-click1') &&
        !e.target.classList.contains('w-click2') &&
        !e.target.classList.contains('done-card-btn') &&
        !e.target.classList.contains('cancel-editing-btn') &&
        !e.target.classList.contains('create-card') &&
        !e.target.classList.contains('form-control') &&
        !e.target.classList.contains('cardiologist-urgent') &&
        !e.target.classList.contains('click-prevent-log') &&
        !e.target.classList.contains('therapist-urgent')
    ) {
        document.querySelector('.cloned').classList.add('dn');
        document.querySelector('.form-password').classList.add('dn');
        document.querySelector('.create-card').classList.add('dn');
        let input = document.querySelectorAll('input');
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }

});

export function isEmptyTable() {
    const card = document.querySelectorAll('.card-render');
    const hh = document.querySelector('.no-items');
    hh.innerText = 'No items have been added.';

    if (card.length > 0) {
        hh.classList.add('dn');
    } else if (card.length === 0) {
        hh.classList.remove('dn');
    }

    console.log(card.length)
}


export function quickSearch() {
    const titleS = document.querySelector('.search-main');
    const urgentS = document.querySelector('.urgent-search');
    const vrS = document.querySelector('.doctor-search');

    const search = document.querySelector('.search-main-btn');

    const cards = document.querySelectorAll('.card-render');

    const prof = document.querySelectorAll('.doctor-type');
    const name = document.querySelectorAll('.patient-name');
    const age = document.querySelectorAll('.show-more-age');
    const target = document.querySelectorAll('.show-more-target');
    const info = document.querySelectorAll('.show-more-info');
    const urgent = document.querySelectorAll('.show-more-urgent');
    const pressure = document.querySelectorAll('.show-more-pressure');
    const bwi = document.querySelectorAll('.show-more-iwt');
    const diss = document.querySelectorAll('.show-more-pastDis');
    const date = document.querySelectorAll('.show-more-lv');


    search.addEventListener('click', (e) => {
        if (titleS.value === '' && urgentS.value === 'All' && vrS.value === 'All') {
            cards.forEach(it => it.classList.remove('dn'));
        }

        if (urgentS.value !== 'All') {
            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove('dn');

                if (urgent[i].textContent.slice(urgent[i].textContent.indexOf(':') + 2, urgent[i].textContent.length) !== urgentS.value) {
                    cards[i].classList.add('dn');
                }
            }
        }

        if (vrS.value !== 'All') {
            for (let i = 0; i < cards.length; i++) {
                cards[i].classList.remove('dn');

                if (prof[i].textContent !== vrS.value) {
                    cards[i].classList.add('dn');
                }
            }
        }

        if (titleS.value !== '') {
            cards.forEach(i => {
                i.classList.remove('dn');
            });

            for (let i = 0; i < cards.length; i++) {

                if (
                    prof[i].textContent !== titleS.value &&
                    name[i].textContent !== titleS.value &&
                    age[i].textContent !== titleS.value &&
                    target[i].textContent !== titleS.value &&
                    info[i].textContent !== titleS.value &&
                    urgent[i].textContent !== titleS.value &&
                    pressure[i].textContent !== titleS.value &&
                    bwi[i].textContent !== titleS.value &&
                    diss[i].textContent !== titleS.value &&
                    date[i].textContent !== titleS.value
                ) {
                    cards[i].classList.add('dn');
                }

            }





        }

        const card = document.querySelectorAll('.card-render.dn');
        const hh = document.querySelector('.no-items');
        hh.innerText = 'No results.';

        if (cards.length > 0) {
            hh.classList.add('dn');
        }

        if (card.length === cards.length) {
            hh.classList.remove('dn');
        }

        console.log('card ' + card.length)
        console.log('cards ' + cards.length)

    });
}
