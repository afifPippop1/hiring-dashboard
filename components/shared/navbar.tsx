import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <nav className="h-16 bg-neutral-10 border border-[#EFEEEE] shadow-button flex items-center justify-between p-6">
      <div>
        <Button variant="outline" size="sm">Job list</Button>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
}
