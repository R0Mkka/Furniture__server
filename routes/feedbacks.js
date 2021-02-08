const express = require('express');
const feedbacksRouter = express.Router();

const feedbacksService = require('../services/feedbacks-service');

feedbacksRouter.get('/', (req, res) => {
    feedbacksService
        .getAllFeedbacks()
        .then(allNotes => res.status(200).send(allNotes));
});

feedbacksRouter.post('/', (req, res) => {
    feedbacksService
        .createFeedback(req.body)
        .then(newNote => res.status(201).send(newNote));
});

feedbacksRouter.delete('/:feedbackId', async (req, res) => {
    const { feedbackId } = req.params;

    feedbacksService
        .getFeedbackById(feedbackId)
        .then(feedbackToDelete => Promise.all([
            feedbackToDelete,
            feedbacksService.deleteFeedback(feedbackId),
        ]))
        .then(([ feedbackToDelete, dbResponse ]) => {
            if (dbResponse.ok) {
                res.status(200).send(feedbackToDelete);
            } else {
                res.status(400).send({ dbResponse, message: 'Feedback deletion error!' });
            }
        });
});

module.exports = feedbacksRouter;