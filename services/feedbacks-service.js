const idGenerationService = require('./id-generation-service');
const Feedback = require('../schemas/feedback');

class FeedbacksService {
    getAllFeedbacks() {
        return Feedback
            .find()
            .catch((error) => {
                console.error('ERROR WHILE GETTING ALL FEEDBACKS!', error);
                throw error;
            });
    }
    
    getFilteredFeedbacks(filterObject) {
        return Feedback
            .find(filterObject)
            .catch((error) => {
                console.error('ERROR WHILE GETTING FILTERED FEEDBACKS!', error);
                throw error;
            });
    }

    getFeedbackById(id) {
        return Feedback
            .findOne({ id })
            .catch((error) => {
                console.error('ERROR WHILE GETTING FEEDBACK BY ID!', error);
                throw error;
            });
    }

    createFeedback(feedbackData) {
        const id = idGenerationService.generate();
        const addedAt = new Date();
        const feedback = new Feedback({ ...feedbackData, id, addedAt });
        return feedback
            .save()
            .catch((error) => {
                console.error('ERROR WHILE FEEDBACK CREATION!', error);
                throw error;
            });
    }

    deleteFeedback(id) {
        return Feedback
            .deleteOne({ id })
            .catch((error) => {
                console.error('ERROR WHILE FEEDBACK DELETING!', error);
                throw error;
            });
    }
}

module.exports = new FeedbacksService();
