const statistic = require('./../statistic');

class Routes {
    constructor(app) {
        this.app = app;

    }

    setup() {
        this.app.post("/get-statistic3", async (req, res) => {
            let data = await statistic.getStatistic(3);
            res.send(data);
        });
        this.app.post("/get-statistic4", async (req, res) => {
            let data = await statistic.getStatistic(4);
            res.send(data);
        });

    }
}

module.exports = Routes;