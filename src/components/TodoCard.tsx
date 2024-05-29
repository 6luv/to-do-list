import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FiEdit3, FiTrash2, FiCheck, FiX } from "react-icons/fi";

interface TodoCardProps {
  todo: ITodo;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

const TodoCard: FC<TodoCardProps> = ({ todo, todos, setTodos }) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>(todo.content);

  const onClickIsDone = () => {
    const updateTodos = todos.map((v) => {
      if (v.id === todo.id) {
        return {
          id: todo.id,
          content: todo.content,
          isDone: !todo.isDone,
        };
      } else {
        return v;
      }
    });

    setTodos(updateTodos);
  };

  const onClickUpdate = () => {
    if (!content) return;

    const updateTodo = todos.map((v) => {
      if (v.id === todo.id) {
        return {
          id: todo.id,
          content,
          isDone: todo.isDone,
        };
      } else {
        return v;
      }
    });

    setTodos(updateTodo);
    setIsUpdateOpen(false);
  };

  const onClickDelete = () => {
    const deleteTodos = todos.filter((v) => {
      if (v.id !== todo.id) {
        return v;
      }
    });

    setTodos(deleteTodos);
  };

  return (
    <Flex bgColor="white" px={4} py={2} rounded="lg" gap={1}>
      {isUpdateOpen ? (
        <Flex>
          <Input value={content} onChange={(e) => setContent(e.target.value)} />
          <Button colorScheme="green" ml={1} onClick={onClickUpdate}>
            <FiCheck />
          </Button>
        </Flex>
      ) : (
        <Text
          fontSize={20}
          w={48}
          isTruncated={true}
          textDecorationLine={`${todo.isDone ? "line-through" : ""}`}
          onClick={onClickIsDone}
        >
          {todo.content}
        </Text>
      )}
      <Button colorScheme="blue" onClick={() => setIsUpdateOpen(!isUpdateOpen)}>
        {isUpdateOpen ? <FiX /> : <FiEdit3 />}
      </Button>
      <Button colorScheme="red" onClick={onClickDelete}>
        <FiTrash2 />
      </Button>
    </Flex>
  );
};

export default TodoCard;
