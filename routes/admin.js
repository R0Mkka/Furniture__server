const express = require('express');
const adminRouter = express.Router();

const feedbacksService = require('../services/feedbacks-service');
const entriesService = require('../services/entries-service');

adminRouter.get('/', (req, res) => {
    const userWithoutPassword = { ...req.user };
    delete userWithoutPassword.password;
    res.render('pages/admin', { user: userWithoutPassword });
});

adminRouter.get('/feedbacks', (req, res) => {
    if (req.query && req.query.filter) {
        const { filter } = req.query;
        return feedbacksService
            .getFilteredFeedbacks(filter)
            .then(filteredFeedbacks => res.render(
                'pages/admin-feedbacks',
                { feedbacks: filteredFeedbacks, filter },
            ))
            .catch(error => res.render('pages/admin-feedbacks', { error }));
    }

    feedbacksService
        .getAllFeedbacks()
        .then(feedbacks => res.render('pages/admin-feedbacks', { feedbacks, filter: 'all' }))
        .catch(error => res.render('pages/admin-feedbacks', { error }));
});

adminRouter.get('/statistics', (req, res) => {
    Promise.all([
        entriesService.getAllTodaysEntries(),
        entriesService.getUniqueTodaysEntries(),
    ])
    .then(([ todaysEntries, uniqueTodaysEntries ]) => {
        return res.render('pages/admin-statistics', { todaysEntries, uniqueTodaysEntries });
    })
    .catch(error => res.render('pages/admin-statistics', { error }));
});

adminRouter.post('/feedbacks/publish', (req, res) => {
    return feedbacksService
        .publishFeedback(req.body.id)
        .then(() => {
            const redirectUrl = req.body.filter
                ? `/admin/feedbacks?filter=${req.body.filter}`
                : '/admin/feedbacks';
            res.redirect(redirectUrl);
        })
        .catch(error => res.render('pages/admin-feedbacks', { error }));
});

adminRouter.post('/feedbacks/archive', (req, res) => {
    return feedbacksService
        .archiveFeedback(req.body.id)
        .then(() => {
            const redirectUrl = req.body.filter
                ? `/admin/feedbacks?filter=${req.body.filter}`
                : '/admin/feedbacks';
            res.redirect(redirectUrl);
        })
        .catch(error => res.render('pages/admin-feedbacks', { error }));
});

adminRouter.post('/feedbacks/delete', (req, res) => {
    return feedbacksService
        .deleteFeedback(req.body.id)
        .then(() => {
            const redirectUrl = req.body.filter
                ? `/admin/feedbacks?filter=${req.body.filter}`
                : '/admin/feedbacks';
            res.redirect(redirectUrl);
        })
        .catch(error => res.render('pages/admin-feedbacks', { error }));
});

module.exports = adminRouter;
