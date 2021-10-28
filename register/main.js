const Discord = require("discord.js")
const client = new Discord.Client();
const ayar = require("./settings.js")
const fs = require("fs");
require('./util/Loader.js')(client);

const mongoose = require('mongoose');
mongoose.connect(ayar.bot.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(m => setTimeout(() => { console.log('Database bağlandı!') }, 3000)).catch(err => setTimeout(() => { console.log('Database bağlanamadı!!') }, 3000));
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./Commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./Commands/${f}`);
        console.log(`${props.config.name} komutu yüklendi.`);
        client.commands.set(props.config.name, props);
        props.config.aliases.forEach(alias => {
            client.aliases.set(alias, props.config.name);
        });
    });
})

client.login(ayar.bot.botToken).catch(err => { console.log('Bota giriş yapılırken başarısız olundu!!') })