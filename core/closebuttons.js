const discord = require('discord.js')
const bot = require('../index')
const client = bot.client
const config = bot.config
const l = bot.language


module.exports = () => {
    //closebar
    var closeBar = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId("closeTicketTrue")
                .setDisabled(false)
                .setStyle(discord.ButtonStyle.Secondary)
                .setEmoji("✅")
        )
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId("closeTicketFalse")
                .setDisabled(false)
                .setStyle(discord.ButtonStyle.Secondary)
                .setEmoji("❌")
        )
    var deleteBar = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId("deleteTicketTrue")
                .setDisabled(false)
                .setStyle(discord.ButtonStyle.Secondary)
                .setEmoji("✅")
        )
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId("deleteTicketFalse")
                .setDisabled(false)
                .setStyle(discord.ButtonStyle.Secondary)
                .setEmoji("❌")
        )
    var deleteBar1 = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId("deleteTicketTrue1")
                .setDisabled(false)
                .setStyle(discord.ButtonStyle.Secondary)
                .setEmoji("✅")
        )
        .addComponents(
            new discord.ButtonBuilder()
                .setCustomId("deleteTicketFalse1")
                .setDisabled(false)
                .setStyle(discord.ButtonStyle.Secondary)
                .setEmoji("❌")
        )
    //closebutton
    var closeRowNormal = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
            .setCustomId("closeTicket")
            .setDisabled(false)
            .setStyle(discord.ButtonStyle.Secondary)
            .setLabel(l.buttons.close)
            .setEmoji("🔒")
        )
        .addComponents(
            new discord.ButtonBuilder()
            .setCustomId("deleteTicket")
            .setDisabled(false)
            .setStyle(discord.ButtonStyle.Danger)
            .setLabel(l.buttons.delete)
            .setEmoji("✖️")
        )
    var closeRowClosed = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
            .setCustomId("deleteTicket1")
            .setDisabled(false)
            .setStyle(discord.ButtonStyle.Danger)
            .setLabel(l.buttons.delete)
            .setEmoji("✖️")
        )
        .addComponents(
            new discord.ButtonBuilder()
            .setCustomId("sendTranscript")
            .setDisabled(false)
            .setStyle(discord.ButtonStyle.Secondary)
            .setLabel(l.buttons.sendTranscript)
            .setEmoji("📄")
        )
        .addComponents(
            new discord.ButtonBuilder()
            .setCustomId("reopenTicket")
            .setDisabled(false)
            .setStyle(discord.ButtonStyle.Success)
            .setLabel(l.buttons.reopen)
            .setEmoji("✔")
        )
    
    var closeRowDisabled = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
            .setCustomId("closeTicket")
            .setDisabled(true)
            .setStyle(discord.ButtonStyle.Secondary)
            .setLabel(l.buttons.close)
            .setEmoji("🔒")
        )
        .addComponents(
            new discord.ButtonBuilder()
            .setCustomId("deleteTicket")
            .setDisabled(true)
            .setStyle(discord.ButtonStyle.Danger)
            .setLabel(l.buttons.delete)
            .setEmoji("✖️")
        )


    //NORMAL CLOSE
    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "closeTicket") return
        
        interaction.deferUpdate()
        interaction.message.edit({components:[closeBar]})
        
    })
    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "closeTicketFalse") return
        
        interaction.deferUpdate()
        interaction.message.edit({components:[closeRowNormal]})
    })
    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "closeTicketTrue") return
        
        interaction.deferUpdate()

        if (config.system.closeMode == "adminonly"){
            const permsmember = client.guilds.cache.find(g => g.id == interaction.guild.id).members.cache.find(m => m.id == interaction.member.id)
            if (config.main_adminroles.some((item)=>{return permsmember.roles.cache.has(item)}) == false && !permsmember.permissions.has("ADMINISTRATOR") && !permsmember.permissions.has("MANAGE_GUILD")){
                interaction.channel.send({embeds:[bot.errorLog.noPermsMessage]})
                return
            }
        }
        
        interaction.message.edit({components:[closeRowDisabled]})

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

        require("./ticketCloser").closeTicket(interaction,prefix,"close")
    })

    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "closeTicketTrue1") return
        
        interaction.deferUpdate()

        if (config.system.closeMode == "adminonly"){
            const permsmember = client.guilds.cache.find(g => g.id == interaction.guild.id).members.cache.find(m => m.id == interaction.member.id)
            if (config.main_adminroles.some((item)=>{return permsmember.roles.cache.has(item)}) == false && !permsmember.permissions.has("ADMINISTRATOR") && !permsmember.permissions.has("MANAGE_GUILD")){
                interaction.channel.send({embeds:[bot.errorLog.noPermsMessage]})
                return
            }
        }

        const closedButtonDisabled = new discord.ActionRowBuilder()
            .addComponents([
                new discord.ButtonBuilder()
                    .setCustomId("closeTicketTrue1")
                    .setDisabled(true)
                    .setStyle(discord.ButtonStyle.Secondary)
                    .setEmoji("🔒")
            ])
        interaction.message.edit({components:[closedButtonDisabled]})

        interaction.channel.messages.fetchPinned().then((messages) => {
            messages.first().edit({components:[closeRowDisabled]})
        })

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

        require("./ticketCloser").closeTicket(interaction,prefix,"close")
    })


    //NORMAL DELETE
    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "deleteTicket") return
        
        interaction.deferUpdate()
        interaction.message.edit({components:[deleteBar]})
        
    })
    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "deleteTicketFalse") return
        
        interaction.deferUpdate()
        interaction.message.edit({components:[closeRowNormal]})
    })
    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "deleteTicketTrue") return
        
        interaction.deferUpdate()

        const permsmember = client.guilds.cache.find(g => g.id == interaction.guild.id).members.cache.find(m => m.id == interaction.member.id)
        if (config.main_adminroles.some((item)=>{return permsmember.roles.cache.has(item)}) == false && !permsmember.permissions.has("ADMINISTRATOR") && !permsmember.permissions.has("MANAGE_GUILD")){
            interaction.channel.send({embeds:[bot.errorLog.noPermsMessage]})
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

        require("./ticketCloser").closeTicket(interaction,prefix,"delete")
    })




    //CLOSED DELETE
    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "deleteTicket1") return
        
        interaction.deferUpdate()
        interaction.message.edit({components:[deleteBar1]})
        
    })
    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "deleteTicketFalse1") return
        
        interaction.deferUpdate()
        interaction.message.edit({components:[closeRowClosed]})
    })
    client.on("interactionCreate",interaction => {
        if (!interaction.isButton()) return
        if (interaction.customId != "deleteTicketTrue1") return
        
        interaction.deferUpdate()

        const permsmember = client.guilds.cache.find(g => g.id == interaction.guild.id).members.cache.find(m => m.id == interaction.member.id)
        if (config.main_adminroles.some((item)=>{return permsmember.roles.cache.has(item)}) == false && !permsmember.permissions.has("ADMINISTRATOR") && !permsmember.permissions.has("MANAGE_GUILD")){
            interaction.channel.send({embeds:[bot.errorLog.noPermsMessage]})
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

        require("./ticketCloser").closeTicket(interaction,prefix,"deletenotranscript")
    })
}