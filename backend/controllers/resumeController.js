import Resume from "../models/Resume.js";

const createResume = async (req, res) => {
  try {
    const {
      title,
      personalInfo,
      summary,
      skills,
      education,
      experience,
      projects,
    } = req.body;
    const resume = await Resume.create({
      user: req.user.id,
      title,
      personalInfo,
      summary,
      skills,
      education,
      experience,
      projects,
    });
    res.status(201).json({ success: true, resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.status(200).json({ success: true, resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }

    res.status(200).json({ success: true, resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(400).json({
        message: "Resume Not Found",
      });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(400).json({
        message: "Unauthorized",
      });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json({ success: true, updatedResume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(400).json({
        message: "Resume Not Found",
      });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(400).json({
        message: "Unauthorized",
      });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
