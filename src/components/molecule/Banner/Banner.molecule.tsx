import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Cross, Info, Warning, Error, Success } from "@/components/atoms/Icons/Icons";

type BannerType = 'info' | 'warning' | 'error' | 'success' | 'announcement' | 'maintenance' | 'update';
type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce';
type PositionType = 'top' | 'bottom' | 'left' | 'right';

interface Translations {
  [key: string]: {
    dismiss: string;
    imageAlt: string;
    readMore: string;
    close: string;
    expand: string;
    collapse: string;
  };
}

const translations: Translations = {
  en: {
    dismiss: "Dismiss",
    imageAlt: "Image for",
    readMore: "Read more",
    close: "Close",
    expand: "Expand",
    collapse: "Collapse"
  },
  es: {
    dismiss: "Descartar",
    imageAlt: "Imagen para",
    readMore: "Leer más",
    close: "Cerrar",
    expand: "Expandir",
    collapse: "Contraer"
  },
  fr: {
    dismiss: "Fermer",
    imageAlt: "Image pour",
    readMore: "Lire plus",
    close: "Fermer",
    expand: "Développer",
    collapse: "Réduire"
  },
  de: {
    dismiss: "Schließen",
    imageAlt: "Bild für",
    readMore: "Mehr lesen",
    close: "Schließen",
    expand: "Erweitern",
    collapse: "Reduzieren"
  },
  ja: {
    dismiss: "閉じる",
    imageAlt: "の画像",
    readMore: "続きを読む",
    close: "閉じる",
    expand: "展開",
    collapse: "折りたたむ"
  }
};

const Banner: React.FC<BannerProps> = ({ 
  formdata,
  type = 'info',
  dismissible = true,
  persistKey,
  language = 'en',
  onDismiss,
  animation = 'fade',
  position = 'top',
  expanded = false,
  maxHeight = '200px',
  showReadMore = false
}) => {
  const { name, description, color, background, images } = formdata;
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(expanded);

  // Check if banner was previously dismissed
  useEffect(() => {
    if (persistKey) {
      const dismissed = localStorage.getItem(`banner-${persistKey}`);
      if (dismissed === 'true') {
        setIsDismissed(true);
        setIsVisible(false);
      }
    }
  }, [persistKey]);

  // Calculate contrast ratio for accessibility
  const getContrastRatio = (textColor: string, bgColor: string) => {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    // Calculate relative luminance
    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const textRgb = hexToRgb(textColor);
    const bgRgb = hexToRgb(bgColor);
    
    const textLuminance = getLuminance(textRgb.r, textRgb.g, textRgb.b);
    const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    
    const lighter = Math.max(textLuminance, bgLuminance);
    const darker = Math.min(textLuminance, bgLuminance);
    
    return (lighter + 0.05) / (darker + 0.05);
  };

  // Ensure text color meets WCAG contrast requirements
  const textColor = getContrastRatio(color, background) >= 4.5 ? color : '#000000';

  // Handle banner dismissal
  const handleDismiss = () => {
    setIsVisible(false);
    if (persistKey) {
      localStorage.setItem(`banner-${persistKey}`, 'true');
      // Set expiration if provided
      if (typeof persistKey === 'object' && persistKey.expires) {
        const expires = new Date();
        expires.setTime(expires.getTime() + persistKey.expires * 24 * 60 * 60 * 1000);
        localStorage.setItem(`banner-${persistKey.id}-expires`, expires.toISOString());
      }
    }
    setIsDismissed(true);
    onDismiss?.();
  };

  // Get banner type styles
  const getBannerTypeStyles = () => {
    const baseStyles = "w-full relative flex flex-row items-center justify-start shadow-md rounded-lg p-4 md:p-6 xl:px-8 overflow-clip gap-4 group transition-all duration-300 ease-in-out";
    
    const typeStyles = {
      info: "bg-blue-50 border border-blue-200",
      warning: "bg-yellow-50 border border-yellow-200",
      error: "bg-red-50 border border-red-200",
      success: "bg-green-50 border border-green-200",
      announcement: "bg-purple-50 border border-purple-200",
      maintenance: "bg-orange-50 border border-orange-200",
      update: "bg-teal-50 border border-teal-200"
    };

    return `${baseStyles} ${typeStyles[type]}`;
  };

  // Get animation styles
  const getAnimationStyles = () => {
    const baseTransition = "transition-all duration-300 ease-in-out";
    
    const animations = {
      fade: "opacity-0",
      slide: position === 'top' ? "-translate-y-full" : 
             position === 'bottom' ? "translate-y-full" :
             position === 'left' ? "-translate-x-full" : "translate-x-full",
      scale: "scale-0",
      bounce: "animate-bounce"
    };

    return `${baseTransition} ${animations[animation]}`;
  };

  // Get position styles
  const getPositionStyles = () => {
    const positions = {
      top: "top-0 left-0 right-0",
      bottom: "bottom-0 left-0 right-0",
      left: "left-0 top-0 bottom-0",
      right: "right-0 top-0 bottom-0"
    };

    return positions[position];
  };

  // Get localized text
  const getLocalizedText = (key: keyof typeof translations.en) => {
    return translations[language]?.[key] || translations.en[key];
  };

  // Get type icon
  const getTypeIcon = () => {
    const icons = {
      info: <Info className="size-5 fill-blue-500" />,
      warning: <Warning className="size-5 fill-yellow-500" />,
      error: <Error className="size-5 fill-red-500" />,
      success: <Success className="size-5 fill-green-500" />,
      announcement: <Info className="size-5 fill-purple-500" />,
      maintenance: <Warning className="size-5 fill-orange-500" />,
      update: <Info className="size-5 fill-teal-500" />
    };

    return icons[type];
  };

  if (isDismissed) return null;

  return (
    <div
      className={`${getBannerTypeStyles()} ${getPositionStyles()} ${getAnimationStyles()}`}
      style={{ 
        background: background,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getAnimationStyles(),
        maxHeight: isExpanded ? 'none' : maxHeight
      }}
      role="banner"
      aria-label={`${type} notice`}
    >
      <div className="absolute top-4 left-4">
        {getTypeIcon()}
      </div>
      <div 
        className="shrink-0 relative cursor-pointer size-16 md:size-20 xl:size-24 rounded-full overflow-hidden border border-gray-200"
        role="img"
        aria-label={name ? `${getLocalizedText('imageAlt')} ${name}` : "Default image"}
        tabIndex={0}
      >
        <Image
          src={images[0] ? URL.createObjectURL(images[0]) : "/image.png"}
          alt={name ?? "Image name"}
          width={400}
          height={400}
          className="object-cover w-full h-full rounded-full duration-200 scale-110 ease-in group-hover:scale-100 group-hover:blur-[1px] group-hover:brightness-75"
        />
        <figcaption 
          className="line-clamp-2 text-center duration-200 ease-in opacity-0 text-white text-pretty font-bold text-sm absolute top-1/2 translate-y-full left-1/2 -translate-x-1/2 group-hover:opacity-100 group-hover:-translate-y-1/2"
          aria-hidden="true"
        >
          {name.slice(0, 13)}
        </figcaption>
      </div>
      <div className="flex flex-col items-start justify-center flex-grow">
        <h1
          className="text-gray-800 font-semibold text-xl md:text-2xl xl:text-3xl"
          style={{ color: textColor }}
        >
          {name}
        </h1>
        <p
          className="text-gray-600 font-normal text-sm md:text-base"
          style={{ color: textColor }}
        >
          {description}
        </p>
        {showReadMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            aria-expanded={isExpanded}
          >
            {isExpanded ? getLocalizedText('collapse') : getLocalizedText('readMore')}
          </button>
        )}
      </div>
      {/* {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label={getLocalizedText('dismiss')}
        >
          <Cross className="size-5 fill-gray-500" />
        </button>
      )} */}
      <p
        className="absolute -bottom-12 -right-2 text-9xl font-black bg-clip-text text-transparent bg-gradient-to-br from-teal-400/20 to-yellow-200/20"
        aria-hidden="true"
      >
        {name.slice(0, 15)}
      </p>
    </div>
  );
};

export default Banner;

type BannerProps = {
  formdata: {
    name: string;
    description: string;
    images: File[];
    color: string;
    background: string;
  };
  type?: BannerType;
  dismissible?: boolean;
  persistKey?: string | { id: string; expires?: number };
  language?: string;
  onDismiss?: () => void;
  animation?: AnimationType;
  position?: PositionType;
  expanded?: boolean;
  maxHeight?: string;
  showReadMore?: boolean;
};
