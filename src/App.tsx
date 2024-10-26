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
import { useSprings, animated, config } from "@react-spring/web";
import { ChevronDown } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useDrag } from "@use-gesture/react";
import move from "lodash-move";
import clamp from "lodash.clamp";

const App = () => {
  const items = useMemo(() => {
    return [
      {
        id: 1,
        title: "mail",
        children: [1, 2, 3, 4],
      },
      {
        id: 2,
        title: "chat",
        children: [1, 2, 3, 4],
      },
      {
        id: 3,
        title: "todo",
        children: [1, 2, 3, 4],
      },
      {
        id: 4,
        title: "all",
        children: [1, 2, 3, 4],
      },
    ];
  }, []);

  const [openStateList, setOpenStateList] = useState(items.map(() => false));
  const fn =
    (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
    (index: number) => {
      const curOpenStateList = order
        .slice(0, order.indexOf(index))
        .map((i) => openStateList[i])
        .filter((i) => i);

      const num = curOpenStateList.length * 36 * 4;
      return active && index === originalIndex
        ? {
            y: num + curIndex * 36 + y,
            scale: 1.1,
            zIndex: 1,
            shadow: 15,
            immediate: (key: string) => key === "zIndex",
            config: (key: string) =>
              key === "y" ? config.stiff : config.default,
          }
        : {
            y: order.indexOf(index) * 36 + num,
            scale: 1,
            zIndex: 0,
            shadow: 1,
            immediate: false,
          };
    };

  const order = useRef(items.map((_, index) => index));
  const [springs, api] = useSprings(items.length, fn(order.current), [
    openStateList,
  ]);

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 36 + y) / 36),
      0,
      items.length - 1
    );
    const newOrder = move(order.current, curIndex, curRow);
    api.start(fn(newOrder, active, originalIndex, curIndex, y));
    if (!active) {
      order.current = newOrder;
    }
  });

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
            <div className="relative">
              {springs.map(({ zIndex, shadow, y, scale }, i) => (
                <animated.div
                  {...bind(i)}
                  key={i}
                  style={{
                    zIndex,
                    boxShadow: shadow.to(
                      (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
                    ),
                    y,
                    scale,
                  }}
                  className="absolute  w-full touch-none pl-[32px]"
                >
                  <Collapsible
                    defaultOpen
                    className="group/collapsible"
                    open={openStateList[i]}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <a
                            href="#"
                            onClick={() =>
                              setOpenStateList(
                                openStateList.map((item, y) =>
                                  y === i ? !item : item
                                )
                              )
                            }
                          >
                            <span>{items[i].title}</span>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </a>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <SidebarMenuSub>
                        {items[i].children.map((child, index) => {
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
                </animated.div>
              ))}
            </div>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};
export default App;