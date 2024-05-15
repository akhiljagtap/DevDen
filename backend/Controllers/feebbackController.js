import { Feedback } from "../models/feedbackModel.js";

export const feedback = async (req, res) => {
    const { feedback } = req.body;
    try {
        const newFeedBack = Feedback({ feedback })
    await newFeedBack.save()

    res.status(200).json({ message: "Feedback save successfully" })
        
    } catch (error) {
        console.log(error,"feedback error@");
    }


}