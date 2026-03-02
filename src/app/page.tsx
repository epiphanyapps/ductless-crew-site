import { Header, Footer } from "@/components/layout";
import {
  Hero,
  Services,
  Team,
  Testimonials,
  FAQ,
  Process,
  CTA,
  ContactForm,
  ImageCarousel,
  IssueSelector,
} from "@/components/sections";

// Placeholder project images - replace with actual images from Amplify Storage
const projectImages = [
  {
    src: "",
    alt: "Mini Split Installation - Brooklyn Apartment",
    caption: "Ductless mini split installation in a Brooklyn apartment",
  },
  {
    src: "",
    alt: "Electrical Panel Upgrade - Queens Home",
    caption: "200-amp electrical panel upgrade for a Queens residence",
  },
  {
    src: "",
    alt: "LED Lighting Installation - Commercial Space",
    caption: "Commercial LED lighting installation in Manhattan",
  },
  {
    src: "",
    alt: "HVAC Repair - Staten Island",
    caption: "Emergency HVAC repair for a Staten Island home",
  },
  {
    src: "",
    alt: "Smart Home Setup - Brooklyn Brownstone",
    caption: "Smart home automation installation in a Brooklyn brownstone",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <IssueSelector />
        <ImageCarousel images={projectImages} />
        <Process />
        <Team />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
