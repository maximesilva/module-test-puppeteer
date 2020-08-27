const timeout = 15000;

// série de tests sur la page d'accueil
describe("Tests basiques", () => {
    let page;

    // test connexion admin
    test('home and connexion', async () => {
        await page.goto('http://polr.stationmyr.net/');

        await page.waitForSelector('.container-fluid > .navbar > .pull-right > .dropdown');
        await page.click('.container-fluid > .navbar > .pull-right > .dropdown');

        await page.waitForSelector('.container-fluid > .navbar > .pull-right > .dropdown > .dropdown-menu > form > [name=username]');
        await page.type('.container-fluid > .navbar > .pull-right > .dropdown > .dropdown-menu > form > [name=username]', 'admin');

        await page.waitForSelector('.container-fluid > .navbar > .pull-right > .dropdown > .dropdown-menu > form > [name=password]');
        await page.type('.container-fluid > .navbar > .pull-right > .dropdown > .dropdown-menu > form > [name=password]', 'campus');

        await page.click('[type="submit"]');
        await page.screenshot({path: './tests/img/signin1.png'});
    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});