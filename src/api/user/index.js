const auth = require('../../services/auth/passport-jwt')();
const controller = require('./user.controller');
const router = express.Router();
const accountMiddleware = require('../../middleware/account.middleware');

router.get(
  '/:id',
  auth.authenticate(),
  accountMiddleware.show,
  controller.show
);
router.get('/search', auth.authenticate(), controller.search);
router.post('/', controller.createLocalAccount);
router.put('/:id', auth.authenticate(), controller.update);
router.patch('/:id', auth.authenticate(), controller.update);
router.delete('/:id', auth.authenticate(), controller.destroy);

module.exports = router;
