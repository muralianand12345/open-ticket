const discord = require('discord.js')
const bot = require('../../../index')
const client = bot.client
const config = bot.config
const l = bot.language
const log = bot.errorLog.log

const getconfigoptions = require("../../getoptions")
const hiddendata = bot.hiddenData
const embed = discord.EmbedBuilder
const mc = config.main_color

const button = discord.ButtonBuilder
const arb = discord.ActionRowBuilder
const bs = discord.ButtonStyle


exports.firstmsgRowNormal = new arb()
    .addComponents(
        new button()
        .setCustomId("OTcloseTicket")
        .setDisabled(false)
        .setStyle(bs.Secondary)
        .setLabel(l.buttons.close)
        .setEmoji("🔒")
    )
    .addComponents(
        new button()
        .setCustomId("OTdeleteTicket")
        .setDisabled(false)
        .setStyle(bs.Danger)
        .setLabel(l.buttons.delete)
        .setEmoji("✖️")
    )

exports.firstmsgRowDisabled = new arb()
    .addComponents(
        new button()
        .setCustomId("OTcloseTicket")
        .setDisabled(true)
        .setStyle(bs.Secondary)
        .setLabel(l.buttons.close)
        .setEmoji("🔒")
    )
    .addComponents(
        new button()
        .setCustomId("OTdeleteTicket")
        .setDisabled(true)
        .setStyle(bs.Danger)
        .setLabel(l.buttons.delete)
        .setEmoji("✖️")
    )