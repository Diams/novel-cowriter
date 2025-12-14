import Canon from "@/components/actions/canon";
import SelectableCard from "@/components/actions/selectable_card";
import SelectableCardContainer from "@/components/containers/selectable_card_container";
import { CanonData } from "@/utils/data_type";

export default function CanonContainer({
  canons,
  selected_canon,
  set_selected_canon,
  is_ai_referenceds,
  set_is_ai_referenceds,
  onEdited,
  onDelete,
}: {
  canons: CanonData[];
  selected_canon: string;
  set_selected_canon: (id: string) => void;
  is_ai_referenceds: { [id: string]: boolean };
  set_is_ai_referenceds: (states: { [id: string]: boolean }) => void;
  onEdited?: (id: string, new_title: string, new_description: string) => void;
  onDelete?: (id: string, type: "settings" | "story") => void;
}) {
  const selected_index = canons.findIndex((c) => c.id === selected_canon);
  return (
    <SelectableCardContainer
      selected={selected_index}
      onSelectedChange={(index: number) => {
        if (canons[index]) {
          set_selected_canon(canons[index].id);
        }
      }}
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
              onDelete?.(canon.id, canon.type);
            }}
          />
        </SelectableCard>
      ))}
    </SelectableCardContainer>
  );
}
