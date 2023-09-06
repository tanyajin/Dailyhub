const Event = require('../models/eventSchema')

exports.create = async (req, res) => {
  const { user } = req; // 假设已通过身份验证获取到当前用户信息
  const { id, title, start, end, allDay } = req.body; // 假设从请求体中获取事件数据

  try {
    const event = await Event.create({
      user: user._id,
      id,
      title,
      start,
      end,
      allDay
    });
    res.status(201).json(event);
  } catch (error) {
    console.log('Failed to create event:', error);
    res.status(500).json(error);
  }
  };


  exports.getAll = async (req, res) => {
    try {
        const Events = await Event.find({ find: req.user._id })
        res.status(200).json(Events)
    } catch (error) {
        console.log('展示所有事件失败')
        res.status(500).json(error)
    }
}
