const getAllAdoptions = async (req, res) => {
  try {
    return res.status(200).json({
      status: "success",
      payload: []
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

const getAdoption = async (req, res) => {
  try {
    const { aid } = req.params;

    if (!aid || aid.length < 10) {
      return res.status(400).json({
        status: "error",
        message: "Invalid adoption id"
      });
    }

    return res.status(404).json({
      status: "error",
      message: "Adoption not found"
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;

    if (!uid || uid.length < 10) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user id"
      });
    }

    if (!pid || pid.length < 10) {
      return res.status(400).json({
        status: "error",
        message: "Invalid pet id"
      });
    }

    return res.status(201).json({
      status: "success",
      payload: {
        owner: uid,
        pet: pid
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

module.exports = {
  getAllAdoptions,
  getAdoption,
  createAdoption
};