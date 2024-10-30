import express from 'express';
import { summaryController } from '../controller/summary.controller';

const summaryRoute = express.Router();

summaryRoute.post('/', summaryController.createSummary);
summaryRoute.get('/', summaryController.getAll);

export default summaryRoute;