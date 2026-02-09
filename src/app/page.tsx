import HomeClient from "./home-client";

interface NftListItem {
  id: string;
  name: string;
}

async function fetchData(): Promise<NftListItem[]> {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/nfts/list", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("API error");
    const data: NftListItem[] = await res.json();
    return data.slice(0, 20);
  } catch {
    return Array.from({ length: 20 }, (_, i) => ({
      id: `nft-${i}`,
      name: `NFT Collection #${i + 1}`,
    }));
  }
}

export default async function Home() {
  const nfts = await fetchData();
  return <HomeClient items={nfts} />;
}
