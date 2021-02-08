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

    getFilteredFeedbacks(filterValue) {
        let source = null;

        switch (filterValue) {
            case 'all':
                source = this.getAllFeedbacks();
                break;
            case 'published':
                source = this.queryFeedbacks({ isPublished: true });
                break;
            case 'archived':
                source = this.queryFeedbacks({ isPublished: false });
                break;
            default:
                source = this.getAllFeedbacks();
                break;
        }

        return source;
    }
    
    queryFeedbacks(queryObject) {
        return Feedback
            .find(queryObject)
            .catch((error) => {
                console.error('ERROR WHILE QUERING FEEDBACKS!', error);
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

    publishFeedback(id) {
        return Feedback
            .updateOne({ id }, { $set: { isPublished: true } })
            .catch((error) => {
                console.error('ERROR WHILE FEEDBACK PUBLISHING!', error);
                throw error;
            });
    }

    archiveFeedback(id) {
        return Feedback
            .updateOne({ id }, { $set: { isPublished: false } })
            .catch((error) => {
                console.error('ERROR WHILE FEEDBACK ARCHIVING!', error);
                throw error;
            });
    }
}

module.exports = new FeedbacksService();
