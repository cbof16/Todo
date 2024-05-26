const express  =  require('express')
const router = express.Router()
const {getalltasks,createtask,updatetask,gettask,deletetask} = require('../controllers/tasks')


router.route('/').get(getalltasks).post(createtask)
router.route('/:id').get(gettask).patch(updatetask).delete(deletetask)

module.exports = router
