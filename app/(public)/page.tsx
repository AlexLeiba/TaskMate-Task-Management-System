import { MoreFeatures } from "@/components/layout/Public/Home/MoreFeatures/MoreFeatures";
import { Features } from "@/components/layout/Public/Home/Features/Features";
import { FromMessageToAction } from "@/components/layout/Public/Home/FromMessageToAction/FromMessageToAction";
import { Hero } from "@/components/layout/Public/Home/Hero/Hero";
import { LayoutContainer } from "@/components/layout/Public/LayoutContainer/LayoutContainer";
import { Testimonials } from "@/components/layout/Public/Testimonials/Testimonials";
import { SliderProvider } from "@/components/ui/slider";
import { Spacer } from "@/components/ui/spacer";

export default async function Home() {
  return (
    <div className="w-full">
      <LayoutContainer fluid className="bg-tertiary/20">
        <LayoutContainer>
          <Hero />
        </LayoutContainer>
      </LayoutContainer>

      <LayoutContainer>
        <SliderProvider>
          <Features />
        </SliderProvider>
      </LayoutContainer>

      <LayoutContainer fluid className="bg-tertiary/60">
        <LayoutContainer>
          <FromMessageToAction />
        </LayoutContainer>
      </LayoutContainer>

      <LayoutContainer>
        <Spacer sm={64} md={72} size={64} />
        <MoreFeatures />
      </LayoutContainer>

      <LayoutContainer>
        <SliderProvider>
          <Testimonials />
        </SliderProvider>
      </LayoutContainer>
    </div>
  );
}
