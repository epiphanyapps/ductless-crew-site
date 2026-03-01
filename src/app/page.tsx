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
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
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
