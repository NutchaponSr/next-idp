import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRenameCompetency } from "../api/use-rename-competency";

interface CompetencyRenameProps {
  height: number;
  isOpen: boolean;
  id: string;
  name: string;
  onClose: () => void;
}

export const CompetencyRename = ({ 
  height,
  isOpen,
  id,
  name,
  onClose 
}: CompetencyRenameProps) => {
  const { mutate: rename } = useRenameCompetency();

  const [nameForm, setNameForm] = useState<string>(name);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    rename({
      param: { id },
      json: {
        name: nameForm, 
      }
    }, {
      onSuccess: () => onClose(),
    })
  }
  
  return (
    <Popover 
      open={isOpen} 
      onOpenChange={() => {
        setNameForm(name);

        onClose();
      }}
    >
      <PopoverContent className="fixed left-5 w-[343px] p-0" style={{ top: `${height + 35}px` }}>
        <form className="flex items-center p-1 gap-1" onSubmit={onSubmit}>
          <Input 
            value={nameForm}
            area="sm"
            variant="secondary"
            onChange={(e) => setNameForm(e.target.value)}
          />
          <Button size="sm" variant="primary">
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}