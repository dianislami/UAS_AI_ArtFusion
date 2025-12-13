import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

// Custom hook untuk mendeteksi ukuran layar
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export type NavbarItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type NavbarProps = {
  items: NavbarItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  navbarHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type NavbarItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function NavbarItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: NavbarItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full bg-[#310F10] border border-1 shadow-md ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

type NavbarLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function NavbarLabel({ children, className = '', isHovered }: NavbarLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -bottom-10 left-1/2 w-fit whitespace-pre rounded-md border bg-[#310F10] px-2 py-0.5 text-xs`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type NavbarIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function NavbarIcon({ children, className = '' }: NavbarIconProps) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export default function Navbar({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  navbarHeight = 256,
  baseItemSize = 50
}: NavbarProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const windowSize = useWindowSize();

  // Responsive sizing - hanya 20% lebih besar di layar large
  const isLargeScreen = windowSize.width >= 1024; // lg breakpoint
  
  const responsiveBaseItemSize = isLargeScreen ? baseItemSize * 1.2 : baseItemSize; // 20% lebih besar di lg
  const responsiveMagnification = isLargeScreen ? magnification * 1.2 : magnification; // 20% lebih besar di lg
  const responsivePanelHeight = isLargeScreen ? panelHeight * 1.15 : panelHeight; // 15% lebih tinggi di lg
  const responsiveGap = isLargeScreen ? 'gap-5' : 'gap-4'; // Gap sedikit lebih besar di lg

  const maxHeight = useMemo(() => Math.max(navbarHeight, responsiveMagnification + responsiveMagnification / 2 + 4), [navbarHeight, responsiveMagnification]);
  const heightRow = useTransform(isHovered, [0, 1], [responsivePanelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">
      <motion.div
        onMouseMove={({ pageX }: React.MouseEvent) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} absolute top-6 left-1/2 transform -translate-x-1/2 flex items-end w-fit ${responsiveGap} bg-[#310F10]/50 rounded-2xl border backdrop-blur pb-2 px-4 lg:px-5`}
        style={{ height: responsivePanelHeight }}
        role="toolbar"
        aria-label="Application navbar"
      >
        {items.map((item: NavbarItemData, index: number) => (
          <NavbarItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={responsiveMagnification}
            baseItemSize={responsiveBaseItemSize}
          >
            <NavbarIcon>{item.icon}</NavbarIcon>
            <NavbarLabel>{item.label}</NavbarLabel>
          </NavbarItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
