import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.CountCtrl.findAll)
router.get('/:id',indexCtrl.CountCtrl.findOne)
router.get('/rel',indexCtrl.CountCtrl.findRel)
router.post('/',indexCtrl.CountCtrl.create)
router.put('/:id',indexCtrl.CountCtrl.update)
router.delete('/:id',indexCtrl.CountCtrl.deleted)
router.get ('/sql/:id',indexCtrl.CountCtrl.querySQL)
export default router