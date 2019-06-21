const auth = require('../../services/auth/passport-jwt')();
const controller = require('./chat.controller.js');
const router = express.Router();

router.post('/message', auth.authenticate(), controller.create);
router.get('/connect', auth.authenticate(), controller.connect);
router.get('/connected', auth.authenticate(), controller.getConnected);
router.get('/users', auth.authenticate(), controller.getChatUsers);
router.get(
  '/conversation/:id?',
  auth.authenticate(),
  controller.getConversation
);

module.exports = router;
