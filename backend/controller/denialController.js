import { getDenialResolution } from "../utils/denialResolver.js";

export const resolveDenial = async (req, res) => {
  try {
    const { denialCode, payer, procedure } = req.body;
    const resolution = await getDenialResolution(denialCode, payer, procedure);
    res.json({ success: true, resolution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
