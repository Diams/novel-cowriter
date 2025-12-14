import Canon from "@/components/actions/canon";
import SelectableCard from "@/components/actions/selectable_card";
import SelectableCardContainer from "@/components/containers/selectable_card_container";
import { CanonData } from "@/utils/data_type";

export default function CanonContainer({
  canons,
  selected_index,
  set_selected_index,
  is_ai_referenceds,
  set_is_ai_referenceds,
  onEdited,
  onDelete,
}: {
  canons: CanonData[];
  selected_index: number;
  set_selected_index: (index: number) => void;
  is_ai_referenceds: { [id: string]: boolean };
  set_is_ai_referenceds: (states: { [id: string]: boolean }) => void;
  onEdited?: (id: string, new_title: string, new_description: string) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <SelectableCardContainer
      default_selected={selected_index}
      onSelectedChange={set_selected_index}
      className="w-full space-y-2"
    >
      {canons.map((canon) => (
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
            }}
            onClickEdit={() => {
              const new_title = prompt("タイトルを編集", canon.title);
              if (new_title) {
                const new_description = prompt("説明を編集", canon.description);
                if (new_description) {
                  onEdited?.(canon.id, new_title, new_description);
                }
              }
            }}
            onClickDelete={() => {
              const ok = confirm(
                `「${canon.title}」を削除しますか？\n（AI参照チェックも解除されます）`
              );
              if (!ok) return;
              onDelete?.(canon.id);
            }}
          />
        </SelectableCard>
      ))}
    </SelectableCardContainer>
  );
}
