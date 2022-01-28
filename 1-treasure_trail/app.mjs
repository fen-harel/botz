// ID: 
//	    931850453753417739

// Token:
//  	OTMxODUwNDUzNzUzNDE3NzM5.YeKbXQ.eTjJ4EmCkmwq7w9ds9mrnZpkai4

// Invitation Link: 
//  	https://discord.com/api/oauth2/authorize?client_id=931850453753417739&scope=bot&permissions=1

import Discord, { Intents } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log(client.user.tag + "\n" + "Bot is ready")
});

// message event
client.on("messageCreate", message => {
    // user input to lower case
    let inputLowerCase = message.content.toLowerCase();

    // randomreward
    if (inputLowerCase.includes("!randomreward") && message.author.bot == false){
        // array of strings
        let decoded_message = inputLowerCase.split(" ");

        // Cmount of treasure chests before flooring 
        let correct_number = Number(decoded_message[1]);

        // Amount of treasure chests after flooring the number
        let floored_number = Math.floor(correct_number);

        if (decoded_message[0] == "!randomreward" && decoded_message.length == 2 && floored_number > 0 && floored_number < 10001 && Number(floored_number)){
            // variable holding all the item rolls
            let reward_rolls = 0

            // total amount of rare drops
            let total_ranger_boots = 0;
            let total_magus_boots = 0;
            let total_flame_boots = 0;

            // for loop determining amount of rolls
            for (let i = 0; i < floored_number; i++){
                let roll_chest = Math.floor(Math.random() * 3) + 3;
                reward_rolls += roll_chest;
            }

            // for loop each reward roll, 1-1000
            for (let i = 0; i < reward_rolls; i++){
                let reward_roll = Math.floor(Math.random() * 1000) + 1;
                
                if (reward_roll == 100){
                    total_flame_boots++;
                }

                else if (reward_roll == 200){
                    total_magus_boots++;
                }
                else if (reward_roll == 300){
                    total_ranger_boots++;
                }
            }

            console.log("ranger boots: " + total_ranger_boots);
            console.log("magus boots: " + total_magus_boots);
            console.log("flame boots: " + total_flame_boots);

            message.reply("You have received the following rewards based on the number of treasure chests: " + floored_number
            + "\n" + "ranger_boots: " + total_ranger_boots + "\n" + "flame boots: " + total_flame_boots + "\n" + "magus boots: " + total_magus_boots)
        }
    }

    // help command
    else if (inputLowerCase == "!help") {
            message.reply("There are 1 command, !randomreward");
    }
});



client.login(process.env.TOKEN);

