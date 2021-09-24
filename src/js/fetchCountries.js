function fetchCountries(searchQuery) {
    const BASE_URL = 'https://restcountries.com/v3/name/';
    const params = 'fields=name;capital;population;flag;languages';

    return fetch(`${BASE_URL}${searchQuery}?${params}`).then(response => response.json()
    )
}

export default fetchCountries

