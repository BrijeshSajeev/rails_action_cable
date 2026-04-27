class ChatRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_room"
  end

  def speak(data)
    name = data["name"].to_s.strip
    message = data["message"].to_s.strip
    return if name.blank? || message.blank?

    ActionCable.server.broadcast(
      "chat_room",
      {
        name: ERB::Util.html_escape(name),
        message: ERB::Util.html_escape(message),
        sent_at: Time.current.strftime("%H:%M")
      }
    )
  end
end
