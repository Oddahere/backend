const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importingdata model schemas
const { orders } = require('../models/models')

// GET/READ

//GET 10 most recent orders
router.get('/', (req, res, next) => {
    orders
        .find({ orgs: org}, (error, data) => {
            // error will pop up
            if (error) {
                return next(error)
            } else {
            // show the orders
                return res.json(data)
            }
        })
        .sort({ updatedAt: -1})
        // limit how many orders will be shown
        .limit(10)
})

//GET 1 order by ID
router.get('/id/:id', (req, res, next) => {
    // use findOne instead of find to not return array
    orders.findOne({ _id: req.params.id, orgs: org }, (error, data) => {
      if (error) {
        return next(error)
      } else if (!data) {
        res.status(400).send('Client not found')
      } else {
        res.json(data)
      }
    })
})

//GET order by tracking number
router.get('/search', (req, res, next) => {
    const dbQuery = { orgs: org }
    switch (req.query.searchBy) {
      case 'name':
        dbQuery.tracking_number = { $regex: `^${req.query.tracking_number}`, $options: 'i' }
        break
      case 'number':
        dbQuery['phoneNumber.primary'] = {
          $regex: `^${req.query['phoneNumber.primary']}`,
          $options: 'i'
        }
        break
      default:
        return res.status(400).send('invalid searchBy')
    }
    clients.find(dbQuery, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

// POST/CREATE

//POST order
router.post('/', (req, res, next) => {
    const newOrder = req.body
    newOrder.orgs = [org]
    orders.create(newOrder, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

// PUT/UPDATE

//PUT order by ID
router.put('/update/:id', (req, res, next) => {
    clients.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

//PUT order that already existing
router.put('/register/:id', (req, res, next) => {
    orders.findByIdAndUpdate(
      req.params.id,
      { $push: { orgs: org } },
      (error, data) => {
        if (error) {
          console.log(error)
          return next(error)
        } else {
          res.send('order has been updated')
        }
      }
    )
})

// DELETE/DELETE

//DELETE order by ID
router.delete('/:id', (req, res, next) => {
    orders.findByIdAndDelete(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else if (!data) {
        res.status(400).send('order not found')
      } else {
        res.send('order deleted')
      }
    })
})

module.exports = router