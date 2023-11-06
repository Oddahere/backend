const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// collection for drivers
const driverDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    f_name: {
      type: String
    },
    l_name: {
      type: String
    },
    emp_id: {
      type: String
    },
    phone_number: {
      type: String
    },
    hiring_date: {
      type: Date
    }
  },
  {
    collection: 'driver'
  }
)

// collection for orders
const orderDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    order_id: {
      type: String
    },
    tracking_number: {
      type: String
    },
    emp_id: {
      type: String
    },
    exp_deliver_date: {
      type: Date
    },
    exp_cost: {
      type: String
    },
    delivery_fees: {
      type: Boolean
    },
    delivery_service: {
      type: String
    }
  },
    {
      collection: 'order'
    }
)

const drivers = mongoose.model('driver', driverDataSchema)
const orders = mongoose.model('order', orderDataSchema)

module.exports = { drivers, orders }