const timeout = 15000;
// test d'inscription
describe("Register", () => {
    let page;
    // vérification du système d'inscription
    test('basic register', async () => {
        await page.goto('http://polr.stationmyr.net/');
        await page.waitForSelector('#navbar li a');
        // click sur le lien "sign up" de la navigation
        await page.evaluate( () => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign Up')[0].click();
        });
        await page.waitForSelector('.container form [name=username]');
        await page.type('.container form [name=username]', 'maxime');

        await page.waitForSelector('.container form [name=password]');
        await page.type('.container form [name=password]', '123456');

        await page.waitForSelector('.container form [name=email]');
        await page.type('.container form [name=email]', 'maxime.silva@le-campus-numerique.fr');

        await page.waitForSelector('.container form [type="submit"]');
        await page.click('.container form [type="submit"]');
        await page.screenshot({path: './tests/img/submit.png'});
    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)
});