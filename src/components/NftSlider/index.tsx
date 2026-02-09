"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import NftCard from "../NftCard";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import styles from "./nft-slider.module.scss";

interface NftItem {
  id: string;
  name: string;
}

interface NftSliderProps {
  items: NftItem[];
}

interface CardData extends NftItem {
  imageIndex: number;
  bidPrice: number;
  endTime: number;
}

const CARD_WIDTH = 281;
const CARD_GAP = 24;
const MOBILE_CARD_WIDTH = 240;
const SETS = 3; 

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateCardData(items: NftItem[]): CardData[] {
  return items.map((item, i) => ({
    ...item,
    imageIndex: i,
    bidPrice: Math.round((1 + seededRandom(i) * 8.99) * 100) / 100,
    endTime: Math.floor(3600000 + seededRandom(i + 100) * 36000000),
  }));
}

export default function NftSlider({ items }: NftSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardData] = useState(() => generateCardData(items));
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const offsetRef = useRef(0);

  const cardW = isMobile ? MOBILE_CARD_WIDTH : CARD_WIDTH;
  const step = cardW + CARD_GAP;
  const oneSetWidth = cardData.length * step; 


  const initialOffset = -oneSetWidth;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  
  useEffect(() => {
    offsetRef.current = initialOffset;
    controls.set({ x: initialOffset });
  }, [initialOffset, controls]);

 
  const wrapOffset = useCallback(
    (offset: number) => {
     
      let wrapped = offset;
      if (wrapped > -0) {
        wrapped -= oneSetWidth;
      } else if (wrapped < -(oneSetWidth * 2)) {
        wrapped += oneSetWidth;
      }
      if (wrapped !== offset) {
        offsetRef.current = wrapped;
        controls.set({ x: wrapped });
      }
      return wrapped;
    },
    [oneSetWidth, controls]
  );

  const animateTo = useCallback(
    (target: number) => {
      offsetRef.current = target;
      controls
        .start({
          x: target,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        })
        .then(() => {
          wrapOffset(target);
        });
    },
    [controls, wrapOffset]
  );

  const handlePrev = () => {
    animateTo(offsetRef.current + step * 2);
  };

  const handleNext = () => {
    animateTo(offsetRef.current - step * 2);
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    const raw = offsetRef.current + swipe;
    const snapped = Math.round(raw / step) * step;
    animateTo(snapped);
  };

  const handleDrag = () => {
    offsetRef.current = x.get();
  };

  const repeatedCards: { card: CardData; setIndex: number; cardIndex: number }[] = [];
  for (let s = 0; s < SETS; s++) {
    for (let c = 0; c < cardData.length; c++) {
      repeatedCards.push({ card: cardData[c], setIndex: s, cardIndex: c });
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Weekly &ndash; Top NFT
        </motion.h2>
      </div>

      <div className={styles.sliderWrapper} ref={containerRef}>
        <motion.div
          className={styles.track}
          drag="x"
          dragConstraints={{ left: -oneSetWidth * 3, right: oneSetWidth * 3 }}
          dragElastic={0.05}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
        >
          {repeatedCards.map(({ card, setIndex, cardIndex }) => (
            <div key={`${setIndex}-${card.id}`} className={styles.cardSlot}>
              <NftCard
                name={card.name}
                imageIndex={card.imageIndex}
                bidPrice={card.bidPrice}
                endTime={card.endTime}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className={styles.controls}>
        <div className={styles.navigator}>
          <button className={styles.arrowBtn} onClick={handlePrev} aria-label="Previous">
            <ArrowLeftIcon />
          </button>
          <div className={styles.navDivider} />
          <button className={styles.arrowBtn} onClick={handleNext} aria-label="Next">
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
