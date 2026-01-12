"use client";
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
        priority: "Low", //selected priority will go here
        assignedEmail: "email", //assigned email will go here
        assignedName: "name",
      },
      {
        id: 2,
        title: "Card 2",
        priority: "High",
        assignedEmail: "email",
        assignedName: "name 2",
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
        priority: "Medium",
        assignedEmail: "email",
        assignedName: "name 3",
      },
      {
        id: 2,
        title: "Card 4",
        priority: "High",
        assignedEmail: "email",
        assignedName: "name 4",
      },
      {
        id: 3,
        title: "Card 5",
        priority: "Low",
        assignedEmail: "email",
        assignedName: "name 5",
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
        priority: "Medium",
        assignedEmail: "email",
        assignedName: "name 3",
      },
      {
        id: 2,
        title: "Card 4",
        priority: "High",
        assignedEmail: "email",
        assignedName: "name 4",
      },
      {
        id: 3,
        title: "Card 5",
        priority: "Low",
        assignedEmail: "email",
        assignedName: "name 5",
      },
    ],
  },
  {
    id: 4,
    title: "List 2",
    status: "DONE",
    cards: [
      {
        id: 1,
        title: "Card 3",
        priority: "Medium",
        assignedEmail: "email",
        assignedName: "name 3",
      },
      {
        id: 2,
        title: "Card 4",
        priority: "High",
        assignedEmail: "email",
        assignedName: "name 4",
      },
      {
        id: 3,
        title: "Card 5",
        priority: "Low",
        assignedEmail: "email",
        assignedName: "name 5",
      },
    ],
  },
];

export function ListCards() {
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
