import {
  Children,
  cloneElement,
  ComponentProps,
  ReactElement,
  useEffect,
  useState,
} from "react";
import SelectableCard from "@/components/actions/selectable_card";

type SelectableCardElement = ReactElement<
  ComponentProps<typeof SelectableCard>
>;

export default function SelectableCardContainer({
  children,
  default_selected = 0,
  selected,
  className = "",
  onSelectedChange,
}: {
  children?: SelectableCardElement | SelectableCardElement[];
  default_selected?: number;
  selected?: number;
  className?: string;
  onSelectedChange?: (selectedIndex: number) => void;
}) {
  const [selected_index, set_selected_index] = useState<number>(
    selected ?? default_selected
  );
  const handle_select = (index: number) => {
    // selected propが渡されていない場合のみ内部stateを更新（非制御モード）
    if (selected === undefined) {
      set_selected_index(index);
    }
    onSelectedChange?.(index);
  };
  // selected propが変更されたら内部stateも更新
  useEffect(() => {
    if (selected !== undefined) {
      set_selected_index(selected);
    }
  }, [selected]);
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (!child) return null;

        return cloneElement(child, {
          is_selected: selected_index === index,
          onClick: (
            e:
              | React.MouseEvent<HTMLDivElement>
              | React.KeyboardEvent<HTMLDivElement>
          ) => {
            handle_select(index);
            child.props.onClick?.(e);
          },
        });
      })}
    </div>
  );
}
