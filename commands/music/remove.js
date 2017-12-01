const { Command } = require('discord.js-commando');

module.exports = class RemoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'remove',
            aliases: ['delete', 'rm', 'del', 'dl'],
            group: 'music',
            memberName: 'remove',
            description: 'Removes track(s) from music player',
            examples: ['stop'],
            guildOnly: true,
            args:[
                {
                    key: 'number',
                    prompt: 'Enter valid track number in the queue. Enter `all` if you want to delete `ALL` tracks in music queue.',
                    type: 'string',
                    validate: number => {
                        return parseInt(number) || number.toLowerCase() === 'all';
                    }
                }
            ]
        });
        this.client.music.on('remove', async (text, guild) => {
            let channel = guild.channels.find('type', 'text');
            if (channel) (await channel.send(text)).delete(12000);
            else console.log(`No text channel found for guild ${guild.id}/${guild.name} to send event message.`)
        });
    }

    /**
     *
     * @param msg
     * @returns {Promise.<Message|Message[]>}
     */
    async run(msg, args) {
        try {
            await this.client.music.removeTrack(msg.guild, args.number)
        } catch (e) {
            console.log(e);
            return msg.say('Something went horribly wrong! Please try again later.');
        }
    }
};