const DButils = require('./lib/DButils');
const daysCondition = require('./data/conditionDays');

async function getStatistic() {
    let numberUsers = await DButils.getNumberUsers({});
    console.log(numberUsers);
    // let messages = await DButils.findMessages({});
    let aggregateOptions = [
        {
            $match: {
                isBot: true
            }
        },
        {
            "$group": {
                _id: {
                    $add: [
                        {$dayOfYear: "$dateCreate"}
                    ]
                },
                click: {$sum: 1},
                first: {$min: "$dateCreate"},
            }

        },
        {
            "$sort": {
                first: 1
            }
        }
    ];

    let countMessageByDateBot = await DButils.aggregateMessage(aggregateOptions);

    aggregateOptions[0].$match.isBot = false;

    let countMessageByDateUser = await DButils.aggregateMessage(aggregateOptions);
    // console.log(countMessageByDateUser);
    let days = {};
    let obj = {};

    let numberMessages = await DButils.getNumberMessages({});

    obj.info = {
        numberUsers,
        messages: {
            user: countMessageByDateUser,
            bot: countMessageByDateBot
        },
        numberMessages
    };


    // messages.forEach((el) => {
    //     if (!el.dateCreate) {
    //         console.log(el)
    //         el.dateCreate = el._id.getTimestamp();
    //         el.save();
    //     }
    // });

    for (let i = 0; i < 7; i++) {
        days[`day${i + 1}`] = {
            enterInDay: 0,
            numberAfterTestQuestion: 0,
            numberUserBeforePhoto: 0,
            numberUserAfterPhoto: 0,
            numberUserBeforeSovet: 0,
            numberUserAfterSovet: 0,
            numberUserGoToEnd: 0,
            numberUsers: 0
        }
    }

    // console.log(users.length);

    for (let key in days) {
        days[key].numberUsers = await DButils.getNumberUsers({day: key})
        if (daysCondition[key]) {
            let day = daysCondition[key];
            if (day.enterInDay) {
                let numberMessagesUser = await DButils.getNumberMessagesWithDisticnt({text: new RegExp(day.enterInDay)});
                days[key].enterInDay = numberMessagesUser;
                if (key === "day1") {
                    days[key].enterInDay = obj.info.numberUsers
                }
            }
            if (day.afterTest) {
                let numberMessagesUser = await DButils.getNumberMessagesWithDisticnt({text: new RegExp(day.afterTest)});
                days[key].numberAfterTestQuestion = numberMessagesUser;
            }
            if (day.afterPhoto) {
                let numberMessagesUser = await DButils.getNumberMessagesWithDisticnt({text: new RegExp(day.afterPhoto)});
                days[key].numberUserAfterPhoto = numberMessagesUser;
                days[key].numberUserBeforePhoto = Math.round((days[key].numberAfterTestQuestion + numberMessagesUser) / 2);
            }
            if (day.afterAdvice) {
                let numberMessagesUser = await DButils.getNumberMessagesWithDisticnt({text: new RegExp(day.afterAdvice)});
                days[key].numberUserAfterSovet = numberMessagesUser;
                days[key].numberUserBeforeSovet = Math.round((days[key].numberUserAfterPhoto + numberMessagesUser) / 2);
            }
            if (day.theEnd) {
                let numberMessagesUser = await DButils.getNumberMessagesWithDisticnt({text: new RegExp(day.theEnd)});
                days[key].numberUserGoToEnd = numberMessagesUser;
            }
        }
    }
    obj.days = days;

    return obj;
}

function getUniqueMessages(messagesUser) {
    let arr = [];
    for (let i = 0; i < messagesUser.length; i++) {
        if (arr.indexOf(messagesUser[i].user_id) === -1) {
            arr.push(messagesUser[i].user_id);
        }
    }
    return arr;
}

module.exports = {
    getStatistic
}