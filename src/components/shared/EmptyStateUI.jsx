import { Button } from "@/components/ui/Button";

export function EmptyStateUI({ title, description, link, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>
      <Button asChild>{link}</Button>
    </div>
  );
}
