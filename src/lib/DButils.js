const mongooseModels = require('./mongoose');
const userModel = mongooseModels.article_model_user;
const PostsModel = mongooseModels.article_model_post;
const MessagesModel = mongooseModels.article_model_message;
const CountMessageModel = mongooseModels.article_model_count_message;
const StatisticModel = mongooseModels.article_model_statistic;

module.exports = {

    async findUser(id) {
        return await userModel.findOne({"id": id});
    },

    async deleteUser(id) {
        return await userModel.deleteOne({"id": id})
    },

    async getAllUsers() {
        return await userModel.find({});
    },

    async getNumberUsers(data) {
        return await userModel.count(data);
    },

    async getAllUsersWithSort(sortParam) {
        return await userModel.find({}).sort(sortParam);
    },

    async newUser(data) {
        let user = new userModel(data);
        return await user.save();
    },

    async updateUser(id, data) {
        return await userModel.findOneAndUpdate({id: id}, data)
    },

    async newMessage(data) {
        let message = new MessagesModel(data);
        return await message.save();
    },
    async findMessages(data) {
        return await MessagesModel.find(data);
    },

    async getNumberMessages(data) {
        return await MessagesModel.count(data);
    },

    async getNumberMessagesWithDisticnt(data) {
        let res = await MessagesModel.count(data).distinct("user_id");
        return res.length;
    },

    async aggregateMessage(data) {
        return await MessagesModel.aggregate(data);
    },

    async findPost(id) {
        return await PostsModel.findOne({"id": id});
    },

    async newPost(data) {
        let post = new PostsModel(data);
        return await post.save();
    },

    async updatePost(id, data) {
        return await PostsModel.findOneAndUpdate({id: id}, data)
    },
    async findCountMessage(id) {
        return await CountMessageModel.findOne({"id": id});
    },
    async updateCountMessage(id, data) {
        return await CountMessageModel.findOneAndUpdate({id: id}, data)
    },
    async findStatistic() {
        return await StatisticModel.findOne({"id": 1});
    },
    async newStatistic(data) {
        let stats = new StatisticModel(data);
        return await stats.save();
    },
    async updateStatistic(data) {
        return await StatisticModel.findOneAndUpdate({id: 1}, data)
    },
};