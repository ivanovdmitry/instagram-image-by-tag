'use strict'
const _ = require('lodash')
const express = require('express')
const helmet = require('helmet')

const rp = require('request-promise')

const app = express()
app.use(helmet())

async function loadPage(tag) {
    let dataExp = /window\._sharedData\s?=\s?({.+);<\/script>/
    let raw = await rp(`https://www.instagram.com/explore/tags/${tag}`)
    return JSON.parse(raw.match(dataExp)[1])
}

async function getImages(tag) {
    let data = await loadPage(tag)
    let nodes = data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges
    return _.map(nodes, ({node}) => node.thumbnail_src)
}


app.get('/', async (req, res) => {
    let tag = req.query.tag
    let data = await getImages(tag)
    res.send(_.map(data, src => `<img src=${src} />`).join(''))
})

app.listen(3000)