import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
  onIndexChange?: (id: number) => void;
}

function Stack(props: StackProps) {
  const {
    randomRotation = false,
    sensitivity = 200,
    cardDimensions = { width: 208, height: 208 },
    cardsData = [
      { id: 1, img: './images/van_gogh.png' },
      { id: 2, img: './images/monet.png' },
      { id: 3, img: './images/cezanne.png' },
      { id: 4, img: './images/ukiyo.png' }
    ],
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = false,
    onIndexChange
  } = props;

  const [cards, setCards] = useState([...cardsData].reverse());

  // Kirim id kartu paling depan ke parent setiap kali urutan kartu berubah
  useEffect(() => {
    if (onIndexChange && cards.length > 0) {
      onIndexChange(cards[cards.length - 1].id); // Kartu terakhir di array adalah yang paling depan
    }
  }, [cards, onIndexChange]);

  const sendToBack = (id: number) => {
    setCards(prev => {
      const newCards = [...prev];
      const index = newCards.findIndex(card => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card); // Pindahkan ke depan array (tapi render di belakang)
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        const reverseIndex = cards.length - 1 - index; // Balik urutan
        const zIndex = index + 1; // Index lebih besar = z-index lebih tinggi

        return (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-none"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: reverseIndex * 4 + randomRotate,
                scale: 1 - reverseIndex * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                zIndex
              }}
            >
              <img src={card.img} alt={`card-${card.id}`} className="w-full h-full object-cover pointer-events-none" />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}

export default Stack;