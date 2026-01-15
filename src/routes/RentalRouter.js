const express = require('express')
const router = express.Router()
const rentalController = require('../controllers/RentalController')

router.post('/register', rentalController.createRental)
router.get('/', rentalController.getAllRentals)
router.get('/:id', rentalController.getRentalById)
router.put('/:id/finish', rentalController.finishRental)
router.delete('/:id', rentalController.deleteRental)

module.exports = router
