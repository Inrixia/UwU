const translate = require('./translate.js')

const discordjs = require("discord.js")
const config = require("./config.json")

const discord = new discordjs.Client()

/**
 * @type {discordjs.Collection<discordjs.Channel, discordjs.Webhook>}
 */
const hooks = new discordjs.Collection()

discord.on("ready", () => console.log("Hewwo wowld!!"))


discord.on("message", async msg => {
    if (msg.author.id === discord.user.id) return;
    if (msg.author.bot) return;
	if (!msg.guild) return;
    if (config.sadID == msg.author.id) {
		if (!hooks.has(msg.channel)) hooks.set(msg.channel, await msg.channel.createWebhook("OwO", { reason: "Y E S" }))
        hooks.get(msg.channel).send(translate(msg.content), {
            username: msg.guild.member(msg.author).nickname||msg.author.username,
            avatarURL: msg.author.avatarURL()
		})
		msg.delete();
    }
})

process.on("SIGINT", () => {
    hooks.map(hook => hook.delete("No more owo"))
	console.log("Hook deletion finished")
	process.exit(1)
})

discord.login(config.token)