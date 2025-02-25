const discord = require('discord.js')
const bot = require('../../../../index')
const client = bot.client
const config = bot.config
const l = bot.language
const log = bot.errorLog.log

const getconfigoptions = require("../../../getoptions")
const permissionChecker = require("../../../utils/permisssionChecker")
const storage = bot.storage
const hiddendata = bot.hiddenData
const embed = discord.EmbedBuilder
const mc = config.main_color

const button = discord.ButtonBuilder
const arb = discord.ActionRowBuilder
const bs = discord.ButtonStyle

module.exports = () => {
    //REOPEN
    client.on("interactionCreate",(interaction) => {
        if (!interaction.isButton()) return
        if (interaction.customId != "OTreopenTicket") return

        interaction.deferUpdate()
        interaction.message.edit({embeds:[bot.embeds.commands.reopenEmbed(interaction.user)],components:[bot.buttons.close.openRowNormal]})
        require("../../../ticketReopener").reopenTicket(interaction.guild,interaction.channel,interaction.user)
    })
}