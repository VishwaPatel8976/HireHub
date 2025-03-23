import express from "express";
import { changeJobApplicationStatus, changeVisibility, getCompanyData,getCompanyPostedJobs, getCompanyJobApplicants, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();

//Register a company
router.post('/register',upload.single('image'), registerCompany);

//company login
router.post('/login', loginCompany);

//Get company data
router.get('/company',protectCompany, getCompanyData)

//post a job
router.post('/post-job',protectCompany, postJob)

//Get Applicants Data of Company
router.get('/applicants',protectCompany, getCompanyJobApplicants)

//Get Company Job List
router.get('/list-jobs',protectCompany, getCompanyPostedJobs)

//change Application status
router.post('/change-status',protectCompany, changeJobApplicationStatus)

//change Application visibility
router.post('/change-visibility',protectCompany, changeVisibility)

export default router;