const infosource = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
        const cities = [];

        fetch(infosource)
        .then(a => a.json())
        .then(a => cities.push(...a));

        function matchWord(wordToMatch, cities) {

            const word = new RegExp(wordToMatch, 'gi');
            return cities.filter(function (a) {

                return a.city.match(word) || a.state.match(word);
            })
        }

        const search = document.querySelector('.search');
        const suggestions = document.querySelector('.suggestions');

        search.addEventListener('keyup', displayMatches);

        function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        function displayMatches(val) {
            const matchArray = matchWord(val.target.value, cities);
            const html = matchArray.map(a => {

                const regex = new RegExp(val.target.value, 'gi');
                const cityName = a.city.replace(regex, `<span class="hl">${val.target.value}</span>`);
                const stateName = a.state.replace(regex, `<span class="hl">${val.target.value}</span>`);

                return `<li>
                            <span class ="name">${cityName} ${stateName}</span>
                            <span class="population">${numberWithCommas(a.population)}</span>
                        </li>`;
                }).join('');
            suggestions.innerHTML = html;
        }