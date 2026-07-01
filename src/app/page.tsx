import StrankaRenderer from "@/components/StrankaRenderer";
import { getHomepageStranka } from "@/lib/strapi";

export default async function HomePage() {
  const stranka = await getHomepageStranka().catch(() => null);

  if (!stranka?.sekcie?.length) return null;

  return <StrankaRenderer sekcie={stranka.sekcie} />;
}
