export interface Festival {
  id: string;
  name: string;
  location?: string;
  dateStart?: string;
  dateEnd?: string;
  emoji?: string;
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  categoryId: string;
  label: string;
  optional: boolean;
  note?: string;
  isWarning?: boolean;
}

export interface ChecklistCategory {
  id: string;
  label: string;
  icon: string;
  items: ChecklistItem[];
}

export interface FestivalProgress {
  festivalId: string;
  checkedItems: string[];
  lastUpdated: string;
}

export const STORAGE_KEYS = {
  festivals: "festpack:festivals",
  progress:  (id: string) => `festpack:progress:${id}`,
  collapsed: (id: string) => `festpack:collapsed:${id}`,
} as const;
