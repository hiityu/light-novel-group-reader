// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cheerio from 'cheerio'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const scrape = async (req, res) => {
  const inputValue = req.body.inputValue
  const { data } = await axios.get(`https://boxnovel.com/novel/reincarnation-of-the-strongest-sword-god-boxnovel/chapter-${inputValue}/`)
  const $ = cheerio.load(data)
  const title = $(".text-left h1").text()
  const body = $(".text-left p").text()
  const lastScraped = new Date().toISOString()
  res.status(200).json({ statusCode: 200,title:title ,body:body , lastScraped:lastScraped })
} 
export default scrape
