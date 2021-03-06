const Router = require('koa-router');

// controllers
const ctrlMe = require('../../controllers/me');

const router = new Router();

router
  .get('/', ctrlMe.getMe)
  .delete('/', ctrlMe.deleteMe)
  .patch('/avatar', ctrlMe.setAvatar)
  .patch('/nickname', ctrlMe.setNickname)
  .patch('/password', ctrlMe.setPassword)
  .post('/buyskill', ctrlMe.buySkill)
  .post('/skillset', ctrlMe.addManyInSkillSet)
  .delete('/skillset', ctrlMe.delManyInSkillSet);

module.exports = router;
