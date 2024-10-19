import Session, { validateSession } from "../models/Session.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json({ success: true, result: sessions });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get sessions, try again later" });
  }
};

export const createSession = async (req, res) => {
  try {
    const { session } = req.body;

    if (typeof session !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'session' object. Received: ${JSON.stringify(
          session,
        )}`,
      });

      return;
    }

    const errorList = validateSession(session);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newSession = await Session.create(session);

      res.status(201).json({ success: true, session: newSession });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create session, try again later" });
  }
};