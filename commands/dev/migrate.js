const { Command } = require('discord.js-commando');
const Util = require('discord-helpers/util');

/**
 * Command responsible for retrieving tracks via youtube data API and saving to memory
 * @type {module.SearchCommand}
 */
module.exports = class MigrateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'migrate',
            aliases: [],
            group: 'developer',
            memberName: 'migrate',
            description: 'Migrates bot data',
            examples: ['migrate'],
            guildOnly: false,
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    /**
     * @param msg
     * @param args
     * @returns {Promise.<*>}
     */
    async run(msg, args) {
        let loaderMsg;
        try {
            let indicatorMsg = (await msg.say('Migrating database data...'));
            loaderMsg = await Util.constructLoadingMessage(await msg.say(':hourglass_flowing_sand:'), ':hourglass_flowing_sand:');

            await this.client.repository.migration.setUp(this.client);
            indicatorMsg.delete();
            await loaderMsg.delete();
            (await msg.say('Done!')).delete(2000);
        } catch (e) {
            if (loaderMsg && typeof loaderMsg.delete === 'function') loaderMsg.delete();
            console.log(e);
            return msg.say('Something went horribly wrong! Please try again later.')
        }
    }
};