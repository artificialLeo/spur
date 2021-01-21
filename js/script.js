'use strict';

import {Visit} from "./Visit.js";
import {deleteClick, editClick, isEmptyTable, showMore, cancelEditing, quickSearch} from "./classes.js";
import {getAllCards} from "./pass.js";

const selectedDoctorCreate = document.querySelector('.choose-doctor');

const dentistSelect = document.querySelector('.selected-dantist');
const cardiologistSelect = document.querySelector('.selected-cardiologist');
const therapistSelect = document.querySelector('.selected-therapist');

selectedDoctorCreate.addEventListener('click', (e) => {
    if (selectedDoctorCreate.value === 'Cardiologist') {
        dentistSelect.classList.add('dn');
        therapistSelect.classList.add('dn');
        cardiologistSelect.classList.remove('dn');
    } else if (selectedDoctorCreate.value === 'Therapist') {
        dentistSelect.classList.add('dn');
        therapistSelect.classList.remove('dn');
        cardiologistSelect.classList.add('dn');
    } else if (selectedDoctorCreate.value === 'Dentist') {
        dentistSelect.classList.remove('dn');
        therapistSelect.classList.add('dn');
        cardiologistSelect.classList.add('dn');
    }

    const inp = document.querySelectorAll('input');
    for (let i = 0; i < inp.length; i++) {
        inp[i].value = '';
    }
});

const loginBtn = document.querySelector('#login');
const confirmBtn = document.querySelector('#confirm');
const closeBtn = document.querySelector('#close-pass');
const addBtn = document.querySelector('#addBt');
const loginForm = document.querySelector('.form-password');
const cardForm = document.querySelector('.create-card');

loginBtn.addEventListener('click', (e) => {
    loginForm.classList.toggle('dn');
});

closeBtn.addEventListener('click', (e) => {
    loginForm.classList.add('dn');
});

confirmBtn.addEventListener('click', (e) => {
    const emailVal = document.querySelector('.email-input').value;
    const passlVal = document.querySelector('.password-input').value;

    fetch('http://cards.danit.com.ua/login', {
        method: 'POST',
        body: JSON.stringify({
            email: `${emailVal}`,
            password: `${passlVal}`,
        })
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (json.status === 'Success') {
                localStorage.setItem('token', json.token);
                loginForm.classList.add('dn');
                loginBtn.classList.add('dn');
                addBtn.classList.remove('dn');

                localStorage.setItem('log', 'in');
                login();

                fetch('http://cards.danit.com.ua/cards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }})
                    .then(response => response.json())
                    .then(json => {
                        json.forEach(item => {
                            let visit = new Visit(
                                item.doctor,
                                item.target.slice(item.target.indexOf(':') + 2, item.target.length),
                                item.info.slice(item.info.indexOf(':') + 2, item.info.length),
                                item.urgent.slice(item.urgent.indexOf(':') + 2, item.urgent.length),
                                item.pressure.slice(item.pressure.indexOf(':') + 2, item.pressure.length),
                                item.bwi.slice(item.bwi.indexOf(':') + 2, item.bwi.length),
                                item.pastDis.slice(item.pastDis.indexOf(':') + 2, item.pastDis.length),
                                item.age.slice(item.age.indexOf(':') + 2, item.age.length),
                                item.name.slice(item.name.indexOf(':') + 2, item.name.length),
                                item.lastVisit.slice(item.lastVisit.indexOf(':') + 2, item.lastVisit.length)
                            );
                            visit.renderStorage();

                            quickSearch();
                            showMore();
                            editClick();
                            cancelEditing();
                            deleteClick();
                            isEmptyTable();
                        });
                    });
            }
        });
});

function login() {

    if (localStorage.getItem('log') === 'in') {
        document.getElementById('visit-table').classList.remove('dn');
        document.getElementById('search').classList.remove('dn');
        loginBtn.classList.add('dn');
        addBtn.classList.remove('dn');

        fetch('http://cards.danit.com.ua/cards', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(json => {
                json.forEach(item => {
                    let visit = new Visit(
                        item.doctor,
                        item.target.slice(item.target.indexOf(':') + 2, item.target.length),
                        item.info.slice(item.info.indexOf(':') + 2, item.info.length),
                        item.urgent.slice(item.urgent.indexOf(':') + 2, item.urgent.length),
                        item.pressure.slice(item.pressure.indexOf(':') + 2, item.pressure.length),
                        item.bwi.slice(item.bwi.indexOf(':') + 2, item.bwi.length),
                        item.pastDis.slice(item.pastDis.indexOf(':') + 2, item.pastDis.length),
                        item.age.slice(item.age.indexOf(':') + 2, item.age.length),
                        item.name.slice(item.name.indexOf(':') + 2, item.name.length),
                        item.lastVisit.slice(item.lastVisit.indexOf(':') + 2, item.lastVisit.length)
                    );
                    visit.renderStorage();

                    quickSearch();
                    showMore();
                    editClick();
                    cancelEditing();
                    deleteClick();
                    isEmptyTable();
                });
            });


    }
}
login();

addBtn.addEventListener('click', (e) => {
    cardForm.classList.toggle('dn');
    getAllCards();
});

document.querySelector('.cancel-creation-btn').addEventListener('click', (e) => {
    cardForm.classList.add('dn');
});



