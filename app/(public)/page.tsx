import { OrganizationFeatures } from "@/components/Public/Pages/LandingPage/Features/OrganizationFeatures";
import { Hero } from "@/components/Public/Pages/LandingPage/Hero/Hero";
import { LayoutContainer } from "@/components/Public/LayoutContainer/LayoutContainer";
import { SliderProvider } from "@/components/ui/slider";

import dynamic from "next/dynamic";

const ExecutionFeatures = dynamic(() =>
  import("@/components/Public/Pages/LandingPage/Features/ExecutionFeatures").then(
    (m) => m.ExecutionFeatures,
  ),
);

const Overview = dynamic(() =>
  import("@/components/Public/Pages/LandingPage/Overview/Overview").then(
    (m) => m.Overview,
  ),
);

const Testimonials = dynamic(() =>
  import("@/components/Public/Testimonials/Testimonials").then(
    (m) => m.Testimonials,
  ),
);

const MoreFeatures = dynamic(() =>
  import("@/components/Public/Pages/LandingPage/MoreFeatures/MoreFeatures").then(
    (m) => m.MoreFeatures,
  ),
);
export default async function Home() {
  return (
    <div className="w-full">
      <LayoutContainer fluid className="bg-cyan-950">
        <LayoutContainer>
          <Hero />
        </LayoutContainer>
      </LayoutContainer>

      <LayoutContainer id="organization-features">
        <SliderProvider>
          <OrganizationFeatures />
        </SliderProvider>
      </LayoutContainer>

      <LayoutContainer fluid className="bg-stone-900">
        <LayoutContainer id="execution-features">
          <SliderProvider>
            <ExecutionFeatures />
          </SliderProvider>
        </LayoutContainer>
      </LayoutContainer>

      <LayoutContainer>
        <Overview />
      </LayoutContainer>

      <LayoutContainer fluid className="bg-stone-900">
        <LayoutContainer id="all-features">
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
