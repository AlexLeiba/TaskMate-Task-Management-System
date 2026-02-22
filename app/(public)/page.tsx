import { Features } from "@/components/layout/Public/Home/Features/Features";
import { Hero } from "@/components/layout/Public/Home/Hero/Hero";
import { LayoutContainer } from "@/components/layout/Public/LayoutContainer/LayoutContainer";
import { SliderProvider } from "@/components/ui/slider";

export default async function Home() {
  return (
    <div className=" w-full">
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

      {/* <LayoutContainer fluid className="bg-tertiary/60"> */}
      {/* <LayoutContainer>
        </LayoutContainer> */}

      {/* <FromMessageToAction /> */}
      {/* </LayoutContainer> */}
    </div>
  );
}
