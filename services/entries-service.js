const moment = require('moment');

const idGenerationService = require('./id-generation-service');

const Entry = require('../schemas/entry');

class EntriesService {
    getAllEntries() {
        return Entry
            .find()
            .catch(error => {
                console.error('ERROR WHILE GETTING ALL ENTRIES!')
                throw error;
            });
    }
    
    getAllTodaysEntries() {
        const now = moment();
        return this.getAllEntries()
            .then(entries => entries.filter(singleEntry => {
                const entryDate = moment(singleEntry.date.getTime());
                return now.diff(entryDate, 'day') === 0;
            }))
            .catch(error => {
                console.error('ERROR WHILE GETTING ALL TODAYS ENTRIES!')
                throw error;
            });
    }

    getUniqueTodaysEntries() {
        return this.getAllTodaysEntries()
            .then(entries => entries.reduce((entriesDict, nextEntry) => {
                entriesDict[nextEntry.ip] = { id: nextEntry.id, date: nextEntry.date };
                return entriesDict;
            }, {}))
            .then(entriesDict => Object.entries(entriesDict).map(([ entryIp, entryData ]) => ({
                id: entryData.id,
                ip: entryIp,
                date: entryData.date,
            })))
            .catch(error => {
                console.error('ERROR WHILE GETTING UNIQUE TODAYS ENTRIES!')
                throw error;
            });
    }

    addEntry(ip, date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        const newEntryId = idGenerationService.generate();
        const newEntry = new Entry({ id: newEntryId, ip, date });
        return newEntry
            .save()
            .catch(error => {
                console.error('ERROR WHILE ENTRY SAVING!')
                throw error;
            });
    }
}

module.exports = new EntriesService();
