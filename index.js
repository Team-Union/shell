require('dotenv').config();
const Discord = require('discord.js');
const child = require('child_process');
const client = new Discord.Client({
    ws: {
        properties: {
            $browser: 'Discord iOS'
        }
    }
});
client.on('ready', () => {
    console.log(`Login ${client.user.username}\n------------`);
});
client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type != 'text') return;
    if (message.channel.id != '808315682898444320') return;
    let out = '';
    if (child.execSync(`docker ps -a | grep -E ${message.author.id} -`).toString == '') child.execSync(`docker run -dit --name=${message.author.id} 24d849b9544e`);
    let p = child.exec(`docker exec ${message.author.id} ${message.content}`, {
        shell: '/usr/bin/bash'
    }, () => {
        let output = out.replace(new RegExp(process.env.TOKEN, 'gi'), 'Secret');
        console.log(output);
        if (output.length > 1990) {
            message.channel.send(new Discord.MessageAttachment(Buffer.from(output), 'output.txt'));
        } else {
            message.channel.send(output, {
                code: 'sh'
            });
        }
    });
    p.stdout.on('data', text => {
        out += `${text}\n`;
    });
    p.stderr.on('data', text => {
        out += `${text}\n`;
    });
});
client.login(process.env.TOKEN);
