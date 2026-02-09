"use client";

import React, { useEffect, useState, memo } from "react";
import Image from "next/image";
import EthereumIcon from "../icons/EthereumIcon";
import styles from "./nft-card.module.scss";

interface NftCardProps {
  name: string;
  imageIndex: number;
  bidPrice: number;
  endTime: number;
}

const IMAGE_COUNT = 5;

function formatTime(ms: number): string {
  if (ms <= 0) return "00h 00m 00s";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
}

function Timer({ endTime }: { endTime: number }) {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(endTime);

  useEffect(() => {
    setMounted(true);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const left = endTime - elapsed;
      setRemaining(left > 0 ? left : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className={styles.timer} suppressHydrationWarning>
      {mounted ? formatTime(remaining) : formatTime(endTime)}
    </div>
  );
}

const NftCard = memo(function NftCard({ name, imageIndex, bidPrice, endTime }: NftCardProps) {
  const imageSrc = `/images/${(imageIndex % IMAGE_COUNT) + 1}.jpg`;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={imageSrc}
          alt={name}
          fill
          sizes="280px"
          draggable={false}
        />
        <Timer endTime={endTime} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.bidRow}>
          <div className={styles.bidInfo}>
            <span className={styles.bidLabel}>Current bid</span>
            <div className={styles.bidPrice}>
              <EthereumIcon />
              <span>{bidPrice.toFixed(2)}</span>
            </div>
          </div>
          <button className={styles.bidBtn}>PLACE BID</button>
        </div>
      </div>
    </div>
  );
});

export default NftCard;
