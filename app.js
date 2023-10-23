let seatParent = document.querySelectorAll(".seat-parent");
let seatsContainer = document.querySelector(".seats-wrapper");
let confirmSeatsBtn = document.querySelector(".confirmSeatsBtn");
let priceOfSeats = document.querySelector(".seat-identifier .selected-seats");

let seatArray = [];

initialApp();

function addEvents() {
    seatParent.forEach((el) => {
        el.addEventListener("click", function () {
            booking(this)
        })
    })

    confirmSeatsBtn.addEventListener("click", () => {
        addTheSeatToLocalstorage(seatArray);
        console.log(calcTotal());
    })
}

function booking(seat) {
    addUnavailableClassOnSeat(seat)
    checkTheSeat(seat)
}

function addUnavailableClassOnSeat(thisSeatParent) {
    let seat = thisSeatParent.querySelector(".seat")
    if (!seat.classList.contains("unavaliable-frame")) {
        seat.classList.toggle("your-seat-frame");
    }
}

function checkTheSeat(thisSeatParent) {
    let seat = thisSeatParent.querySelector(".seat");
    if (seat.classList.contains("your-seat-frame")) {
        addToArray(thisSeatParent.dataset.id, thisSeatParent.dataset.price);
    } else {
        removeTheSeat(thisSeatParent)
    }
}

function addToArray(id, price) {
    let seatObj = {
        seatId: id,
        seatPrice: parseInt(price),
    }
    seatArray.push(seatObj);
}

function removeTheSeat(seat) {
    seatArray = seatArray.filter((el) => {
        return el.seatId != seat.dataset.id;
    })
}

function checkTheYourseatAndDisplay() {

    for (let i = 0; i < seatParent.length; i++) {
        for (let j = 0; j < seatArray.length; j++) {
            if (seatParent[i].dataset.id == seatArray[j].seatId) {
                let selectedSeat = seatParent[i].querySelector(".seat");
                selectedSeat.classList.add("your-seat-frame");
            }
        }
    }

}

function calcTotal() {
    let seatsAmount = seatArray.length;
    let totalPrice = seatArray.reduce((total, seat) => {
        return total + seat.seatPrice;
    }, 0);
    priceOfSeats.innerHTML = `Price: x${seatsAmount} Ticket - ${totalPrice} EGP`;
}

function addTheSeatToLocalstorage(list) {
    let movieName = "expendables";
    return window.localStorage.setItem(movieName, JSON.stringify(list))
}

function getTheSeatFromLocalstorage() {
    return JSON.parse(localStorage.getItem("expendables")) || [];
}

function initialApp() {
    seatArray = getTheSeatFromLocalstorage();
    checkTheYourseatAndDisplay();
    addEvents();
    calcTotal();
}