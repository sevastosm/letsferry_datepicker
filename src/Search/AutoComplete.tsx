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

  const defaultlist = Object.values({ ...areas, ...ports }).map((item) => {
    return item;
  });

  console.log("defaultlist", defaultlist);

  const itemTemplate = (item) => {
    // console.log(item);
    return <div className="flex align-items-center">{item.plaintext}</div>;
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
        return item;
      });
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
            setValue(e.value.plaintext);
          }}
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={(e) => {
            setValue(e.value);
          }}
        />
      </div>
    </div>
  );
};

export default PortSelection;
