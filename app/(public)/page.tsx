import { MoreFeatures } from "@/components/Public/LandingPage/MoreFeatures/MoreFeatures";
import { Features } from "@/components/Public/LandingPage/Features/Features";
import { FromMessageToAction } from "@/components/Public/LandingPage/FromMessageToAction/FromMessageToAction";
import { Hero } from "@/components/Public/LandingPage/Hero/Hero";
import { LayoutContainer } from "@/components/Public/LayoutContainer/LayoutContainer";
import { Testimonials } from "@/components/Public/Testimonials/Testimonials";
import { SliderProvider } from "@/components/ui/slider";

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
