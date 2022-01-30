import Discord, { Intents } from "discord.js";
import dotenv from "dotenv";
import dateTimePackage from "node-datetime";

dotenv.config();

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});


// Event array over the events
const eventArray = ["ready", "reconnecting", "disconnect", "message"];

// array of commands
const commandsArray = ["!commands", "!event", "!author"];

// reply array\
const replyArray = [
    "The owner is Erik Peterson, Erik is the owner of Shackles",
    "Shackles website: https://www.shackledevelopers.com/"
]

// data format for the event date.
const eventDate = "2022-01-31 15:00:00";

// placeholder formatting string
const format = "m/d/y H:M";

//variables for hours and minutes in milliseconds
const hourInMs = 3600000;
const minInMs = 60000;

// Displays a message when the bot has started
client.on(eventArray[0], () => {
    console.log(`logged in as: ${client.user.tag}`);
});

// Reconnecting event, fired everytime the bot is reconnecting to the websocket
client.on(eventArray[1], () => {
    console.log(client.user.tag + "\n" + `Bot is attempting to reconnect: ${client.user.tag}`);
});

// Disconnecting event, fired everytime the bot is completely disconnected from the websocket
client.on(eventArray[2], () => {
    console.log(client.user.tag + "\n" + `Bot is now disconnecting: ${client.user.tag}`, );
});

// Check messages for a specific command
client.on(eventArray[3], async msg => {
    // Check for !commands
    if (msg.content === commandsArray[0]) {
        msg.reply("This bot's commands are !commands !event !author")
    }

    // check for !event
    else if (msg.content === commandsArray[1]) {

        // Create 2 variables for the event date
        var nextClanEventDate = dateTimePackage.create(eventDate);
        var nextClanEventDateModify = dateTimePackage.create(eventDate);

        // Offset hours appropriate for the time of local server hosting bot
        nextClanEventDateModify.offsetInHours(1);

        // Format both variables into a different data format
        var formatNextClanEventDate = nextClanEventDate.format(format);
        var formatNextClanEventDateModify = nextClanEventDate.format(format);

        // Store current date and time in a variable
        let dateRightNow = dateTimePackage.create();
        // Format the current date
        let formatDateRightNow = dateRightNow.format(format);

        // Convert one of the Event Date variables and Current Date variables so we can compare the dates
        let dateRightNowInMs = new Date(formatDateRightNow);
        let clanEventInMs = new Date(formatNextClanEventDateModify);

        // Storing difference between 2 dates
        const dateDifference = clanEventInMs - dateRightNowInMs;

        // Calculate hours and minutes left
        let hoursLeft = Math.floor(dateDifference / hourInMs);
        let remainder = dateDifference - (hoursLeft * hourInMs);
        let minutesLeft = Math.floor(remainder / minInMs);

        // Create a message array with the correct dates - hours, minutes and seconds - to event
        let msgArray = [
            "Next clan event date is: " + formatNextClanEventDate + "GMT\n",
            "Next event begins in: " + hoursLeft + "h" + minutesLeft + "m\n",
            "The event is a small charity event for homeless people."
        ];

        // Reply with a message displaying the correct values from the message array
        msg.reply(msgArray[0] + msgArray[1] + msgArray[2]);

    }

    // Check for !author
    else if (msg.content === commandsArray[2]) {
        msg.reply(replyArray[0] + replyArray[1]);
    }
})


client.login(process.env.TOKEN);