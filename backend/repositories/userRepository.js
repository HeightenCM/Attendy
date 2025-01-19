const User = require("../models/User");


exports.getElementByEmail = async (userEmail) => {
    try {
        //console.log(userEmail)
        const user = await User.findOne({
            where: { email: userEmail }
        });

        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}