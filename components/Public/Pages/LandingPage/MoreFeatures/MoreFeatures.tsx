import { MORE_FEATURES_CARD_DATA } from "@/lib/consts/public/features";
import { AboutFeatureCard } from "./AboutFeatureCard";
import { Spacer } from "@/components/ui/spacer";

export function MoreFeatures() {
  return (
    <div>
      <div className="flex flex-col gap-4 max-w-160 w-full">
        <h2 className="text-4xl">
          Do more with TaskMate{" "}
          <span className="text-2xl">(main features)</span>
        </h2>
        <p className="text-lg">
          Customize the way you organize, prioritize, and handle your to-dos in
          a user friendly envronment that fits your style.
        </p>
      </div>

      <Spacer size={8} />
      <div className="flex items-center gap-4 overflow-x-auto scroll-container ">
        {MORE_FEATURES_CARD_DATA.map((data) => {
          return <AboutFeatureCard key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
}
