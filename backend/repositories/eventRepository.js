const Event = require('../models/Event')

exports.getEventsByOrganizer = async (id) => {
    const events = await Event.findAll({
        where:{
            organizer: id
        }
    })
    return events
}