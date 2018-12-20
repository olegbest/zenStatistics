const statistic = require('./../statistic');

class Routes {
    constructor(app) {
        this.app = app;

    }

    setup() {
        this.app.post("/get-statistic", async (req, res) => {
            let data = await statistic.getStatistic();
            res.send(data);
        });
        setInterval(async () => {
            await statistic.updateStatistic()
        }, 5 * 60 * 1000)
    }
}


module.exports = Routes;