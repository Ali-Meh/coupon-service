import express, { NextFunction, Request, Response } from 'express'
import { ExpressError } from '../components/util/ErrorHandler';
import v1 from './v1'

const router = express.Router()

router.use('/api/v1', v1)

router.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    ExpressError.handleError(err, res)
})

export default router

module.exports = router