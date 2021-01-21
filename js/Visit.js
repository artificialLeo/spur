'use strict';

export class Visit {
    constructor(doctor, target, info, urgent, pressure, bwi, pastDis, age, name, lastVisit) {
        this.doctor = doctor;
        this.target = target;
        this.info = info;
        this.urgent = urgent;
        this.pressure = pressure;
        this.bwi = bwi;
        this.pastDis = pastDis;
        this.age = age;
        this.name = name;
        this.lastVisit = lastVisit;

        this.card = cardBody();

        defaultCard(this.card, this.doctor, this.target, this.info, this.urgent, this.pressure, this.bwi, this.pastDis, this.age, this.name, this.lastVisit);
    }

    render() {
        const {cardBody, doctor, target, info, urgent, pressure, bwi, pastDis, age, name, lastVisit, showMoreBtn, editBtn, deleteBtn} = this.card;

        cardBody.append(doctor, target, info, urgent, pressure, bwi, pastDis, age, name, lastVisit, showMoreBtn, editBtn, deleteBtn);

        document.querySelector('#grid-wrapper').prepend(cardBody);

        fetch('http://cards.danit.com.ua/cards', {
            method: 'POST',
            body: JSON.stringify({
                doctor: doctor.textContent,
                target: target.textContent,
                info: info.textContent,
                urgent: urgent.textContent,
                pressure: pressure.textContent,
                bwi: bwi.textContent,
                pastDis: pastDis.textContent,
                age: age.textContent,
                name: name.textContent,
                lastVisit: lastVisit.textContent,

            }),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(json => console.log(json));
    }

    renderStorage() {
        const {cardBody, doctor, target, info, urgent, pressure, bwi, pastDis, age, name, lastVisit, showMoreBtn, editBtn, deleteBtn} = this.card;

        cardBody.append(doctor, target, info, urgent, pressure, bwi, pastDis, age, name, lastVisit, showMoreBtn, editBtn, deleteBtn);

        document.querySelector('#grid-wrapper').prepend(cardBody);
    }

}

function cardBody() {
    return {
        cardBody: document.createElement('div'),
        doctor: document.createElement('p'),
        target: document.createElement('p'),
        info: document.createElement('p'),
        urgent: document.createElement('p'),
        pressure: document.createElement('p'),
        bwi: document.createElement('p'),
        pastDis: document.createElement('p'),
        age: document.createElement('p'),
        name: document.createElement('p'),
        lastVisit: document.createElement('p'),
        showMoreBtn: document.createElement('button'),
        editBtn: document.createElement('button'),
        deleteBtn: document.createElement('button'),
    };
}

function defaultCard(card, doctor, target, info, urgent, pressure, bwi, pastDis, age, name, lastVisit) {
    card.doctor.innerText = doctor;
    card.target.innerText = "Visit target: " + target;
    card.info.innerText = "Visit short info: " + info;
    card.urgent.innerText = "Visit urgency: " + urgent;
    card.pressure.innerText = "Normal preasure: " + pressure;
    card.bwi.innerText = "BWI: " + bwi;
    card.pastDis.innerText = "Past diseases: " + pastDis;
    card.age.innerText = "Age: " + age;
    card.name.innerText = "Name: " + name;
    card.lastVisit.innerText = "Last visit date: " + lastVisit;
    card.showMoreBtn.innerText = 'Show more';
    card.editBtn.innerText = 'Edit';
    card.deleteBtn.innerText = 'Delete';

    card.cardBody.classList.add('card-render');

    card.showMoreBtn.classList.add('btn', 'btn-primary', 'showMoreBtn');
    card.editBtn.classList.add('btn', 'btn-warning', 'editBtn');
    card.deleteBtn.classList.add('btn', 'btn-danger', 'deleteBtn');

    card.doctor.classList.add('doctor-type');
    card.target.classList.add('dn', 'show-more-target');
    card.info.classList.add('dn', 'show-more-info');
    card.urgent.classList.add('dn', 'show-more-urgent');
    card.pressure.classList.add('dn', 'show-more-pressure');
    card.bwi.classList.add('dn', 'show-more-iwt');
    card.pastDis.classList.add('dn', 'show-more-pastDis');
    card.age.classList.add('dn', 'show-more-age');
    card.name.classList.add('patient-name');
    card.lastVisit.classList.add('dn', 'show-more-lv');
}