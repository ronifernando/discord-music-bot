# discord-music-bot
Free, open source repo containing music playback code, clone/fork/contribute as you wish.

`<prefix>` indicates a bot command prefix set in `configs/app.json` file, by default it is `.` (dot)

_Out of the box you get_:

* Multiple Guild music playback support
* Performance - music data is kept in memory (map) and is saved only for preserving state (map - db sync)
* Docker deployment support
* Event based music/radio player implementation - making it easier to maintain & extend code
* Listen.moe J-POP Radio support
* Automatic event loading - easy to add/remove any Discord event code
* Good guide material to code bot of your own
* Data persistence support for mongodb (either via provided docker service or your own database server)

## How to Use / Set up

1. Install Node.js (7.6 ver or newer) / NPM package manager for your machine
2. Clone/Download repository if you haven't done so yet `git clone https://github.com/mindaugaskasp/discord-music-bot.git` or just download it as a ZIP
3. Set up app configuration data in `configs/app.json` file (youtube API token, Discord Application token, Owner ID(s), listen-moe radio etc)
4. Set up database configuration data in `configs/database.json`
5. Open terminal and change your working directory to project root (e.g. `cd <PathToProjectRoot>`) and run `npm install` in the terminal
6. In terminal run `npm run debug` - which basically will start `debug` script defined in `package.json`, run `npm run prod` for production.

**Skip [6th] step if you want to run app via docker, else skip to Final Steps part**

## How to Use / Set up - Docker Edition (extends How to Use / above instructions)
1. Install Docker & Docker Compose for your machine
2. Run `docker-compose run --build` in terminal to build image & run container. If you see `Logged In!` in terminal window. Your bot has started without any problems.

## Final Steps
Once you are done setting up the application, follow these steps to confirm you haven't encountered any issues.

1. Add bot to your discord guild by using link `https://discordapp.com/oauth2/authorize?client_id=<ClientID>&permissions=0&scope=bot`, where `<clientID>` is your Discord Application client ID of the application whose token you've set in `app.json` file
2. Confirm that application has started without any errors (look for `Logged In!` text in terminal)
3. Use command `<prefix>help` (default: `.help`) to view commands available in your discord guild, `<prefix>` is custom command prefix you can set in `configs/app.json` file. All commands must start by declaring the prefix first. E.g. If we have default prefix set as `!` then all commands would proceed with it and be initiated like so `!help` or `!join` etc. 
4. Use command `<prefix>migrate` (default `.migrate`) to migrate default database data

## User Guide

* Use command `<prefix>join` to make bot join voice channel you're currently in.
* Use command `<prefix>leave` to make bot leave active voice channel.
* Use command `<prefix>search [query]` to search for music (queries youtube API), where `[query]` is either a search text, e.g.: `daft punk get lucky` or a youtube link (a single track or a playlist link).
* Use command `<prefix>pick [choices]` to pick what song(s) to add from `search` command. The prompt to do so will be displayed after successful search attempt, but only for a track count >1 and < 50. Meaning if you search a whole playlist it will be loaded all without needing to select songs. `[choices]` is either a list of song numbers separated by commas, e.g. `1,2,3` or keywoord `all` to indicate that you want to pick all tracks.
* Use command `<prefix>play` to play what is saved in music player queue.
* Use command `<prefix>remove [songNumber]` to remove a song from music player queue, where `[songNumber]` is a valid song number between `1 - list length`. Keyword `all` indicates that you want to delete *ALL* songs in playlist. 
* Use command `<prefix>view [page=1]` to view music player queue. Basically the same as taking a look at the back of your tape to see whats in there :). [page=1] is an optional parameter for viewing your music queue in parts (image opening a specific page of the book) if you've got a lot of music in there.
$ Use command `<prefix>stash [page=1]` to view music search stash list. Similarly to the view command this command shows you a list of songs that are candidates to be saved to the music queue. Usually used after search command to pick what tracks you want to add. Stash always stores only the _latest_ search data.
* Use command `<prefix>pause` to pause currently playing voice stream. (The magical PAUSE button)
* Use command `<prefix>resume` to resume paused voice stream.
* Use command `<prefix>stop` to stop music playback altogether.
* Use command `<prefix>skip` to skip music player to the next song if available.
* Use command `<prefix>Jump [number]` to jump music player to specific song identified by its number in the queue. (basically a short hand function for skip, feels good to be able to warp through songs, heh.)
* Use command `<prefix>prefix [char]` to view bot prefix or set one by passing a single or series of characters which will be set as custom bot prefix for particular guild.
* Use command `<prefix>help [command]` to view general command info or information regarding certain command by supplying a command name, e.g. either `<prefix>help` or `<prefix>help play` will suffice.
* Use command `<prefix>ping` to check bot / discord api latency
* Use command `<prefix>seek [interval]` to seek music player to specific time, e.g. `<prefix>seek 1:40` would seek music player to 1 minute 40 seconds time

## Dependencies

* Node.js 7.6<
* discord.js & discord.js-commando
* sqlite for discord.js-commando default data persistence (to store your custom prefix etc)
* mongodb 3.4 version for data persistence
* ..check out `package.json` for more info.