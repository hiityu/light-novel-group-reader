const novelscrapper = require('./novelscrapper');
(async () => {
    await novelscrapper.initalize('master-of-martial-arts-has-an-advanced-optical-brain/');

    let results = await novelscrapper.getResults(5);
})();