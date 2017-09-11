module.exports={
    development:{
        client:'pg',
        connection:{
            host:'127.0.0.1',
            user:'postgres',
            password:'admin',
            database:'mediaserver',
            charset:'utf8'
        },
        migrations:{
            directory:__dirname + '/db/migrations',
        },
        seeds:{
            directory:__dirname + '/db/seeds',
        },
    },
    production:{
        client:'pg',
        connection:process.env.DATABASE_URL,
        migrations:{
            directory:__dirname + '/db/migrations',
        },
        seeds:{
            directory:__dirname + '/db/seeds/production',
        },
    },
};