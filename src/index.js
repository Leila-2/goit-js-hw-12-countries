import './sass/main.scss'
import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
import debounce from 'lodash.debounce'

import countryListTemplate from './templates/country-list.hbs'
import countryCardTemplate from './templates/country-card.hbs'
import fetchCountry from './js/fetchCountries'
import refs from './js/refs'
////////-----------------------------

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
    inputCleaner();
    const searchQuery = refs.input.value.trim()
    fetchCountry(searchQuery).then(country => {
        if (country.length > 10) {
            error({
                title: 'Ошибка',
                text: 'Сделайте запрос более специфичным: слишком много символов🤬',
            });
        } else if (country.status = 404) {
            error({
                itle: 'Ошибка',
                text: 'Такой страны нет🤷🏼‍♂️. Пожалуйста. введите более специфический запрос',
            })
        } else if (country.length === 1) {
            renderCards(country)
        } else if (country.length <= 10) {
            renderList(country)
        }


    })
        .catch((err) => Error)

}

function renderCards(country) {
    const markup = countryCardTemplate(country);
    refs.infoBox.innerHTML = markup
}
function renderList(country) {
    const listMarkup = countryListTemplate(country)
    refs.list.insertAdjacentHTML('beforeend', listMarkup)
}
function inputCleaner() {
    refs.infoBox.innerHTML = '';
    refs.input.innerHTML = '';
}
