import { LegalPage } from "@/pages/legal/_legal-page";
import { site } from "@/config/site";

type LicenseItem = {
  name: string;
  version?: string;
  license: string;
  homepage?: string;
};

const licenses: LicenseItem[] = [
  { name: "React", license: "MIT", homepage: "https://react.dev/" },
  { name: "Vite", license: "MIT", homepage: "https://vitejs.dev/" },
  { name: "Tailwind CSS", license: "MIT", homepage: "https://tailwindcss.com/" },
  { name: "Radix UI", license: "MIT", homepage: "https://www.radix-ui.com/" },
  { name: "shadcn/ui", license: "MIT", homepage: "https://ui.shadcn.com/" },
  { name: "Framer Motion", license: "MIT", homepage: "https://www.framer.com/motion/" },
  { name: "React Router", license: "MIT", homepage: "https://reactrouter.com/" },
  { name: "Zod", license: "MIT", homepage: "https://zod.dev/" },
  { name: "React Hook Form", license: "MIT", homepage: "https://react-hook-form.com/" },
  { name: "lucide-react", license: "ISC", homepage: "https://lucide.dev/" },
];

export function OpenSourceLicensesPage() {
  return (
    <LegalPage
      title="Open-Source Licenses"
      path="/licenses"
      updatedAt="January 7, 2026"
    >
      <h2>Overview</h2>
      <p>
        This website includes open-source software (&quot;OSS&quot;). We are grateful to
        the OSS community. Applicable OSS licenses may require attribution or inclusion of
        license text, and those licenses govern your use of the OSS components.
      </p>

      <h2>Catalog</h2>
      <p>The following list is provided as a best-effort attribution:</p>
      <ul>
        {licenses.map((l) => (
          <li key={l.name}>
            <strong>{l.name}</strong>
            {l.version ? ` (v${l.version})` : ""} — {l.license}{" "}
            {l.homepage ? (
              <>
                — <a href={l.homepage}>Project link</a>
              </>
            ) : null}
          </li>
        ))}
      </ul>

      <h2>Missing or incorrect attributions</h2>
      <p>
        If you believe any attribution is missing or incorrect, please contact {site.legalName} at{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and we will address it.
      </p>
    </LegalPage>
  );
}



