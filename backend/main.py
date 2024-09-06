from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# adding frontend local server url to enable CORS
origins = ["http://localhost:3000"]

# Apply CORS settings to your FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

# used for storing messages
messages_db = []

# Message Schema
class Message(BaseModel):
    id: str
    text: str
    sender: str

# Save Message API Schema
class SaveMessage(BaseModel):
    text: str

# Save Message API Schema
class EditMessage(BaseModel):
    text: str

# save message
@app.post("/messages/", response_model=List[Message])
def create_message(message: SaveMessage):
    global messages_db
    new_message_list = []

    # add user message to db
    user_message = Message(id=str(uuid4()), text=message.text, sender="user")
    messages_db.append(user_message)
    new_message_list.append(user_message)

    # add bot message to db
    bot_message = Message(id=str(uuid4()), text="Response For - "+message.text, sender="bot")
    messages_db.append(bot_message)
    new_message_list.append(bot_message)

    return new_message_list

# get message list
@app.get("/messages/", response_model=List[Message])
def get_messages():
    global messages_db
    return messages_db

# update message
@app.put("/messages/{message_id}", response_model=Message)
def update_message(message_id: str, updated_message: EditMessage):
    global messages_db
    # message = next((msg for msg in messages_db if msg.id == message_id), None)

    message = None
    for msg in messages_db:
        if msg.id == message_id:
            message = msg
            break

    if message is None:
        raise HTTPException(status_code=404, detail="Message not found")

    message.text = updated_message.text

    return message

# delete message
@app.delete("/messages/{message_id}", response_model=Message)
def delete_message(message_id: str):
    global messages_db
    # message = next((msg for msg in messages_db if msg.id == message_id), None)

    message = None
    for msg in messages_db:
        if msg.id == message_id:
            message = msg
            break

    if message is None:
        raise HTTPException(status_code=404, detail="Message not found")

    messages_db = [msg for msg in messages_db if msg.id != message_id]
    return message
