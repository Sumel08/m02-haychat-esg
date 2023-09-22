import axios from 'axios';

export const notificationHandler = async (req, res) => {
    const {conversationId, userId, message} = req.body;
    message.author = "echo@haystack.com";
    message.sentBy = process.env.service;
    message.text.body = `Echo Lemus: ${message.text.body}`;
    try {
        await axios.post('https://us-central1-haystack-dot.cloudfunctions.net/chatWebhook', {conversationId, userId, message})
    } catch (error) {
        return res.status(400).json({message: "something went wrong"})
    }
    return res.status(201).json({message: "ok"})
}
