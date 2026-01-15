const rentalService = require('../service/RentalService')

const createRental = async (req, res) => {
  const result = await rentalService.createRental(req.body)
  res.status(result.type === 'success' ? 201 : 400).json(result)
}

const getAllRentals = async (_, res) => {
  const result = await rentalService.getAllRentals()
  res.status(result.type === 'success' ? 200 : 404).json(result)
}

const getRentalById = async (req, res) => {
  const result = await rentalService.getRentalById(req.params.id)
  res.status(result.type === 'success' ? 200 : 404).json(result)
}

const finishRental = async (req, res) => {
  const result = await rentalService.finishRental(req.params.id, req.body)
  res.status(result.type === 'success' ? 200 : 400).json(result)
}

const deleteRental = async (req, res) => {
  const result = await rentalService.deleteRental(req.params.id)
  res.status(result.type === 'success' ? 200 : 400).json(result)
}

module.exports = {
  createRental,
  getAllRentals,
  getRentalById,
  finishRental,
  deleteRental,
}
