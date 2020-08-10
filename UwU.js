const translate = require('./translate.js')

console.log(translate("can you rub my belly"))

const discordjs = require("discord.js")
const config = require("./config.json")

const discord = new discordjs.Client()

/**
 * @type {discordjs.Collection<discordjs.Channel, discordjs.Webhook>}
 */
const hooks = new discordjs.Collection()

discord.on("ready", () => {
    console.log("Hewwo wowld!!")
})


discord.on("message", async msg => {
    if (msg.author.id == discord.user.id) return;
    if (msg.author.bot) return;
    if (!msg.guild) return;

    if (msg.channel.id == config.askChannel) {
        if (!hooks.has(msg.channel)) hooks.set(msg.channel, await msg.channel.createWebhook("OwO", {reason: "Y E S"}))
        hooks.get(msg.channel).send(msg.content, {
            username: msg.guild.member(msg.author).nickname||msg.author.username,
            avatarURL: msg.author.avatarURL()
        })
    }
})

process.on("SIGINT", () => {
    hooks.forEach(hook => {
        hook.delete("No more owo")
    })
    console.log("Hook deletion finished")
})

discord.login(config.token)