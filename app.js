"use strict"

var map = L.map('map').setView([50.882430, 20.590563], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// select elements
const ipEl = document.getElementById("ip");
const locationEl = document.getElementById("location");
const timezoneEl = document.getElementById("timezone");
const ispEl = document.getElementById("isp");
const messageEl = document.querySelector(".message");

const inputEl = document.querySelector("input");
const btnEl = document.querySelector("button");

const apiKey = "at_ka5wnXbJ4ySiypK0qIH1sO8U4LxCE";
// var marker = L.marker([52.22977, 21.01178]).addTo(map);

function getLocation() {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_ka5wnXbJ4ySiypK0qIH1sO8U4LxCE&ipAddress=${inputEl.value}`).then((response) => response.json()).then((data) => {
        if (data.messages) {
            console.log('error');
            messageEl.innerText = data.messages;
        } else {
            console.log('success', data);
            ipEl.innerText = data.ip;
            locationEl.innerText = `${data.location.country}, ${data.location.city}`;
            timezoneEl.innerText = "UTC" + data.location.timezone;
            ispEl.innerText = data.isp;
            messageEl.innerText = '';
            var marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
            map.panTo(new L.LatLng(data.location.lat, data.location.lng));
        }
    })
        .catch((error) => {
            console.error('Error:', error);
        });

    inputEl.value = "";
}

function yourIP() {
    fetch("https://api.ipify.org?format=json").then((response) => response.json()).then((data) => {
        console.log('success', data)
        ipEl.innerText = data.ip;
        getLocation();
    })
        .catch((error) => {
            console.error('Error:', error);
        });
    inputEl.value = "";
}

document.addEventListener("DOMContentLoaded", yourIP);
btnEl.addEventListener("click", getLocation);