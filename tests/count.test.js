const timeout = 15000;
// série de tests sur les links dans dashboard
describe("Tests basiques", () => {
    let page;

    // test connexion
    test('home and connexion', async () => {
        await page.goto('http://polr.stationmyr.net/');
        await page.waitForSelector('.container-fluid > .navbar > .pull-right > .dropdown');
        await page.click('.container-fluid > .navbar > .pull-right > .dropdown');
        await page.waitForSelector('.container-fluid > .navbar > .pull-right > .dropdown > .dropdown-menu > form > [name=username]');
        await page.type('.container-fluid > .navbar > .pull-right > .dropdown > .dropdown-menu > form > [name=username]', 'jonathanmrn');
        await page.waitForSelector('.container-fluid > .navbar > .pull-right > .dropdown > .dropdown-menu > form > [name=password]');
        await page.type('.container-fluid > .navbar > .pull-right > .dropdown > .dropdown-menu > form > [name=password]', 'jonathan');
        await page.click('[type="submit"]');
        await page.screenshot({path: './tests/img/signin2.png'});
    }, timeout);

    // test de l'incrémenteur du nombre de clicks par shorten links
    test('connexion and dashboard links', async () => {
        await page.goto('http://polr.stationmyr.net/');
        await page.evaluate( () => {
            Array
                .from(document.querySelectorAll('.dropdown-menu li a'))
                .filter(el => el.textContent === 'Dashboard')[0].click();
        });
        await page.waitForSelector('.container .nav-pills .admin-nav-item a');
        await page.evaluate( () => {
            Array
                .from(document.querySelectorAll('.container .nav-pills .admin-nav-item a'))
                .filter(el => el.textContent === 'Links')[0].click();
        });

        // Récupération du nombre de clicks
        await page.waitForSelector('tbody tr td:nth-of-type(3)');
        const clicks = await page.$eval('tbody tr td:nth-of-type(3)', el => el.innerHTML);
        console.log(clicks);

        // Récupération du nombre de clicks
        await page.waitForSelector('tbody tr td:nth-of-type(1)');
        const linkEnding = await page.$eval('tbody tr td:nth-of-type(1)', el => el.innerHTML);
        console.log(linkEnding);

        await page.screenshot({path: './tests/img/clicksbefore.png'});
        await page.goto('http://polr.stationmyr.net/'+ linkEnding);
        await page.goto('http://polr.stationmyr.net/admin#links');

        // Récupération du nombre de clicks
        await page.waitForSelector('tbody tr td:nth-of-type(3)');
        const clicksAfter = await page.$eval('tbody tr td:nth-of-type(3)', el => el.innerHTML);
        console.log(clicksAfter);

        expect(parseInt(clicksAfter)).toBeGreaterThan(parseInt(clicks));
        await page.screenshot({path: './tests/img/clicksafter.png'});
    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)
});