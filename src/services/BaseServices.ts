
import axios from 'axios'
require("dotenv").config()
const apiUri = process.env.API_URL;

export const getRequest = async (url: string) => {
    try {
        const {data, status} = await axios.get( apiUri + url, {headers: { 'bot-token': process.env.BOT_TOKEN_API }})
        return {data, status}
    }catch (e) {
        throw e
    }
}

export const postRequest = async (url: string, body: {}) => {
    try {
        const {data, status} = await axios.post(apiUri + url, body, {headers: { 'bot-token': process.env.BOT_TOKEN_API }})
        return {data, status}
    }catch (e) {
        throw e
    }
}

export const deleteRequest = async (url: string ) => {
    try {
        const {data, status} = await axios.delete(apiUri + url, {headers: { 'bot-token': process.env.BOT_TOKEN_API }})
        return {data, status}
    }catch (e){
        throw e
    }
}

export const putRequest = async (url: string, body: {} ) => {
    try {
        const {data, status} = await axios.put(apiUri + url, body, {headers: { 'bot-token': process.env.BOT_TOKEN_API }})
        return {data, status}
    }catch (e){
        throw e
    }
}