export function getLocale() {
    if (process.env.BROWSER) {
        return window.localStorage.getItem('locale') || window.navigator.language || window.navigator.userLanguage;
    }
    return 'en';
}

export function setLocale(locale) {
    if (process.env.BROWSER) {
        window.localStorage.setItem('locale', locale);
    } else {

    }
}
