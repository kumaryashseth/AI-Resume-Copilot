# 🚀 AI Resume Copilot

An AI-powered Resume Builder and Career Assistant built using the **MERN Stack** and **Google Gemini AI**.

This project helps users create professional resumes, analyze ATS scores, match resumes with job descriptions, generate cover letters, rewrite resume bullet points, prepare for interviews, and much more.

---

# ✨ Features

## 👤 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

---

## 📄 Resume Builder

* Create Resume
* Update Resume
* Delete Resume
* View Resume
* Multiple Resume Support

---

## 📤 Resume Upload

* Upload PDF Resume
* Extract Resume Text
* Store Resume
* Secure File Upload using Multer

---

## 🤖 AI ATS Resume Analyzer

* ATS Score
* Resume Strengths
* Weaknesses
* Missing Keywords
* AI Suggestions

---

## 🎯 Job Description Matcher

* Resume vs Job Description
* Match Score
* Matched Skills
* Missing Skills
* AI Recommendations

---

## ✍ AI Resume Rewriter

Rewrite resume bullet points professionally using Gemini AI.

---

## 📝 AI Resume Summary Generator

Generate professional resume summaries automatically.

---

## 💼 AI Cover Letter Generator

Generate ATS-friendly cover letters for any company and job role.

---

## 🎤 AI Mock Interview

Generate:

* Technical Questions
* HR Questions
* Behavioral Questions
* Difficulty Level
* Answer Tips

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Material UI
* Tailwind CSS
* Axios
* React Router DOM

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Multer

---

## AI

* Google Gemini API

---

## PDF Processing

* pdf-parse-fork

---

# 📂 Project Structure

```
AI-Resume-Copilot

frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── routes/
│   └── context/
│
backend/
│
├── controllers/
├── routes/
├── middleware/
├── models/
├── services/
├── uploads/
├── utils/
└── server.js
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Resume-Copilot.git
```

---

## Backend

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

Start Server

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Resume

```
GET /api/resume/my

POST /api/resume

PUT /api/resume/:id

DELETE /api/resume/:id
```

---

## Resume Upload

```
POST /api/upload/resume
```

---

## ATS Analysis

```
POST /api/analyze/:resumeId
```

---

## JD Matcher

```
POST /api/analyze/jd
```

---

## Resume Rewriter

```
POST /api/analyze/rewrite
```

---

## AI Summary

```
POST /api/analyze/summary
```

---

## Cover Letter

```
POST /api/cover-letter/generate
```

---

## Mock Interview

```
POST /api/mock-interview/generate
```

---

# 📸 Screenshots

Add screenshots here after deployment.

```
Dashboard

Resume Builder

ATS Analyzer

JD Matcher

Resume Rewriter

Cover Letter Generator

Mock Interview
```

---

# 🚀 Future Improvements

* Resume Templates
* Resume PDF Export
* Resume Version History
* AI Career Roadmap
* AI Salary Prediction
* LinkedIn Resume Optimizer
* Voice Mock Interview
* Dark Mode
* Admin Dashboard
* Email Notifications
* Docker Deployment

---

# 🧪 Testing

Backend APIs tested using:

* Postman

Frontend tested using:

* Chrome
* Edge

---

# Deployment

Frontend

* Vercel
* Netlify

Backend

* Render
* Railway

Database

* MongoDB Atlas

---

# Author

**Yash Verma**

MCA (AI & Machine Learning)

Institute of Engineering and Technology (IET), Lucknow

GitHub:
https://github.com/kumaryashseth

LinkedIn:
https://www.linkedin.com/in/kumaryashseth

---

# ⭐ Support

If you like this project,

⭐ Star this repository

🍴 Fork it

🛠 Contribute

---

# 📄 License

This project is licensed under the MIT License.
