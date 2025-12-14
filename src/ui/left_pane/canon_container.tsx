import Canon from "@/components/actions/canon";
import SelectableCard from "@/components/actions/selectable_card";
import SelectableCardContainer from "@/components/containers/selectable_card_container";
import { CanonData } from "@/utils/data_type";

export default function CanonContainer({
  canons,
  selected_index,
  set_selected_index,
  set_n_selected_items,
  is_ai_referenceds,
  set_is_ai_referenceds,
}: {
  canons: CanonData[];
  selected_index: number;
  set_selected_index: (index: number) => void;
  set_n_selected_items: (n: number) => void;
  is_ai_referenceds: { [id: string]: boolean };
  set_is_ai_referenceds: (states: { [id: string]: boolean }) => void;
}) {
  return (
    <SelectableCardContainer
      default_selected={selected_index}
      onSelectedChange={set_selected_index}
      className="w-full space-y-2"
    >
      {canons.map((canon, index) => (
        <SelectableCard key={canon.id} className="w-full">
          <Canon
            id={canon.id}
            title={canon.title}
            description={canon.description}
            version={canon.version}
            is_ai_referenced={is_ai_referenceds[canon.id]}
            onAiReferencedChange={(checked) => {
              const new_states = { ...is_ai_referenceds };
              new_states[canon.id] = checked;
              set_is_ai_referenceds(new_states);
              set_n_selected_items(
                Object.values(new_states).filter((state) => state).length
              );
            }}
          />
        </SelectableCard>
      ))}
    </SelectableCardContainer>
  );
}
