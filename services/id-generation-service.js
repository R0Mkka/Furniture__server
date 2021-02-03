const { v4: uuid } = require('uuid');

class IdGenerationService {
  generate() {
    return uuid();
  }
}

module.exports = new IdGenerationService();
