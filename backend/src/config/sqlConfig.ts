
// import dotenv from 'dotenv'
// dotenv.config();



export const sqlConfig = {
    user:'sa',
    password:'atopwudan',
    database: 'PROJECTS',
    server: 'DESKTOP-8U9CNUE',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate:false
    }
};


console.log(sqlConfig);

// async()=>{
//     let pool = await mssql.connect(sqlConfig)

//     if(pool.connected){
//         console.log("connected");
//         let query = 'CREATE TABLE Users(user_id VARCHAR(100) NOT NULL, name VARCHAR(100) NOT NULL,email VARCHAR(255) NOT NULL UNIQUE, phone_number VARCHAR(15) NOT NULL UNIQUE, role VARCHAR(20) Default "customer", Password VARCHAR(200) NOT null, profile-image VARCHAR(200) Default "", location VARCHAR(150)'
//     }else{
//     console.log("not connected")';
        
//     }