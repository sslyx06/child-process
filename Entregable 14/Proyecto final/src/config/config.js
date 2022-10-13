import dotenv from 'dotenv'
dotenv.config()

export default {
    app:{
        MODE:process.env.MODE || 'PROD',
        PORT:process.env.PORT || 3000,
        DEBUG:process.env.DEBUG || false
    },
    mongo:{
    MONGO_URL: process.env.MONGO_URL
}

}