const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class RentalService {

  /**
   * Cria um novo aluguel
   * @param {{ clientCpf: string, copyId: number, rental_date: string, due_date: string }} data
   */
  async createRental(data) {
    const { clientCpf, copyId, rental_date, due_date } = data

    if (!clientCpf || !copyId || !rental_date || !due_date) {
      return {
        type: 'error',
        message: 'clientCpf, copyId, rental_date e due_date são obrigatórios',
      }
    }

    const client = await prisma.client.findUnique({
      where: { cpf: clientCpf },
    })

    if (!client) {
      return { type: 'error', message: 'Cliente não encontrado' }
    }

    const copy = await prisma.copy.findUnique({
      where: { id: copyId },
      include: { rentals: true },
    })

    if (!copy) {
      return { type: 'error', message: 'Cópia não encontrada' }
    }

    const hasOpenRental = copy.rentals.some(
      rental => rental.return_date === null
    )

    if (hasOpenRental) {
      return {
        type: 'error',
        message: 'Esta cópia já está alugada',
      }
    }

    const rental = await prisma.rental.create({
      data: {
        clientCpf,
        copyId,
        rental_date: new Date(rental_date),
        due_date: new Date(due_date),
      },
    })

    return {
      type: 'success',
      message: 'Aluguel criado com sucesso',
      data: rental,
    }
  }

  /**
   * Retorna todos os aluguéis
   */
  async getAllRentals() {
    const rentals = await prisma.rental.findMany({
      include: {
        client: true,
        copy: {
          include: {
            book: {
              include: { author: true },
            },
          },
        },
      },
    })

    if (!rentals.length) {
      return { type: 'error', message: 'Nenhum aluguel encontrado' }
    }

    return {
      type: 'success',
      message: 'Lista de aluguéis',
      data: rentals,
    }
  }

  /**
   * Retorna um aluguel pelo ID
   * @param {number|string} id
   */
  async getRentalById(id) {
    const rental = await prisma.rental.findUnique({
      where: { id: Number(id) },
      include: {
        client: true,
        copy: {
          include: {
            book: {
              include: { author: true },
            },
          },
        },
      },
    })

    if (!rental) {
      return { type: 'error', message: 'Aluguel não encontrado' }
    }

    return {
      type: 'success',
      message: 'Aluguel encontrado',
      data: rental,
    }
  }

  /**
   * Finaliza um aluguel
   * @param {number|string} id
   * @param {{ fine_value?: number }} data
   */
    async finishRental(id, data) {
        const rental = await prisma.rental.findUnique({
            where: { id: Number(id) },
        })

        if (!rental) {
            return { type: 'error', message: 'Aluguel não encontrado' }
        }

        if (rental.return_date) {
            return {
            type: 'error',
            message: 'Este aluguel já foi finalizado',
            }
        }

        const updatedRental = await prisma.rental.update({
            where: { id: Number(id) },
            data: {
            return_date: new Date(),
            fine_value: data?.fine_value ?? null,
            },
        })

        return {
            type: 'success',
            message: 'Aluguel finalizado com sucesso',
            data: updatedRental,
        }
    }

  /**
   * Remove um aluguel
   * @param {number|string} id
   */
  async deleteRental(id) {
    const rental = await prisma.rental.findUnique({
      where: { id: Number(id) },
    })

    if (!rental) {
      return { type: 'error', message: 'Aluguel não encontrado' }
    }

    await prisma.rental.delete({
      where: { id: Number(id) },
    })

    return {
      type: 'success',
      message: 'Aluguel removido com sucesso',
    }
  }
}

module.exports = new RentalService()
