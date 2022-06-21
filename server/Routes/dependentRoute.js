import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.DpenCtrl.findAll)
router.get('/rel',indexCtrl.DpenCtrl.findRel)
router.get('/:id',indexCtrl.DpenCtrl.findOne)
router.post('/',indexCtrl.DpenCtrl.create)
router.put('/:id',indexCtrl.DpenCtrl.update)
router.delete('/:id',indexCtrl.DpenCtrl.deleted)
router.get ('/sql/:id',indexCtrl.DpenCtrl.querySQL)
export default router