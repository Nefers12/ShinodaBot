const { MessageEmbed } = require('discord.js');
const { User } = require('../../db/models/index');

module.exports = {
    name: 'adduser',
    permissions: ['BAN_MEMBERS'],
    description : 'Emmet un event',
    options : [{
        name:'all',
        description : 'faut-il ajouter tous les users ?',
        type : 5,
        required: true,
    },{
        name:'user',
        description : 'User à ajouter',
        type : 'USER',
        required: false,
    }],

    runSlash: async (client, interaction) => {

        const all = interaction.options.getBoolean('all');

        if(all){

            interaction.guild.members.fetch().then(members =>{
                members.forEach(async member  =>  {
    
                    const user = await User.findOne({ userId: member.id });
    
                    if(member.user.bot) return;
    
                    if(!user){
                        const userCreate = await new User({
                            userId: member.id,
                            userName: member.user.username,
                            userAvatar: member.displayAvatarURL(),
                            joinDate: Date.now(),
                            messagesCount: 0,
                            numberOfJoin: 1,
                            invites: 0
                        });
                
                        userCreate.save();
                    }
                })
            })

            interaction.reply({content: `Tous les utilisateurs manquants ont étés ajoutés à la base de données`,ephemeral:true})
        
        }else{
            const usr = interaction.options.getUser('user');

            const user = await User.findOne({ userId: usr.id });
                if(!user){
                    const userCreate = await new User({
                        userId: usr.id,
                        userName: usr.username,
                        userAvatar: usr.displayAvatarURL(),
                        joinDate: Date.now(),
                        messagesCount: 0,
                        numberOfJoin: 1,
                        invites: 0
                    });
            
                    userCreate.save();
                    interaction.reply({content: `Utilisateur ajoué à la base de données`,ephemeral:true});
                }else{
                    interaction.reply({content: `Cet utilisateur est déjà dans la base de données`,ephemeral:true});
                }
        }
    }

}