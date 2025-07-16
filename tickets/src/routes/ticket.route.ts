import { Router } from "express";
import { createTicket, deleteTicket, getTicket, getTickets, updateTicket } from "../controllers/ticket.controller";
import { catchAsync, currentUser, validate } from '@hp_quicktix/common'
import { CreateTicketSchema, UpdateTicketSchema } from "../types/ticket.type";

const router = Router()

router.route('/')
  .get(catchAsync(getTickets))
  .post(currentUser, validate(CreateTicketSchema), catchAsync(createTicket))

router.route('/:id')
  .get(catchAsync(getTicket))
  .patch(currentUser, validate(UpdateTicketSchema), catchAsync(updateTicket))
  .delete(currentUser, catchAsync(deleteTicket))

export default router