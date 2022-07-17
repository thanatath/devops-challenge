const logger = require('../config/logger');
const client = require('../config/redis')
const { HttpStatus } = require('../const');

const createUser = async(req, res) => {
    try {
        const { username } = req.body;
        const userDetails = JSON.stringify({
            "userName": username,
            "status": "success",
        })
        await client.SET("username:" + username, userDetails);

        res.status(HttpStatus.OK).json({ message: `Create user ${username} success.`});
    } catch (error) {
        logger.error(`createUser middleware get such error: ${error}`);
    }
};

const getUser = async(req, res) => {
    try {
        const isExist = await client.EXISTS("username:" + req.params.username);
        
        if (!isExist) {
            res.status(HttpStatus.NOT_FOUND).json({ message: `User not found.`});
            return;
        }
        property = await client.GET("username:" + req.params.username)

        res.status(HttpStatus.OK).json(JSON.parse(property));        
    } catch (error) {
        logger.error(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { username } = req.body;
        const isExist = await client.EXISTS("username:" + username);
        if (!isExist) {    
            res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found.'});
            return;
        }
        await client.DEL("username:" + username);

        res.status(HttpStatus.OK).json({ message: `Delete user ${username} success.`});
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    createUser,
    getUser,
    deleteUser,
};