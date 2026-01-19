import InfoGrid from "@/components/shared/InfoGrid";
import { Alert, AlertAction, AlertContent } from "@/components/ui/Alert";
import React from "react";

export default function ProfileInfosSection({
  title,
  fields,
  fallback,
  onFallbackClick,
  fallbackActionText,
}) {
  return (
    <div className="pb-10">
      <h2 className="text-3xl font-bold tracking-tight my-10">{title}</h2>

      <div className="flex flex-col gap-4">
        {fallback && (
          <Alert variant="error">
            <AlertContent>{fallback}</AlertContent>

            {onFallbackClick && (
              <AlertAction onClick={onFallbackClick}>
                {fallbackActionText || "Add Now"}
              </AlertAction>
            )}
          </Alert>
        )}

        <InfoGrid fields={fields} />
      </div>
    </div>
  );
}
