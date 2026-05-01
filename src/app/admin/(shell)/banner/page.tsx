import { getSettings } from "@/lib/storage";
import { BannerForm } from "./BannerForm";

export const dynamic = "force-dynamic";

export default async function BannerPage() {
  const settings = await getSettings();
  return <BannerForm initial={settings} />;
}
