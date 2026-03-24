import { MoreFeatures } from "@/components/Public/Pages/LandingPage/MoreFeatures/MoreFeatures";
import { OrganizationFeatures } from "@/components/Public/Pages/LandingPage/Features/OrganizationFeatures";

import { Hero } from "@/components/Public/Pages/LandingPage/Hero/Hero";
import { LayoutContainer } from "@/components/Public/LayoutContainer/LayoutContainer";
import { Testimonials } from "@/components/Public/Testimonials/Testimonials";
import { SliderProvider } from "@/components/ui/slider";
import { ExecutionFeatures } from "@/components/Public/Pages/LandingPage/Features/ExecutionFeatures";
import { Overview } from "@/components/Public/Pages/LandingPage/Overview/Overview";

export default async function Home() {
  return (
    <div className="w-full">
      <LayoutContainer fluid className="bg-cyan-950">
        <LayoutContainer>
          <Hero />
        </LayoutContainer>
      </LayoutContainer>

      <LayoutContainer>
        <SliderProvider>
          <OrganizationFeatures />
        </SliderProvider>
      </LayoutContainer>

      <LayoutContainer fluid className="bg-stone-900">
        <LayoutContainer>
          <SliderProvider>
            <ExecutionFeatures />
          </SliderProvider>
        </LayoutContainer>
      </LayoutContainer>

      <LayoutContainer>
        <Overview />
      </LayoutContainer>

      <LayoutContainer fluid className="bg-stone-900">
        <LayoutContainer>
          <MoreFeatures />
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
