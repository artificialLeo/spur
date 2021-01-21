'use strict';

//const token = '840f4b56565c';

export function checkPass(mail, pass) {
    fetch('http://cards.danit.com.ua/login', {
        method: 'POST',
        body: JSON.stringify({
            email: `${mail}`,
            password: `${pass}`,
        })
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (json.status === 'Success') {
                localStorage.setItem('token', json.token);
            }
        });
}

/*
export function addCard() {
    fetch('http://cards.danit.com.ua/cards', {
        method: 'POST',
        body: JSON.stringify({
            email: 'horkovenko.k@gmail.com',
            password: '1',
        }),
        headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`

        }
    })
        .then(response => response.json())
        .then(json => console.log(json));
}
*/
 
export function deleteCard(i) {
    fetch('http://cards.danit.com.ua/cards/' + i, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export function getAllCards() {
    fetch('http://cards.danit.com.ua/cards', {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }})
        .then(response => response.json())
        .then(json => {
            console.log('/////////////////////////////////');
            // json.forEach(it => console.log(it.id)  )
            console.log(json);
        })
}

export function editCard(i, doctor, target, info, urgent, pressure, bwi, pastDis, age, name, lastVisit) {
    fetch('http://cards.danit.com.ua/cards/' + i, {
        method: 'PUT',
        body: JSON.stringify({
            doctor: doctor,
            target: target,
            info: info,
            urgent: urgent,
            pressure: pressure,
            bwi: bwi,
            pastDis: pastDis,
            age: age,
            name: name,
            lastVisit: lastVisit,

        }),
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))

}

