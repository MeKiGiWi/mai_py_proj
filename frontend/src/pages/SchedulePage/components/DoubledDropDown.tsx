type DoubleDropDownProps = {
  titles: string[];
  items: string[][];
  handleClick: (title: string, item: string) => void;
};
export default function DoubleDropDown({
  titles,
  items,
  handleClick,
}: DoubleDropDownProps) {
  return (
    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48">
      {titles.map((title, index) => (
        <li className="dropdown dropdown-right">
          <div tabIndex={0} role="button" className="flex justify-between">
            <span>{title}</span>
          </div>
          <ul
            className="dropdown-content z-[2] menu p-2 shadow bg-base-100 
            rounded-box w-48 ml-2 max-h-56 overflow-y-auto overflow-x-hidden 
            no-scrollbar grid grid-cols-1 gap-1"
          >
            {items[index].map((item) => (
              <li key={item}>
                <button onClick={() => handleClick(title, item)}>{item}</button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
