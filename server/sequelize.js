// import { Sequelize } from 'sequelize'

// export default new Sequelize(
//     process.env.DB_NAME, // база данных
//     process.env.DB_USER, // пользователь
//     process.env.DB_PASS, // пароль
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         define: {
//             // в базе данных поля будут created_at и updated_at
//             underscored: true
//         },
//         logging: false,
//         timezone: 'Europe/Moscow',
//     }
// )
//const {Sequelize} = require('sequelize')
 import { Sequelize } from 'sequelize'
 export default new Sequelize(

    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT
    }
)
