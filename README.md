**Ticketing App** 

A microservices-based ticketing app built with Node.js, TypeScript, and Docker.

**Overview**

This app allows users to purchase and manage tickets for events. The app consists of multiple services, each responsible for a specific aspect of the ticketing process.

**Services:**

**Payments Service**

*Handles payment processing for ticket purchases

*Integrates with payment gateways (Stripe)

*Responsible for generating payment receipts and updating order status

**Ticket Service**

*Manages ticket inventory and availability

*Handles ticket purchases and reservations

*Provides ticket details and status updates

**Order Service**

*Manages order creation and processing

*Integrates with Payments Service for payment processing

*Responsible for generating order confirmations and updating order status

**Auth Service**

*Handles user authentication and authorization

*Provides user profile management and access control

**Expiration Service**

*Handles ticket expiration and notification logic

*Responsible for sending reminders and updates to users

Project Structure
The project is organized into multiple directories, each representing a separate service:

payments: Payments Service

tickets: Tickets Service

orders: Orders Service

auth: Auth Service

expiration: Expiration Service
