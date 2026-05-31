import { Metadata } from "next";
import KDLessonsView from "./KDLessonsView";

export const metadata: Metadata = {
  title: "KD Lessons",
  description: "Digital classroom with live sessions, lesson notes, and bookmarks — part of the KD Tech Wiki.",
};

export default function KDLessonsPage() {
  return <KDLessonsView />;
}
