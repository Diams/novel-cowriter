import { CanonData } from "@/utils/data_type";

const STORAGE_KEY = "novel-cowriter-canons";

/**
 * LocalStorageからすべてのCanonDataを取得
 */
export function GetAllCanons(): CanonData[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to get canons from localStorage:", error);
    return [];
  }
}

/**
 * IDを指定してCanonDataを取得
 */
export function GetCanonById(id: string): CanonData | null {
  const canons = GetAllCanons();
  return canons.find((canon) => canon.id === id) || null;
}

/**
 * typeを指定してCanonDataをフィルタリング
 */
export function GetCanonsByType(type: "settings" | "story"): CanonData[] {
  const canons = GetAllCanons();
  return canons.filter((canon) => canon.type === type);
}

/**
 * 新しいCanonDataを作成
 */
export function CreateCanon(
  canon: Omit<CanonData, "id" | "version">
): CanonData {
  const canons = GetAllCanons();

  const newCanon: CanonData = {
    ...canon,
    id: GenerateId(),
    version: 1,
  };

  canons.push(newCanon);
  SaveCanons(canons);

  return newCanon;
}

/**
 * 既存のCanonDataを更新
 */
export function UpdateCanon(
  id: string,
  updates: Partial<Omit<CanonData, "id" | "version">>
): CanonData | null {
  const canons = GetAllCanons();
  const index = canons.findIndex((canon) => canon.id === id);

  if (index === -1) {
    console.error(`Canon with id ${id} not found`);
    return null;
  }

  canons[index] = {
    ...canons[index],
    ...updates,
    version: canons[index].version + 1,
  };

  SaveCanons(canons);

  return canons[index];
}

/**
 * CanonDataを削除
 */
export function DeleteCanon(id: string): boolean {
  const canons = GetAllCanons();
  const filteredCanons = canons.filter((canon) => canon.id !== id);

  if (canons.length === filteredCanons.length) {
    console.error(`Canon with id ${id} not found`);
    return false;
  }

  SaveCanons(filteredCanons);
  return true;
}

/**
 * すべてのCanonDataを削除
 */
export function DeleteAllCanons(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to delete all canons:", error);
  }
}

/**
 * LocalStorageにCanonDataを保存
 */
export function SaveCanons(canons: CanonData[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(canons));
  } catch (error) {
    console.error("Failed to save canons to localStorage:", error);
  }
}

/**
 * ユニークなIDを生成（内部用）
 */
function GenerateId(): string {
  if (
    typeof window !== "undefined" &&
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }
  // フォールバック: UUID v4形式の疑似生成
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
