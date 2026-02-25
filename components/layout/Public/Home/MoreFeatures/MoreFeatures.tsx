import { MORE_FEATURES_CARD_DATA } from "@/lib/consts";
import { AboutFeatureCard } from "./AboutFeatureCard";
import { Spacer } from "@/components/ui/spacer";

export function MoreFeatures() {
  return (
    <div>
      <div className="flex flex-col gap-4 max-w-125 w-full">
        <h2 className="text-4xl">Do more with TaskMate</h2>
        <p className="text-lg">
          Customize the way you organize with easy integrations, automation, and
          mirroring of your to-dos across multiple locations.
        </p>
      </div>

      <Spacer size={8} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {MORE_FEATURES_CARD_DATA.map((data) => {
          return <AboutFeatureCard key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
}
