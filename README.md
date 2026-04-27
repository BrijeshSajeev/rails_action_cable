# Rails Action Cable Chat Application

A real-time chat application built with Ruby on Rails 7 and Action Cable.

## Overview

This is a basic chat application that demonstrates real-time messaging functionality using Rails Action Cable. Users can join a chat room and send messages that are instantly broadcast to all connected clients.

## Features

- **Real-time messaging** using Action Cable WebSocket technology
- **User management** with email-based user profiles
- **Chat rooms** with support for public and private rooms
- **HTML escaping** for security against XSS attacks
- **Timestamp display** for each message (HH:MM format)

## Tech Stack

- **Framework**: Rails 7.2.2
- **Database**: PostgreSQL
- **Real-time Communication**: Action Cable
- **Frontend**: Stimulus.js, Turbo, ImportMap Rails
- **Styling**: Tailwind CSS (via Sprockets)

## Project Structure

### Models
- **User**: Email-based user validation with uniqueness constraint
- **Room**: Chat room management with public/private scope support

### Channels
- **ChatRoomChannel**: Handles WebSocket subscriptions and message broadcasting
  - `subscribed`: Streams messages from the "chat_room" channel
  - `speak(data)`: Broadcasts user messages with HTML escaping

### Controllers & Views
- **HomeController**: Landing page
- **UsersController**: User creation and management
- **Home#index**: Landing page view
- **Users**: Full CRUD views for user management

### JavaScript
- **chat_room_channel.js**: Client-side WebSocket subscription and message handling
- **channels/consumer.js**: Action Cable consumer configuration

## Setup & Installation

### Prerequisites
- Ruby 3.x
- Rails 7.2.2
- PostgreSQL
- Node.js (for asset compilation)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chat_app
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Setup the database:
   ```bash
   rails db:create
   rails db:migrate
   ```

4. Start the Rails server:
   ```bash
   ./bin/dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Create a user account with your email
2. Join the chat room
3. Type your message and send
4. See messages instantly appear from all connected users

## Implementation Details

### Message Broadcasting
Messages are broadcast using Action Cable's `broadcast` method:
```ruby
ActionCable.server.broadcast("chat_room", {
  name: ERB::Util.html_escape(name),
  message: ERB::Util.html_escape(message),
  sent_at: Time.current.strftime("%H:%M")
})
```

### Security
- HTML escaping is applied to both username and message content to prevent XSS attacks
- User email validation ensures unique user identities

### Real-time Updates
Client-side subscription to the chat room channel automatically updates the UI as new messages arrive without page refresh.

## Development

### Run Tests
```bash
rails test
```

### Linting
```bash
bundle exec rubocop
```

### Security Scanning
```bash
bundle exec brakeman
```

## Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User profiles with email
- `rooms` - Chat rooms with privacy settings

## Future Enhancements

- Persistent message storage in database
- Room-specific messaging
- User authentication and sessions
- Message edit/delete functionality
- User typing indicators
- File/image sharing
