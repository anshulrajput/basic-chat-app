/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit
} from "react-icons/ai";

import Message from "../interfaces/Message";

function UserMessage(props: {
  message: Message;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  const { message, onDelete, onEdit } = props;
  const { text } = message;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(text);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setEditMode(false);

    console.log(message.text);
  }, [message.text]);

  const editHandler = () => {
    setEditMode(true);
    setEditedText(text);
  };

  const cancelEditHandler = () => {
    setEditMode(false);
  };

  const saveEditHandler = () => {
    if (editedText === message.text) {
      cancelEditHandler();
    } else {
      onEdit(message.id, editedText);
    }
  };

  return (
    <div className="flex">
      <div className="bg-gray-200 p-3 rounded-r-3xl rounded-bl-3xl">
        {/* show edit and delete buttons */}
        {!editMode && (
          <>
            <p className="text-sm text-gray-900">{text}</p>
            <span className="flex p-1 mt-1">
              <AiOutlineEdit
                className="mr-2 cursor-pointer"
                onClick={() => editHandler()}
              />
              <AiOutlineDelete
                className="cursor-pointer"
                onClick={() => onDelete(message.id)}
              />
            </span>
          </>
        )}

        {/* show save and cancel buttons */}
        {editMode && (
          <>
            <textarea
              cols={36}
              rows={5}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <span className="flex p-1 mt-1">
              <AiOutlineClose
                className="mr-2 cursor-pointer"
                onClick={cancelEditHandler}
              />
              <AiOutlineCheck
                className="cursor-pointer"
                onClick={saveEditHandler}
              />
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default UserMessage;
