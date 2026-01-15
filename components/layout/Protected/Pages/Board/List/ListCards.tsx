import { ListDataType } from "@/lib/types";

import { ListCard } from "./ListCard/ListCard";
import { AddNewListCard } from "./ListCard/AddNewListCard";

const listData: ListDataType[] = [
  {
    id: 1,
    title: "List 1",
    status: "todo", //selected status will go here
    cards: [
      {
        id: 1,
        title: "Card 1",
        priority: "low", //selected priority will go here
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
      {
        id: 2,
        title: "Card 2",
        priority: "high",

        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
    ],
  },
  {
    id: 2,
    title: "List 2",
    status: "done",
    cards: [
      {
        id: 1,
        title: "Card 3",
        priority: "medium",
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
      {
        id: 2,
        title: "Card 4",
        priority: "high",
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
      {
        id: 3,
        title: "Card 5",
        priority: "low",
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
    ],
  },
  {
    id: 3,
    title: "List 2",
    status: "progress",
    cards: [
      {
        id: 1,
        title: "Card 3",
        priority: "medium",
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
      {
        id: 2,
        title: "Card 4",
        priority: "high",
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
      {
        id: 3,
        title: "Card 5",
        priority: "low",
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
    ],
  },
  {
    id: 4,
    title: "List 2",
    status: "done",
    cards: [
      {
        id: 1,
        title: "Card 3",
        priority: "Medium",
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
      {
        id: 2,
        title: "Card 4",
        priority: "High",
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
      {
        id: 3,
        title: "Card 5",
        priority: "Low",
        assignedTo: {
          email: "email",
          name: "name 2",
          avatar: `https://picsum.photos/300/300`,
        },
        listName: "List 2",
        listId: "2",
      },
    ],
  },
];

export function ListCards() {
  // TODO fetch list data here
  return (
    <ol className="flex gap-4 w-full ">
      {listData.map((list) => (
        <ListCard key={list.id} listData={list} />
      ))}
      {/* CARD: ADD NEW LIST*/}
      <AddNewListCard />
    </ol>
  );
}
