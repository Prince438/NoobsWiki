export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoId: string;
}

export const LESSONS: Lesson[] = [
  {
    id: "lesson-001",
    title: "KD Lesson 1",
    description: "First live session in the KD Tech Wiki digital classroom.",
    videoId: "se3W2Nrgkfk",
  },
  {
    id: "lesson-002",
    title: "KD Lesson 2",
    description: "Second live session — continued learning in the KD Tech Wiki classroom.",
    videoId: "aR95AxdisWE",
  },
];

export const LESSON_NOTES_KEY = "kd-lesson-notes";

export function getLessonNotes(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LESSON_NOTES_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveLessonNote(lessonId: string, note: string): void {
  const all = getLessonNotes();
  if (note.trim()) {
    all[lessonId] = note;
  } else {
    delete all[lessonId];
  }
  localStorage.setItem(LESSON_NOTES_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("kd-notes-changed"));
}

export function deleteLessonNote(lessonId: string): void {
  const all = getLessonNotes();
  delete all[lessonId];
  localStorage.setItem(LESSON_NOTES_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("kd-notes-changed"));
}
