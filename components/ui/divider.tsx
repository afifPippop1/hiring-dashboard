import { cn } from "@/lib/utils";

interface DividerProps extends React.ComponentProps<"div"> {
  text?: string;
}

function DividerLine(props: React.ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={cn("flex-1 border-b border-neutral-60", props.className)}
    />
  );
}

export function Divider({ text, ...props }: DividerProps) {
  if (!text) return <DividerLine {...props} />;

  return (
    <div className="flex items-center gap-3">
      <DividerLine {...props} />
      <p className={cn("text-sm text-neutral-60", props.className)}>{text}</p>
      <DividerLine {...props} />
    </div>
  );
}
