import { PageHero } from "@/components/common/PageHero";
import { ReserveButton } from "@/components/common/ReserveButton";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact & reservations",
  description: "Kahani, 1 Wilbraham Place, London SW1X 9AE, opposite Cadogan Hall. Opening times, reservations, telephone and email.",
  path: "/contact/",
  image: "velvetChairs",
});

export default function Contact() {
  return (
    <>
      <PageHero image="velvetChairs" height="short" kicker="Contact" title={["Find us in Chelsea."]} intro={`${site.address.street}, ${site.address.city} ${site.address.postcode}. ${site.address.landmark}.`}>
        <ReserveButton />
      </PageHero>
      <section className="gutter grid grid-cols-1 gap-px bg-line py-px md:grid-cols-3">
        <div className="bg-obsidian py-14 md:pr-10">
          <p className="t-label text-brass">Address</p>
          <address className="mt-5 text-xl not-italic leading-relaxed" style={{ fontWeight: 320 }}>
            {site.address.street}
            <br />
            {site.address.city}
            <br />
            {site.address.postcode}
          </address>
          <a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="link-line t-nav mt-6">
            Open in Maps <span className="arrow">→</span>
          </a>
        </div>
        <div className="bg-obsidian py-14 md:px-10">
          <p className="t-label text-brass">Opening times</p>
          <dl className="mt-5 space-y-4">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt className="text-muted">{h.days}</dt>
                <dd className="t-num text-xl" style={{ fontWeight: 320 }}>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="bg-obsidian py-14 md:pl-10">
          <p className="t-label text-brass">Reservations</p>
          <a href={site.phone.href} className="t-num mt-5 block text-xl hover:text-brass" style={{ fontWeight: 320 }}>{site.phone.display}</a>
          <a href={`mailto:${site.email.reservations}`} className="mt-2 block break-all text-ivory/80 hover:text-ivory">{site.email.reservations}</a>
          <p className="t-label mt-8 text-muted">Press</p>
          <a href={`mailto:${site.email.press}`} className="mt-2 block break-all text-ivory/80 hover:text-ivory">{site.email.press}</a>
        </div>
      </section>
      <section className="gutter py-20">
        <div className="frame aspect-[16/9] max-h-[70svh] w-full border border-line lg:aspect-[21/9]">
          <iframe
            title="Map showing Kahani at 1 Wilbraham Place, London"
            src="https://www.google.com/maps?q=Kahani+1+Wilbraham+Place+London+SW1X+9AE&output=embed"
            className="h-full w-full grayscale invert-[0.9] contrast-[0.9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
