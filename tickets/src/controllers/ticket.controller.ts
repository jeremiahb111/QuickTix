import { NextFunction, Request, Response } from "express";
import Ticket from "../models/ticket.model";
import { CreateTicketType, UpdateTicketType } from "../types/ticket.type";
import { SuccessResponse, NotFoundError, BadRequestError } from '@hp_quicktix/common'
import mongoose from "mongoose";

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
  const tickets = await Ticket.find()

  return new SuccessResponse('Tickets fetched successfully.', 200, tickets).send(res)
}

export const createTicket = async (req: Request<{}, {}, CreateTicketType>, res: Response, next: NextFunction) => {
  const ticket = Ticket.build({ ...req.body, sellerId: req.currentUser!.id })

  await ticket.save()

  return new SuccessResponse('Ticket created successfully.', 201, ticket).send(res)
}

export const getTicket = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params

  const isValidId = mongoose.Types.ObjectId.isValid(id)

  if (!isValidId) throw new NotFoundError('Ticket not found.')

  const ticket = await Ticket.findById(id)

  if (!ticket) throw new NotFoundError('Ticket not found.')

  return new SuccessResponse('Ticket fetched successfully.', 200, ticket).send(res)
}

export const updateTicket = async (req: Request<{ id: string }, {}, UpdateTicketType>, res: Response, next: NextFunction) => {
  const { id } = req.params

  const isValidId = mongoose.Types.ObjectId.isValid(id)

  if (!isValidId) throw new BadRequestError('Invalid ticket id.')

  const ticket = await Ticket.findById(id)

  if (!ticket) throw new NotFoundError('Ticket not found.')

  if (ticket.sellerId !== req.currentUser!.id) throw new BadRequestError('You are not allowed to update this ticket.')

  ticket.set(req.body)

  await ticket.save()

  return new SuccessResponse('Ticket updated successfully.', 200, ticket).send(res)
}

export const deleteTicket = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params

  const isValidId = mongoose.Types.ObjectId.isValid(id)

  if (!isValidId) throw new BadRequestError('Invalid ticket id.')

  const ticket = await Ticket.findById(id)

  if (!ticket) throw new NotFoundError('You cannot delete non-existent ticket.')

  if (ticket.sellerId !== req.currentUser!.id) throw new BadRequestError('You are not allowed to delete this ticket.')

  await ticket.deleteOne()

  return new SuccessResponse('Ticket deleted successfully.', 200).send(res)
}