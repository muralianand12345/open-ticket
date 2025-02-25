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
    //DELETE
    var deleteTicketButtonChecker = false
    client.on("interactionCreate",async interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "OTdeleteTicketTrue") return
        
        interaction.deferUpdate()

        if (deleteTicketButtonChecker == true) return
        deleteTicketButtonChecker = true

        const firstcomponents = bot.buttons.close.openRowNormal

        if (!permissionChecker.command(interaction.user.id,interaction.guild.id)){
            if (!permissionChecker.sendUserNoDelete(interaction.user)){
                permissionChecker.sendChannelNoDelete(interaction.channel)
            }
            await interaction.message.edit({components:[firstcomponents]})
            deleteTicketButtonChecker = false
            return
        }

        /**
         * @type {String}
         */
        const name = interaction.channel.name
        var prefix = ""
        const tickets = config.options
        tickets.forEach((ticket) => {
            if (name.startsWith(ticket.channelprefix)){
                prefix = ticket.channelprefix
            }
        })

        interaction.channel.send({embeds:[bot.embeds.commands.deleteEmbed(interaction.user)]})
        await interaction.message.edit({components:[bot.buttons.close.openRowDisabled]})
        await require("../../../ticketCloser").NEWcloseTicket(interaction.member,interaction.channel,prefix,"delete",false,true)
        deleteTicketButtonChecker = false
    })

    //DELETE NO TRANSCRIPT
    var deleteTicketButtonChecker1 = false
    client.on("interactionCreate",async interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "OTdeleteTicketTrue1") return
        
        interaction.deferUpdate()

        if (deleteTicketButtonChecker1 == true) return
        deleteTicketButtonChecker1 = true

        const firstcomponents = bot.buttons.close.closeCommandRow

        console.log("closed with NO TRANSCRIPT")
        if (!permissionChecker.command(interaction.user.id,interaction.guild.id)){
            if (!permissionChecker.sendUserNoDelete(interaction.user)){
                permissionChecker.sendChannelNoDelete(interaction.channel)
            }
            await interaction.message.edit({components:[firstcomponents]})
            deleteTicketButtonChecker1 = false
            return
        }

        /**
         * @type {String}
         */
        const name = interaction.channel.name
        var prefix = ""
        const tickets = config.options
        tickets.forEach((ticket) => {
            if (name.startsWith(ticket.channelprefix)){
                prefix = ticket.channelprefix
            }
        })

        interaction.channel.send({embeds:[bot.embeds.commands.deleteEmbed(interaction.user)]})
        await require("../../../ticketCloser").NEWcloseTicket(interaction.member,interaction.channel,prefix,"deletenotranscript",false,true)
        deleteTicketButtonChecker1 = false
    })
}