const auth = require('../../services/auth/passport-jwt')();
const controller = require('./chat.controller.js');
const router = express.Router();

router.get('/', auth.authenticate(), controller.index);
router.get('/:userId', auth.authenticate(), controller.show);

module.exports = router;
