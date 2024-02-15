import joi from 'joi'

export const loginUserValidator= joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})