import { Features } from "@/components/layout/Public/Home/Features/Features";
import { Hero } from "@/components/layout/Public/Home/Hero/Hero";
import { LayoutContainer } from "@/components/layout/Public/LayoutContainer/LayoutContainer";
import { SliderProvider } from "@/components/ui/slider";

export default async function Home() {
  return (
    <div className=" w-full">
      <LayoutContainer fluid className="bg-tertiary/20">
        <Hero />
      </LayoutContainer>
      <LayoutContainer>
        <SliderProvider>
          <Features />
        </SliderProvider>
      </LayoutContainer>
    </div>
  );
}
