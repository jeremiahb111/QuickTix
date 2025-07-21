## QuickTix

A ticketing application built using a microservices architecture with Node.js, TypeScript, and Docker. It leverages Apache Kafka for event-driven service communication and uses the Bull library for managing background job queues.

### **Overview**

This app allows users to purchase and manage tickets for events. The app consists of multiple services, each responsible for a specific aspect of the ticketing process.

### **Services:**



##### **Auth Service**
- Handles user authentication and authorization
- Provides user profile management and access control

##### **Ticket Service**
- Manages ticket inventory and availability
- Handles ticket purchases and reservations
- Provides ticket details and status updates

##### **Order Service**
- Manages order creation and processing
- Integrates with Payments Service for payment processing
- Responsible for generating order confirmations and updating order status

##### **Expiration Service**
- Handles ticket expiration and notification logic
- Responsible for sending reminders and updates to users

##### **Payments Service**
- Handles payment processing for ticket purchases
- Integrates with payment gateways (Stripe)
- Responsible for generating payment receipts and updating order status

### **Project Structure**
The project is organized into multiple directories, each representing a separate service:

auth: Auth Service

tickets: Tickets Service

orders: Orders Service

expiration: Expiration Service

payments: Payments Service
