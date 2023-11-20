const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const express = require('express')
const router = express.Router()
const morgan = require('morgan');

// collection for drivers
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// collection for drivers
const driversDataSchema = new Schema(
  {
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    emp_id: {
      type: Number, // Corrected from int to Number
      required: true
    },
    phone: {
      type: Number, // Corrected from int to Number
      required: true
    },
    hiring_date: {
      type: Date,
      required: true
    },
    driver_id: {
      type: String,
      primaryKey: true
    }
  },
  {
    collection: 'drivers'
  }
);

// collection for orders
const ordersDataSchema = new Schema(
  {
    order_id: {
      type: Number, // Corrected from int to Number
      required: true,
      primaryKey: true
    },
    tracking_number: {
      type: String, // Corrected from varchar to String
      required: true
    },
    delivery_service: {
      type: String, // Corrected from varchar to String
      required: true
    },
    expected_delivery_date: {
      type: Date,
      required: false 
    },
    employee_id: {
      type: Number, // Corrected from int to Number
      required: true
    },
    expected_cost: {
      type: Number,
      required: false
    },
    delivery_fees: {
      type: Boolean,
      required: true
    },
    message: {
      type: String
    }
  },
  {
    collection: 'orders'
  }
);

const driversModel = mongoose.model('drivers', driversDataSchema);
const ordersModel = mongoose.model('orders', ordersDataSchema);

module.exports = { drivers: driversModel, orders: ordersModel };