import { Input } from "../admin/components/ui/Input";
import { Button } from "../admin/components/ui/Button";

export default function NewsLetter() {
  return (
    <section className="py-12 text-center">
      <div className="space-y-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold">Stay Connected</h2>
        <p className="text-zinc-600 text-lg">
          Subscribe to our newsletter for exclusive updates, early access to new
          collections, and styling inspiration.
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto">
          <Input
            variant="sharp"
            size="xl"
            type="email"
            placeholder="Enter your email"
            className="sm:flex-1"
          />
          <Button
            type="submit"
            variant="sharp"
            size="lg"
            className="h-auto border-5 border-black"
          >
            SUBSCRIBE
          </Button>
        </div>
        <p className="text-xs text-zinc-600">
          By subscribing, you agree to receive marketing communications from
          LuxeWave. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
