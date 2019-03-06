"use strict";

const infosource = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
        const cities = [];

        fetch(infosource)
        .then(dataReturned => dataReturned.json())
        .then(data => cities.push(...data));

        function matchWord(wordToMatch, cities) {

            const word = new RegExp(wordToMatch, 'gi');
            return cities.filter(function (place) {

                return place.city.match(word) || place.state.match(word);
            })
        }

        const search = document.querySelector('.search');
        const suggestions = document.querySelector('.suggestions');

        search.addEventListener('keyup', displayMatches);

        function numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        function displayMatches(val) {
            const matchArray = matchWord(val.target.value, cities);
            const html = matchArray.map(place => {

                const regex = new RegExp(val.target.value, 'gi');
                const cityName = place.city.replace(regex, `<span class="hl">${val.target.value}</span>`);
                const stateName = place.state.replace(regex, `<span class="hl">${val.target.value}</span>`);

                return `<li>
                            <span class ="name">${cityName} ${stateName}</span>
                            <span class="population">${numberWithCommas(place.population)}</span>
                        </li>`;
                }).join('');
            suggestions.innerHTML = html;
        }