import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/Sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  SortEvent,
  SortEventWithTag,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { type Item } from "./types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const elementWrapped = ({ value }: { value: Item }) => {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible defaultOpen className="group/collapsible" open={open}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton asChild>
            <a href="#">
              <span>{value.title}</span>
              <ChevronDown
                className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(!open);
                }}
              />
            </a>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <SidebarMenuSub>
          {value.children.map((child, index) => {
            return (
              <CollapsibleContent key={index}>
                <SidebarMenuSubItem>
                  <SidebarMenuButton asChild>
                    <a href="#">{child}</a>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              </CollapsibleContent>
            );
          })}
        </SidebarMenuSub>
      </SidebarMenuItem>
    </Collapsible>
  );
};
const containerWrapped = ({ items }: { items: Item[] }) => {
  return (
    <div>
      {items.map((value, i) => (
        <SortableItem key={`item-${value.id}`} index={i} value={value} />
      ))}
    </div>
  );
};

const SortableItem = SortableElement<{ value: Item }>(elementWrapped);

const SortableList = SortableContainer<{ items: Item[] }>(containerWrapped, {
  withRef: true,
});

const App = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      title: "mail",
      children: [1, 2, 3, 4],
      isOpen: true,
    },
    {
      id: 2,
      title: "chat",
      children: [1, 2, 3, 4],
      isOpen: false,
    },
    {
      id: 3,
      title: "todo",
      children: [1, 2, 3, 4],
      isOpen: false,
    },
    {
      id: 4,
      title: "all",
      children: [1, 2, 3, 4],
      isOpen: false,
    },
  ]);

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };
  const shouldCancelStart = (e: SortEvent | SortEventWithTag) => {
    const event = e as SortEventWithTag;
    return event.target.tagName === "svg";
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <div>index</div>
            </SidebarGroupLabel>
          </SidebarGroup>
          <SidebarMenu>
            <SortableList
              helperClass="z-10"
              items={items}
              onSortEnd={onSortEnd}
              shouldCancelStart={shouldCancelStart}
            />
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};
export default App;
