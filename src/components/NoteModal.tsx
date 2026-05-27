import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  questionTitle: string;
}

export default function NoteModal({ isOpen, onClose, questionId, questionTitle }: NoteModalProps) {
  const { notes, saveNote } = useProgress();
  const [localNote, setLocalNote] = useState("");

  useEffect(() => {
    if (isOpen) {
      setLocalNote(notes[questionId] || "");
    }
  }, [isOpen, questionId, notes]);

  const handleSave = () => {
    saveNote(questionId, localNote);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Notes: {questionTitle}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            value={localNote}
            onChange={(e) => setLocalNote(e.target.value)}
            placeholder="Add your personal notes, approach, or edge cases here..."
            className="min-h-[150px] resize-none"
            data-testid={`textarea-note-${questionId}`}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} data-testid={`btn-save-note-${questionId}`}>Save Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
