"use client";

import NftSlider from "@/components/NftSlider";

interface NftItem {
  id: string;
  name: string;
}

export default function HomeClient({ items }: { items: NftItem[] }) {
  return (
    <main className="main">
      <NftSlider items={items} />
    </main>
  );
}
