import React from "react";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { data } from "./data";

type Props = {
  label: string;
};

const TRANSITIONS = {
  overlay: {
    enterFromClass: "opacity-0 scale-75",
    enterActiveClass:
      "transition-transform transition-opacity duration-150 ease-in",
    leaveActiveClass: "transition-opacity duration-150 ease-linear",
    leaveToClass: "opacity-0",
  },
};

const PortSelection = () => {
  const [value, setValue] = React.useState<string>("");
  const [items, setItems] = React.useState<string[]>([]);

  const ports = data.data.ports;
  const areas = data.data.areas;

  const allPorts = { ...ports, ...areas };

  const defaultlist = Object.values(allPorts).map((item) => {
    return item;
  });

  console.log("defaultlist", defaultlist);

  const itemTemplate = (item) => {
    console.log("item", item);

    if (item.arrea_name) {
      return
      <><div className="flex align-items-center">{item.name_el}</div>
        <ul>{item.childs.map((child)=><li>{child.name_en}</li>)}</ul>
      </>  
    }

    return (
      item.name_el && (
        <div className="flex align-items-center">{item.name_el}</div>
      )
    );
  };
  const search = (e) => {
    const term = e.query.toLowerCase();
    const filteredData = Object.values(defaultlist)
      .filter(
        (item) =>
          item.search_keywords.toLowerCase().includes(term) ||
          (item.name_el && item.name_el.toLowerCase().includes(term)),
      )
      .map((item) => {
        if (item.childs) {
          const childList = item.childs.map((child) => ports[child]);
          return { arrea_name: item.name_el, childs: childList };
        }
        return item;
      });
    console.log("filteredData", filteredData);

    setItems(filteredData);
  };

  const autoRef: any = React.useRef(null);

  const handleFocus = (e) => {
    setItems(defaultlist);
    if (autoRef.current) autoRef.current?.show();
  };
  return (
    <div className="w-full">
      <div className="flex justify-content-center items-center gap-2">
        <AutoComplete
          itemTemplate={itemTemplate}
          showEmptyMessage
          emptyMessage={"no results"}
          type="search"
          ref={autoRef}
          onFocus={handleFocus}
          onClear={handleFocus}
          onSelect={(e) => {
            setValue(e.value.name_el);
          }}
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={(e) => {
            setValue(e.value);
          }}
        />
      </div>
      {/* {allPorts && <div>{JSON.stringify(allPorts)}</div>} */}
    </div>
  );
};

export default PortSelection;
