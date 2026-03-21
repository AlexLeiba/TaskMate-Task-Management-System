import { MoreFeatures } from "@/components/Public/LandingPage/MoreFeatures/MoreFeatures";
import { OrganizationFeatures } from "@/components/Public/LandingPage/Features/OrganizationFeatures";
import { FromMessageToAction } from "@/components/Public/LandingPage/FromMessageToAction/FromMessageToAction";
import { Hero } from "@/components/Public/LandingPage/Hero/Hero";
import { LayoutContainer } from "@/components/Public/LayoutContainer/LayoutContainer";
import { Testimonials } from "@/components/Public/Testimonials/Testimonials";
import { SliderProvider } from "@/components/ui/slider";
import { ExecutionFeatures } from "@/components/Public/LandingPage/Features/ExecutionFeatures";

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
          <OrganizationFeatures />
        </SliderProvider>
      </LayoutContainer>

      <LayoutContainer fluid className="bg-tertiary/60">
        <LayoutContainer>
          <SliderProvider>
            <ExecutionFeatures />
          </SliderProvider>
        </LayoutContainer>
      </LayoutContainer>

      <LayoutContainer>
        <MoreFeatures />
      </LayoutContainer>

      <LayoutContainer fluid className="bg-tertiary/60">
        <LayoutContainer>
          <FromMessageToAction />
        </LayoutContainer>
      </LayoutContainer>

      <LayoutContainer>
        <SliderProvider>
          <Testimonials />
        </SliderProvider>
      </LayoutContainer>
    </div>
  );
}
