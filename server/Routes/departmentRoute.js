import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.depCtrl.findAll)
router.get('/rel',indexCtrl.depCtrl.findRel)
router.get('/:id',indexCtrl.depCtrl.findOne)
router.post('/',indexCtrl.depCtrl.create)
router.put('/:id',indexCtrl.depCtrl.update)
router.delete('/:id',indexCtrl.depCtrl.deleted)
router.get ('/sql/:id',indexCtrl.depCtrl.querySQL)
export default router